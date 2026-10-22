// Run all 10 predefined answer patterns through the form, analysis, reload, and PDF.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{execFileSync}=require('node:child_process');
const {JSDOM}=require(process.env.BC_JSDOM||'jsdom');
const scenarios=require('./fixtures/business-clarity-scenarios.json'),root=path.resolve(__dirname,'..'),site=path.join(root,'business-clarity/check-up');
const {jsPDF}=require(path.join(site,'vendor/jspdf.umd.min.js'));
const html=fs.readFileSync(path.join(site,'index.html'),'utf8'),scripts=['data.js','assessment.js','report.js','app.js'].map(f=>fs.readFileSync(path.join(site,f),'utf8'));
const out=process.argv[2]||'/tmp/business-clarity-simulations';fs.mkdirSync(out,{recursive:true});
const normalize=s=>s.replace(/[–—]/g,'-').replace(/[“”]/g,'"').replace(/[‘’]/g,"'").replace(/…/g,'...').replace(/[^\x20-\x7e\u00a0-\u00ff\n]/g,' ').replace(/\s+/g,' ').trim();
function app(saved){const w=new JSDOM(html,{url:'https://testing.invalid/business-clarity/check-up/',runScripts:'outside-only'}).window;w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=()=>{};if(saved)w.localStorage.setItem('business-clarity-checkup-v5',saved);scripts.forEach(s=>w.eval(s));return w;}
const report=[];
for(const fixture of scenarios){
 const w=app(),d=w.document,B=w.BC;
 const values={businessName:'Simulasi '+fixture.id,industry:'food',teamSize:'solo',businessAge:'early'};
 for(const [key,value] of Object.entries(values)){d.getElementById(key).value=value;d.getElementById(key).dispatchEvent(new w.Event('input'));}
 d.getElementById('profileForm').dispatchEvent(new w.Event('submit',{cancelable:true}));assert.equal(d.body.dataset.view,'quiz');
 for(let i=0;i<9;i++){
  for(const q of B.blocks[i].questions){const option=fixture.overrides?.[q.id]??fixture.blocks[i];const input=d.querySelector(`input[name="${q.id}"][value="${option}"]`);if(input)input.click();else assert.ok(['partnerRole','partnerReason'].includes(q.id));}
  d.getElementById('next').click();
 }
 assert.equal(d.body.dataset.view,'review');d.getElementById('analyze').click();assert.equal(d.body.dataset.view,'results');
 const saved=w.localStorage.getItem(B.storageKey),state=JSON.parse(saved),result=B.analyze(state.answers,state);
 assert.equal(result.overallLabel,fixture.expectedOverall,fixture.name);assert.deepEqual(Array.from(result.areas,a=>a.status),fixture.expectedStatuses,fixture.name);
 assert.equal(result.findings.length,fixture.expectedCount);assert.equal(d.querySelectorAll('.block-detail[open]').length,9);
 const content=d.getElementById('blockResults').textContent;
 for(const a of result.areas){for(const field of ['about','reason','why','example','action'])assert.ok(content.includes(a[field]),fixture.name+' screen missing '+field);for(const f of a.findings)assert.ok(content.includes(f.noPartner?a.meaning:f.meaning));}
 for(let repeat=0;repeat<5;repeat++)assert.deepEqual(B.analyze(state.answers,state),result);
 const restored=app(saved);assert.equal(restored.document.body.dataset.view,'results');assert.equal(restored.document.getElementById('overallLabel').textContent,fixture.expectedOverall);assert.equal(restored.document.getElementById('blockResults').textContent,content);
 const doc=w.createBCReport(jsPDF,state,result),pdf=path.join(out,'simulasi-'+fixture.id+'.pdf');fs.writeFileSync(pdf,Buffer.from(doc.output('arraybuffer')));
 const text=normalize(execFileSync('pdftotext',['-layout',pdf,'-'],{encoding:'utf8'}));
 assert.ok(text.includes(fixture.expectedOverall));
 for(const a of result.areas){for(const field of ['about','reason','why','example','action'])assert.ok(text.includes(normalize(a[field])),fixture.name+' PDF missing '+field);for(const f of a.findings)assert.ok(text.includes(normalize(f.noPartner?a.meaning:f.meaning)));}
 const raw=doc.output();assert.ok(raw.includes(B.community));assert.ok(raw.includes(B.WA));
 const statuses=result.areas.map(a=>a.label);
 report.push({id:fixture.id,name:fixture.name,expected:fixture.expectedOverall,actual:result.overallLabel,statuses:Array.from(statuses),answers:result.findings.length,passed:true,checks:['form','expected statuses','9 open explanations','5 repeat calculations','reload','PDF content','CTA links']});
 w.close();restored.close();console.log('PASS '+fixture.id+' '+fixture.name+' → '+result.overallLabel+' ('+result.findings.length+' jawaban)');
}
fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(report,null,2));
const names=['Pelanggan','Manfaat','Saluran','Hubungan','Pendapatan','Sumber daya','Aktivitas','Mitra','Biaya'];
let md='# Hasil 10 simulasi Business Clarity\n\nSemua skenario memakai jawaban sintetis, bukan data peserta nyata. Pengujian menunjukkan konsistensi implementasi terhadap aturan yang didokumentasikan, bukan validitas ilmiah kuesioner.\n\n';
md+='Setiap skenario: isi formulir, periksa status yang sudah ditentukan sebelumnya, periksa detail 9 blok, ulang hitung 5 kali, muat ulang state, cocokkan teks PDF, dan periksa tautan CTA.\n\n| No. | Skenario | Diharapkan | Hasil | Jawaban | Pemeriksaan |\n|---|---|---|---|---|---|\n';
for(const r of report)md+=`| ${r.id} | ${r.name} | ${r.expected} | ${r.actual} | ${r.answers} | Lulus |\n`;
md+='\n## Status tiap blok\n\n| No. | '+names.join(' | ')+' |\n|---|'+names.map(()=>'---').join('|')+'|\n';
for(const r of report)md+='| '+r.id+' | '+r.statuses.join(' | ')+' |\n';
md+='\n## Catatan interpretasi\n\n- Kasus 05 dan 07 dibatasi Sedang karena blok dasar belum jelas. Kasus 06 maksimal Tinggi karena manfaat masih umum.\n- Kasus 08 melewati dua pertanyaan mitra, tanpa penalti.\n- Kasus 09 tetap Sangat tinggi secara keseluruhan, tetapi Pelanggan Cukup jelas: satu jawaban rendah tidak otomatis membuat seluruh bisnis berstatus rendah. Ini konsekuensi aturan agregasi yang sekarang, bukan jaminan semua bagian sudah jelas.\n- Detail menjelaskan jawaban masing-masing; contoh edukasi ditandai sebagai contoh, bukan fakta tentang usaha peserta.\n- Menjalankan simulasi ini tidak mempublikasikan perubahan ke situs produksi.\n';
fs.writeFileSync(path.join(root,'docs/business-clarity-simulations.md'),md);
console.log('10/10 PASS; report '+out+'/results.json');
