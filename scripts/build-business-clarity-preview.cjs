// Create a standalone, offline test site OUTSIDE the production checkout.
// node scripts/build-business-clarity-preview.cjs [output-directory] [simulation-results.json]
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),site=path.join(root,'business-clarity/check-up');
const out=path.resolve(process.argv[2]||'/workspace/shared/downloads/business-clarity-testing');
if(out===root||out.startsWith(root+path.sep))throw Error('Preview output must be outside the production checkout.');
fs.mkdirSync(out,{recursive:true});
const fixtures=require('../tests/fixtures/business-clarity-scenarios.json');
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let html=fs.readFileSync(path.join(site,'index.html'),'utf8');
html=html.replace('<title>Business Clarity — Seberapa jelas bisnis Anda?</title>','<title>TESTING — Business Clarity</title>');
html=html.replace('<meta name="description"', '<meta name="robots" content="noindex,nofollow"><meta name="description"');
html=html.replace('<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">','');
html=html.replace('<link rel="stylesheet" href="styles.css">',()=>'<style>'+fs.readFileSync(path.join(site,'styles.css'),'utf8')+'</style>');
html=html.replaceAll('href="/business-clarity/"','href="https://abifirmansya.github.io/business-clarity/"');
html=html.replaceAll('href="/"','href="https://abifirmansya.github.io/"');
html=html.replace('src="/assets/af-logo.png"','src="data:image/png;base64,'+fs.readFileSync(path.join(root,'assets/af-logo.png')).toString('base64')+'"');

const banner=`<aside class="testing-bar" aria-label="Versi testing"><div class="wrap"><strong>VERSI TESTING · Situs utama tidak berubah</strong><p>Isi sendiri atau buka salah satu dari 10 contoh jawaban sintetis. Penyimpanan testing terpisah dari situs utama.</p><label for="testCase">Contoh pengisian</label><select id="testCase">${fixtures.map(f=>`<option value="${f.id}">${f.id}. ${escape(f.name)} — ${escape(f.expectedOverall)}</option>`).join('')}</select><div class="testing-actions"><button id="loadTest" class="btn primary" type="button">Lihat hasil contoh</button><button id="clearTest" class="btn secondary" type="button">Isi sendiri dari awal</button><a href="simulasi.html">Laporan 10 simulasi</a></div><p id="testMessage" role="status"></p></div></aside>`;
html=html.replace('<main id="main">',banner+'<main id="main">');
html=html.replace('</head>','<style>.testing-bar{padding:20px 0;background:#1b1714;border-bottom:1px solid #68442d}.testing-bar strong{font-size:13px;color:#e6be9b}.testing-bar p,.testing-bar label{font-size:12px;color:#e6be9b}.testing-bar p{margin:8px 0}.testing-bar label{display:block;margin:10px 0 5px}.testing-bar select{max-width:650px;background:#101216}.testing-actions{display:flex;gap:12px;flex-wrap:wrap;align-items:center;margin-top:12px}.testing-actions a{font-size:13px}.testing-bar .btn{font-size:12px;min-height:40px;padding:10px 14px}</style></head>');
html=html.replace(/<script src="([^"]+)"><\/script>/g,(_,file)=>{
 let source=fs.readFileSync(path.join(site,file),'utf8');
 if(file==='data.js')source+='\nBC.storageKey="business-clarity-testing-v5";';
 if(file==='app.js')source=source.replace("$('legacyNotice').hidden=!localStorage.getItem('business-clarity-checkup-v4');","$('legacyNotice').hidden=true;");
 return '<script>'+source.replace(/<\/script/gi,'<\\/script')+'</script>';
});
const previewScript=`
window.BC_TEST_CASES=${JSON.stringify(fixtures)};
const previewKey=BC.storageKey;
function askReplace(){return !localStorage.getItem(previewKey)||confirm('Ganti jawaban versi testing dengan pilihan ini? Jawaban situs utama tidak berubah.');}
document.getElementById('loadTest').onclick=()=>{try{
 if(!askReplace())return;
 const f=BC_TEST_CASES.find(x=>x.id===document.getElementById('testCase').value),answers={};
 BC.blocks.forEach((b,i)=>b.questions.forEach(q=>answers[q.id]=f.overrides?.[q.id]??f.blocks[i]));
 if(answers.partnerNeed===4){delete answers.partnerRole;delete answers.partnerReason;}
 localStorage.setItem(previewKey,JSON.stringify({version:5,businessName:'Simulasi '+f.id,industry:'food',teamSize:'solo',businessAge:'early',businessSummary:'Contoh jawaban sintetis: '+f.name+'. Bukan data usaha nyata.',answers,step:0,completedAt:Date.now()}));
 location.reload();
}catch{document.getElementById('testMessage').textContent='Browser tidak mengizinkan penyimpanan contoh. Anda tetap bisa mengisi kuesioner secara manual.';}};
document.getElementById('clearTest').onclick=()=>{try{if(!askReplace())return;localStorage.removeItem(previewKey);location.reload();}catch{document.getElementById('testMessage').textContent='Buka ulang file untuk memulai tanpa penyimpanan.';}};
`;
const endOfBody=html.lastIndexOf('</body>');
html=html.slice(0,endOfBody)+'<script>'+previewScript+'</script>'+html.slice(endOfBody);
fs.writeFileSync(path.join(out,'index.html'),html);
const resultsPath=path.resolve(process.argv[3]||'/tmp/business-clarity-simulations/results.json');
const results=JSON.parse(fs.readFileSync(resultsPath,'utf8'));
fs.mkdirSync(path.join(out,'contoh-pdf'),{recursive:true});
for(const r of results)fs.copyFileSync(path.join(path.dirname(resultsPath),'simulasi-'+r.id+'.pdf'),path.join(out,'contoh-pdf','simulasi-'+r.id+'.pdf'));
if(results.length!==10||results.some(r=>!r.passed))throw Error('All 10 simulations must pass before packaging.');
const table=results.map(r=>`<tr><td>${r.id}</td><td>${escape(r.name)}</td><td>${escape(r.expected)}</td><td>${escape(r.actual)}</td><td>${r.answers}</td><td>Lulus · <a href="contoh-pdf/simulasi-${r.id}.pdf">PDF</a></td></tr>`).join('');
const cards=results.map(r=>`<article><h2>${r.id}. ${escape(r.name)}</h2><p>Keseluruhan: <strong>${escape(r.actual)}</strong></p><ul>${r.statuses.map((s,i)=>`<li>${escape(['Pelanggan','Manfaat','Saluran','Hubungan','Pendapatan','Sumber daya','Aktivitas','Mitra','Biaya'][i])}: ${escape(s)}</li>`).join('')}</ul></article>`).join('');
fs.writeFileSync(path.join(out,'simulasi.html'),`<!doctype html><html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Hasil 10 simulasi — Business Clarity</title><style>body{font:16px/1.7 system-ui;background:#090a0c;color:#f4f5f7;margin:0;padding:30px}main{max-width:1100px;margin:auto}a{color:#ff9863}h1{line-height:1.2}table{border-collapse:collapse;background:#101216;width:100%}th,td{padding:12px;text-align:left;border-bottom:1px solid #2a2d33}.scroll{overflow:auto}.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(270px,1fr));gap:15px}article{padding:20px;border:1px solid #2a2d33;border-radius:14px;background:#101216}article h2{font-size:19px}small{display:block}</style></head><body><main><a href="index.html">← Kembali ke situs testing</a><h1>10 simulasi. 10 pemeriksaan lulus.</h1><p>Setiap skenario diisi lewat formulir, dibandingkan dengan status yang ditentukan sebelumnya, dihitung ulang 5 kali, dimuat ulang, dan dicocokkan dengan isi PDF. Ini jawaban sintetis, bukan penelitian terhadap owner.</p><div class="scroll"><table><thead><tr><th>No.</th><th>Skenario</th><th>Diharapkan</th><th>Aktual</th><th>Jawaban</th><th>Hasil</th></tr></thead><tbody>${table}</tbody></table></div><h2>Status sembilan blok</h2><div class="cards">${cards}</div><p><strong>Catatan:</strong> kasus 09 tetap Sangat tinggi secara keseluruhan, sementara Pelanggan Cukup jelas. Nilai keseluruhan menggabungkan blok; bukan berarti setiap jawaban sudah jelas. Kasus ini disertakan agar aturan dapat Anda evaluasi.</p><p>Lulus simulasi berarti kode konsisten dengan aturan yang ditetapkan. Ini tidak membuktikan kuesioner sudah tervalidasi secara ilmiah. Situs utama tidak dipublikasikan ulang.</p></main></body></html>`);
fs.writeFileSync(path.join(out,'README.txt'),'BUSINESS CLARITY — VERSI TESTING\n\nBuka index.html di Chrome, Edge, Firefox, atau Safari. Tidak perlu instalasi atau server.\nPilih satu dari 10 contoh untuk melihat hasil, atau klik Isi sendiri dari awal.\nBuka simulasi.html untuk hasil pengujian; 10 PDF contoh tersedia di folder contoh-pdf.\nJika browser kantor memblokir file lokal, jalankan python3 -m http.server 8000 dari folder hasil ekstrak, lalu buka alamat server lokal di browser.\nPDF dibuat di browser. Koneksi internet hanya diperlukan jika membuka tautan WhatsApp atau halaman program.\nData testing memakai key business-clarity-testing-v5, terpisah dari situs utama.\nJika browser membatasi penyimpanan file lokal, pengisian manual tetap bisa digunakan.\n\nPaket ini bukan publikasi online dan tidak mengganti situs utama. Untuk hosting testing, unggah seluruh folder ini ke alamat terpisah.\n');
console.log('Standalone preview built: '+out);
