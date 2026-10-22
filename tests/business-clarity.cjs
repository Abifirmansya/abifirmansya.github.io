// BC_JSDOM points to the test-only dependency installed outside the repository.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {JSDOM}=require(process.env.BC_JSDOM||'jsdom'),root=path.resolve(__dirname,'..'),check=path.join(root,'business-clarity/check-up');
const {jsPDF}=require(path.join(check,'vendor/jspdf.umd.min.js'));
const language=fs.readFileSync(path.join(root,'assets/site.js'),'utf8');
for(const page of ['index.html','portfolio/index.html','business-clarity/index.html','business-clarity/check-up/index.html']){
 const w=new JSDOM(fs.readFileSync(path.join(root,page),'utf8'),{url:'https://abifirmansya.github.io/'+page,runScripts:'outside-only'}).window;
 w.localStorage.setItem('abi-site-language','en');w.eval(language);assert.equal(w.document.documentElement.lang,'en');
 for(const el of w.document.querySelectorAll('[data-id][data-en]'))assert.equal(el.textContent,el.dataset.en);
 w.document.querySelector('[data-lang="id"]').click();assert.equal(w.document.documentElement.lang,'id');
 for(const el of w.document.querySelectorAll('[data-id][data-en]'))assert.equal(el.textContent,el.dataset.id);
 w.document.querySelector('.menu-button').click();assert.equal(w.document.querySelector('.menu-button').getAttribute('aria-expanded'),'true');w.close();
}
for(const file of ['index.html','portfolio/index.html','business-clarity/index.html','business-clarity/check-up/index.html']){
 const w=new JSDOM(fs.readFileSync(path.join(root,file),'utf8')).window,d=w.document;
 for(const el of d.querySelectorAll('[src],a[href],link[href]')){const v=el.getAttribute('src')||el.getAttribute('href');if(!v||v.startsWith('#')||/^(https?:|data:)/.test(v))continue;const target=path.resolve(v.startsWith('/')?root:path.dirname(path.join(root,file)),v.replace(/^\//,''));assert.ok(fs.existsSync(target),file+' -> '+v);}
 assert.equal(d.querySelectorAll('[id]').length,new Set([...d.querySelectorAll('[id]')].map(el=>el.id)).size);w.close();
}
const html=fs.readFileSync(path.join(check,'index.html'),'utf8'),scripts=['data.js','assessment.js','report.js','app.js'].map(f=>fs.readFileSync(path.join(check,f),'utf8'));
// The program introduces Business Clarity before linking to the questionnaire.
const landing=new JSDOM(fs.readFileSync(path.join(root,'business-clarity/index.html'),'utf8')).window;
assert.equal(landing.document.querySelector('#profileForm'),null);assert.ok(landing.document.querySelector('a[href="check-up/"]'));landing.close();
const home=new JSDOM(fs.readFileSync(path.join(root,'index.html'),'utf8')).window;
assert.ok(home.document.querySelector('a[href="/business-clarity/"]'));home.close();
function app({saved,legacy,blocked=false}={}){
 const w=new JSDOM(html,{url:'https://abifirmansya.github.io/business-clarity/check-up/',runScripts:'outside-only'}).window;
 w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=()=>{};w.confirm=()=>true;w.jspdf={jsPDF};w.URL.createObjectURL=blob=>{w.lastBlob=blob;return 'blob:test'};w.URL.revokeObjectURL=()=>{};const anchorClick=w.HTMLAnchorElement.prototype.click;w.HTMLAnchorElement.prototype.click=function(){if(this.download)w.downloadName=this.download;else anchorClick.call(this);};
 w.localStorage.setItem('abi-site-language','en');if(saved)w.localStorage.setItem('business-clarity-checkup-v5',saved);if(legacy)w.localStorage.setItem('business-clarity-checkup-v4',legacy);
 if(blocked){w.Storage.prototype.getItem=()=>{throw Error('blocked')};w.Storage.prototype.setItem=()=>{throw Error('blocked')};}
 scripts.forEach(s=>w.eval(s));return w;
}
function profile(w,changes={}){
 const values={businessName:'Dapur Rasa',industry:'food',teamSize:'solo',businessAge:'early',businessSummary:'Katering makan siang.',...changes};
 for(const [k,v] of Object.entries(values)){const el=w.document.getElementById(k);el.value=v;el.dispatchEvent(new w.Event('input'));}
 w.document.getElementById('profileForm').dispatchEvent(new w.Event('submit',{cancelable:true}));
}
function answerBlock(w,index,value=3){const d=w.document;for(const q of w.BC.blocks[index].questions){const el=d.querySelector(`input[name="${q.id}"][value="${value}"]`);if(el)el.click();}}
(async()=>{
 const w=app({legacy:'{"version":4,"answers":{"customer":0}}'}),d=w.document;
 assert.equal(d.body.dataset.view,'profile');assert.equal(d.getElementById('legacyNotice').hidden,false);
 profile(w,{businessName:'<img src=x onerror=alert(1)>'});assert.equal(d.body.dataset.view,'quiz');assert.equal(d.querySelectorAll('#questionBody textarea').length,0);
 d.getElementById('next').click();assert.ok(d.querySelector('.missing'));
 for(let i=0;i<9;i++){answerBlock(w,i);d.getElementById('next').click();}
 assert.equal(d.body.dataset.view,'review');assert.equal(d.querySelectorAll('#reviewList img').length,0);
 d.getElementById('analyze').click();assert.equal(d.body.dataset.view,'results');assert.equal(d.getElementById('overallLabel').textContent,'Sangat tinggi');assert.equal(d.querySelectorAll('.map-item').length,9);assert.equal(d.querySelectorAll('.block-detail').length,9);
 assert.equal(d.querySelectorAll('#connectionsSection,#priorityList,#focusSelect,.focus-section').length,0);
 d.querySelector('[data-open="customers"]').click();assert.equal(d.getElementById('detail-customers').open,true);
 await d.querySelector('.download').onclick();assert.ok(w.lastBlob.size>8000);assert.match(w.downloadName,/\.pdf$/);assert.match(d.getElementById('downloadStatus').textContent,/berhasil/);
 const saved=w.localStorage.getItem(w.BC.storageKey),state=JSON.parse(saved);assert.equal(Object.keys(state.answers).length,27);assert.equal(w.localStorage.getItem('abi-site-language'),'en');assert.equal(w.localStorage.getItem('business-clarity-checkup-v4'),'{'+'"version":4,"answers":{"customer":0}}');
 const doc=w.createBCReport(jsPDF,state,w.BC.analyze(state.answers,state)),raw=doc.output();assert.ok(raw.startsWith('%PDF'));assert.ok(doc.getNumberOfPages()>=5);assert.ok(raw.includes(w.BC.community));assert.ok(raw.includes(w.BC.WA));assert.ok(!raw.includes('HUBUNGAN ANTARTEMUAN'));
 for(const a of d.querySelectorAll('[data-community]'))assert.equal(a.href,w.BC.community);
 for(const a of d.querySelectorAll('[data-wa]'))assert.equal(a.href,w.BC.WA);
 // Resume completed results and change an answer, including regenerated PDF.
 const resumed=app({saved}),rd=resumed.document;assert.equal(rd.body.dataset.view,'results');rd.getElementById('edit').click();rd.querySelector('[data-question="target"]').click();rd.querySelector('input[name="target"][value="0"]').click();rd.querySelector('[data-step="8"]').click();rd.getElementById('next').click();rd.getElementById('analyze').click();assert.match(rd.getElementById('detail-customers').textContent,/Target pembeli belum ditentukan/);assert.match(rd.getElementById('detail-customers').textContent,/Pilih satu kelompok/);await rd.querySelector('.download').onclick();assert.match(rd.getElementById('downloadStatus').textContent,/berhasil/);
 // Branch: stale partner answers cleared; when switching back they become required again.
 const branch=app({saved}),bd=branch.document;bd.getElementById('edit').click();bd.querySelector('[data-question="partnerNeed"]').click();bd.querySelector('input[name="partnerNeed"][value="4"]').click();assert.equal(bd.querySelectorAll('.question-card').length,1);assert.equal(JSON.parse(branch.localStorage.getItem(branch.BC.storageKey)).answers.partnerRole,undefined);assert.equal(bd.querySelector('.track').getAttribute('aria-valuemax'),'25');bd.querySelector('input[name="partnerNeed"][value="3"]').click();bd.getElementById('next').click();assert.ok(bd.querySelector('.missing'));bd.querySelector('input[name="partnerNeed"][value="4"]').click();bd.getElementById('next').click();bd.getElementById('next').click();bd.getElementById('analyze').click();assert.match(bd.getElementById('detail-partners').textContent,/Tidak memakai mitra bukan kekurangan/);
 // Storage failures never prevent completion/download.
 const offline=app({blocked:true});profile(offline);for(let i=0;i<9;i++){answerBlock(offline,i,1);offline.document.getElementById('next').click();}offline.document.getElementById('analyze').click();assert.equal(offline.document.getElementById('overallLabel').textContent,'Sedang');await offline.document.querySelector('.download').onclick();assert.ok(offline.lastBlob.size>8000);assert.match(offline.document.querySelector('.storage-status').textContent,/tidak bisa menyimpan/);
 const pre=app();profile(pre,{businessAge:'pre'});assert.equal(pre.document.body.dataset.view,'profile');assert.equal(pre.document.getElementById('preNotice').hidden,false);assert.equal(pre.document.getElementById('startQuiz').disabled,true);
 const corrupt=app({saved:'{bad json'});assert.equal(corrupt.document.body.dataset.view,'profile');
 const partial=JSON.parse(saved);partial.answers.target=99;const invalid=app({saved:JSON.stringify(partial)});assert.equal(invalid.document.body.dataset.view,'quiz');
 rd.getElementById('restart').click();assert.equal(rd.body.dataset.view,'profile');assert.equal(Object.keys(JSON.parse(resumed.localStorage.getItem(resumed.BC.storageKey)).answers).length,0);
 for(const win of [w,resumed,branch,offline,pre,corrupt,invalid])win.close();
 console.log('PASS: site ID/EN, local links, 27 questions, validation, 9 BMC blocks, edit/resume/reset, PDF, CTA, partner branch, storage failure, legacy isolation, prelaunch gate, invalid state, and HTML escaping.');
})().catch(e=>{console.error(e);process.exitCode=1});
