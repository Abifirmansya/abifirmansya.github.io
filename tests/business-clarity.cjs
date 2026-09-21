// Run with BC_JSDOM pointing to an installed jsdom package. No runtime dependency is added to the website.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {JSDOM}=require(process.env.BC_JSDOM||'jsdom'),root=path.resolve(__dirname,'..'),check=path.join(root,'business-clarity/check-up');
const languageScript=fs.readFileSync(path.join(root,'assets/site.js'),'utf8');
for(const page of ['index.html','portfolio/index.html','business-clarity/index.html']){
 const w=new JSDOM(fs.readFileSync(path.join(root,page),'utf8'),{url:'https://abifirmansya.github.io/'+page,runScripts:'outside-only'}).window;
 w.localStorage.setItem('abi-site-language','en');w.eval(languageScript);assert.equal(w.document.documentElement.lang,'en');
 for(const x of w.document.querySelectorAll('[data-id][data-en]'))assert.equal(x.textContent,x.dataset.en);
 w.document.querySelector('[data-lang="id"]').click();assert.equal(w.document.documentElement.lang,'id');
 for(const x of w.document.querySelectorAll('[data-id][data-en]'))assert.equal(x.textContent,x.dataset.id);
 w.document.querySelector('.menu-button').click();assert.equal(w.document.querySelector('.menu-button').getAttribute('aria-expanded'),'true');
 console.log(page+': ID/EN and menu passed');
}
const blocked=new JSDOM(fs.readFileSync(path.join(root,'business-clarity/index.html'),'utf8'),{url:'https://abifirmansya.github.io/business-clarity/',runScripts:'outside-only'}).window;
blocked.Storage.prototype.getItem=()=>{throw Error('blocked')};blocked.Storage.prototype.setItem=()=>{throw Error('blocked')};blocked.eval(languageScript);blocked.document.querySelector('[data-lang="en"]').click();assert.equal(blocked.document.documentElement.lang,'en');
for(const file of ['index.html','portfolio/index.html','business-clarity/index.html','business-clarity/check-up/index.html']){
 const d=new JSDOM(fs.readFileSync(path.join(root,file),'utf8'),{url:'https://abifirmansya.github.io/'+file}).window.document;
 for(const el of d.querySelectorAll('[src],a[href],link[href]')){const v=el.getAttribute('src')||el.getAttribute('href');if(!v||v.startsWith('#')||/^(https?:|data:)/.test(v))continue;const target=path.resolve(v.startsWith('/')?root:path.dirname(path.join(root,file)),v.replace(/^\//,''));assert.ok(fs.existsSync(target),file+' -> '+v);}
 assert.equal(d.querySelectorAll('[id]').length,new Set([...d.querySelectorAll('[id]')].map(x=>x.id)).size);
}
const html=fs.readFileSync(path.join(check,'index.html'),'utf8');const {jsPDF}=require(path.join(check,'vendor/jspdf.umd.min.js'));
(async()=>{
 const w=new JSDOM(html,{url:'https://abifirmansya.github.io/business-clarity/check-up/',runScripts:'outside-only'}).window,d=w.document;
 let blob,download='';w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=()=>{};w.HTMLAnchorElement.prototype.click=function(){download=this.download};w.URL.createObjectURL=b=>{blob=b;return 'blob:test'};w.URL.revokeObjectURL=()=>{};
 w.fetch=async url=>({ok:true,blob:async()=>new w.Blob([fs.readFileSync(path.join(check,url))],{type:'image/png'})});w.jspdf={jsPDF};w.localStorage.setItem('abi-site-language','en');
 for(const f of ['data.js','assessment.js','report.js','app.js'])w.eval(fs.readFileSync(path.join(check,f),'utf8'));
 assert.equal(d.body.dataset.view,'profile');assert.equal(d.querySelector('.nav [data-start]').hidden,true);assert.equal(d.querySelector('.back-to-program').getAttribute('href'),'/business-clarity/');
 const profile={businessName:'Uji Integrasi',industry:'service',teamSize:'solo',businessAge:'early',businessSummary:'Jasa desain untuk UMKM dengan pesanan melalui WhatsApp.'};
 for(const [k,v] of Object.entries(profile)){d.getElementById(k).value=v;d.getElementById(k).dispatchEvent(new w.Event('input'));}
 d.getElementById('profileForm').dispatchEvent(new w.Event('submit',{cancelable:true}));assert.equal(d.body.dataset.view,'quiz');assert.equal(d.querySelectorAll('#questionBody textarea').length,0);
 d.getElementById('next').click();assert.ok(d.querySelector('.missing'));
 for(let i=0;i<9;i++){for(const q of w.BC.blocks[i].questions){const value=q.options.findIndex(o=>o.status===(q.id==='payment'?'issue':'good'));d.querySelector('input[name="'+q.id+'"][value="'+value+'"]').click();}d.getElementById('next').click();}
 assert.equal(d.body.dataset.view,'review');d.getElementById('analyze').click();assert.equal(d.body.dataset.view,'results');assert.equal(d.querySelectorAll('.map-item').length,9);assert.match(d.getElementById('resultTitle').textContent,/uang penjualan/);
 await d.querySelector('.download').onclick();assert.ok(blob&&blob.size>10000);assert.match(download,/\.pdf$/);assert.match(d.getElementById('downloadStatus').textContent,/berhasil/);
 assert.equal(w.localStorage.getItem('abi-site-language'),'en');assert.equal(Object.keys(JSON.parse(w.localStorage.getItem('business-clarity-checkup-v4')).answers).length,36);
 for(const a of d.querySelectorAll('[data-community]'))assert.equal(a.href,'https://chat.whatsapp.com/E0A49g7bczE1sGa5VEVDZc');
 console.log('PASS: direct entry, 36 answers, validation, analysis, PDF with local photos, social links, separate language preference and saved answers.');
})().catch(e=>{console.error(e);process.exitCode=1});
