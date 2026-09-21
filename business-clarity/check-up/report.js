(function(root){
let assetPromise;
root.loadBCReportAssets=()=>{if(!assetPromise)assetPromise=Promise.all(['assets/owner-hero.png','assets/owner-workshop.png'].map(async url=>{try{const response=await fetch(url);if(!response.ok)return null;const blob=await response.blob();return await new Promise(resolve=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=()=>resolve(null);reader.readAsDataURL(blob);});}catch{return null;}})).then(([hero,workshop])=>({hero,workshop}));return assetPromise;};
function createReport(jsPDF,state,r,assets={}){
const B=root.BC,doc=new jsPDF({unit:'mm',format:'a4',compress:true}),W=174,M=18;let y=24;
const navy=[8,21,33],blue=[10,112,216],ink=[27,44,60],muted=[90,111,130],light=[241,246,250];
const statusColors={issue:[177,66,47],watch:[149,107,26],unknown:[98,119,142],good:[34,121,107],na:[111,123,134]};
const clean=s=>String(s??'').replace(/[–—]/g,'-').replace(/[“”]/g,'"').replace(/[‘’]/g,"'").replace(/→|↗/g,'>').replace(/↓/g,'').replace(/[^\x20-\x7e\u00a0-\u00ff\n]/g,'');
function lines(s,size=10,width=W,bold=false){doc.setFont('helvetica',bold?'bold':'normal');doc.setFontSize(size);return doc.splitTextToSize(clean(s),width);}
function height(s,size=10,width=W,bold=false){return lines(s,size,width,bold).length*size*.45;}
function raw(s,x,top,size=10,width=W,bold=false,color=ink){doc.setFont('helvetica',bold?'bold':'normal');doc.setFontSize(size);doc.setTextColor(...color);const ls=lines(s,size,width,bold);ls.forEach((l,i)=>doc.text(l,x,top+i*size*.45));return ls.length*size*.45;}
function page(label){doc.addPage();doc.setFillColor(...navy);doc.rect(0,0,210,3,'F');raw('BUSINESS CLARITY',M,12,8,100,true,blue);raw(label||'FOUNDER BUSINESS CHECK-UP',118,12,7,74,false,muted);y=27;}
function ensure(h,label){if(y+h>276)page(label);}
function text(s,size=10,bold=false,color=ink,width=W){const ls=lines(s,size,width,bold);for(const l of ls){ensure(size*.45+1);raw(l,M,y,size,width,bold,color);y+=size*.45;}y+=3;}
function title(n,s,sub){ensure(32);raw(n+' /',M,y,9,20,true,blue);y+=9;text(s,19,true);if(sub)text(sub,9.5,false,muted);y+=4;}
function box(s,color=light){const h=height(s,10,W-14)+13;ensure(h+5);doc.setFillColor(...color);doc.roundedRect(M,y-4,W,h,2,2,'F');doc.setFillColor(...blue);doc.rect(M,y-4,1,h,'F');raw(s,M+7,y+3,10,W-14,false,ink);y+=h+5;}
function badge(status,x,top){const t=B.labels[status];doc.setFont('helvetica','bold');doc.setFontSize(8);const w=doc.getTextWidth(clean(t))+10;doc.setFillColor(...statusColors[status]);doc.roundedRect(x,top-4,w,7,1,1,'F');doc.setTextColor(255,255,255);doc.text(clean(t),x+5,top+.6);}
const focus=r.focusOptions.find(f=>f.qid===state.focus)||r.focusOptions.find(f=>f.qid===r.topAreas[0].id);
doc.setProperties({title:'Business Clarity - '+state.businessName,subject:'Catatan kondisi bisnis dan langkah awal',author:'Business Clarity'});
// Cover: image is an illustration; all personal and analytical text stays selectable.
doc.setFillColor(...navy);doc.rect(0,0,210,103,'F');if(assets.hero){doc.saveGraphicsState();doc.rect(108,0,102,103,null);doc.clip();doc.discardPath();doc.addImage(assets.hero,'PNG',56,-3,163,109,undefined,'FAST');doc.restoreGraphicsState();doc.setFillColor(...navy);doc.rect(0,0,108,103,'F');}
raw('Business Clarity.',M,20,17,95,true,[255,255,255]);raw('FOUNDER BUSINESS CHECK-UP',M,31,8,100,true,[113,183,255]);raw('Catatan kondisi\nbisnis Anda.',M,49,24,95,true,[255,255,255]);raw(state.businessName,M,76,10,91,true,[220,234,247]);raw(new Date(state.completedAt||Date.now()).toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'}),M,94,8,100,false,[181,202,220]);
y=116;text(r.headline,19,true);text(r.narrative,10.5);y+=3;
const profileLine=B.industries[state.industry]+' | '+B.teams[state.teamSize]+' termasuk owner | '+B.ages[state.businessAge];box(profileLine);
text('Tentang usaha Anda',10,true,blue);text(state.businessSummary,9.7,false,muted);text('Keterangan dari peserta; ringkasan bebas tidak dianalisis otomatis.',7.5,false,muted);
ensure(50);y+=3;text(r.preOperating?'Persiapan sebelum usaha berjalan':'Mulai dari tiga area ini',10,true,blue);text(r.topAreas.map((a,i)=>(i+1)+'. '+a.name).join(' | '),10,true);text(r.preOperating?'Jika sudah menerima pesanan, ubah profil lama usaha dan buat ulang laporan.':'Urutan mendahulukan kejadian yang sudah mengganggu usaha. Ini belum menunjukkan masalah mana yang paling besar kerugiannya.',8,false,muted);text('Fokus yang Anda pilih',10,true,blue);text(focus.block+' - '+focus.title,12,true);text('Hasil ini berasal dari jawaban Anda. BMC menjadi peta pemeriksaan, bukan skor kesehatan atau kepastian penyebab masalah.',8.5,false,muted);
page('PETA SEMBILAN AREA');title('01','Gambaran model bisnis','Empat pertanyaan per area. Warna merangkum status jawaban, bukan memberi nilai kesehatan.');
const cells=[['partners',0,0,33,84],['activities',35,0,33,41],['resources',35,43,33,41],['value',70,0,33,84],['relationships',105,0,33,41],['channels',105,43,33,41],['customers',140,0,34,84],['costs',0,86,103,36],['revenue',105,86,69,36]];const mapY=y;
for(const [id,x,dy,w,h] of cells){const a=r.areas.find(a=>a.id===id);doc.setFillColor(...light);doc.setDrawColor(211,224,235);doc.roundedRect(M+x,mapY+dy,w,h,1,1,'FD');doc.setFillColor(...statusColors[a.status]);doc.rect(M+x,mapY+dy,1.3,h,'F');let ty=mapY+dy+9;const index=r.areas.findIndex(a=>a.id===id);raw(String(index+1).padStart(2,'0'),M+x+4,ty,7,w-8,true,blue);ty+=8;ty+=raw(a.name,M+x+4,ty,9,w-8,true)+4;raw(B.labels[a.status],M+x+4,ty,7.3,w-8,false,statusColors[a.status]);}
y=mapY+133;for(const [s,label] of Object.entries(B.labels)){ensure(11);doc.setFillColor(...statusColors[s]);doc.circle(M+2,y-1,1.5,'F');raw(label,M+7,y,9,130,false);raw(String(r.counts[s])+' area',155,y,9,37,true,muted);y+=9;}y+=3;text(r.preOperating?'Kesembilan area belum dinilai sebagai kinerja karena profil usaha belum beroperasi. Gunakan langkah persiapan pada halaman berikut.':'Satu area dapat memuat beberapa kondisi. Label mendahulukan masalah yang sudah terjadi, cara kerja yang perlu dirapikan, lalu informasi yang belum cukup. Lihat penjelasan tiap area sebelum mengambil tindakan.',9,false,muted);text('“Sudah dilakukan” berarti cara kerja tersedia menurut jawaban Anda; bukan jaminan hasil usaha. “Belum bisa dinilai” tidak berarti buruk.',8.5,false,muted);
page('PEMBACAAN PER AREA');title('02','Pembacaan sembilan area','Setiap ringkasan menggabungkan jawaban dalam satu area dan menunjukkan satu langkah awal.');
for(const [index,a] of r.areas.entries()){
const rows=[['ARTINYA BAGI USAHA ANDA',a.meaning],['LANGKAH PERTAMA',a.action],['HASIL YANG DIBUAT',a.output],['CARA MENGECEK HASILNYA',a.verify]];
const h=25+height(a.title,12,W-14,true)+rows.reduce((v,[label,body])=>v+height(body,9.4,W-14)+12,0);
ensure(h+5,'PEMBACAAN PER AREA');const start=y;doc.setFillColor(...light);doc.setDrawColor(216,226,235);doc.roundedRect(M,start-5,W,h,2,2,'FD');raw(String(index+1).padStart(2,'0')+' / '+a.name,M+7,y+2,9,W-66,true,blue);badge(a.status,M+119,y+2);y+=14;y+=raw(a.title,M+7,y,12,W-14,true)+7;
for(const [label,body] of rows){raw(label,M+7,y,7.2,W-14,true,blue);y+=5;y+=raw(body,M+7,y,9.4,W-14,false,ink)+7;}
y=Math.max(y,start+h+5);
}
page('HUBUNGAN DAN PRIORITAS');title('03','Temuan yang perlu diperiksa bersama','Hubungan berikut merupakan dugaan berdasarkan pola jawaban. Cocokkan dengan kejadian nyata sebelum menetapkan penyebab.');
if(!r.connections.length)box(r.preOperating?'Hubungan antara masalah pelanggan, pembayaran, dan pekerjaan belum disimpulkan karena usaha ditandai belum beroperasi. Mulai dari persiapan pembeli, penawaran, dan biaya.':'Jawaban Anda belum cukup untuk menghubungkan masalah di beberapa area. Mulai dari satu kejadian nyata, lalu periksa bagian usaha mana saja yang terlibat.');
for(const [i,c] of r.connections.entries()){const h=height(c.title,12,W,true)+height(c.basis.join(' + '),8.5)+height(c.meaning,9.5)+height(c.action,9.5)+24;ensure(h,'HUBUNGAN ANTARTEMUAN');text(String(i+1).padStart(2,'0')+'. '+c.title,12,true,blue);text('Dasar jawaban: '+c.basis.join(' + '),8.5,false,muted);text(c.meaning,9.5);text('Periksa berikutnya: '+c.action,9.5,true);y+=5;}
if(r.inconsistencies.length){title('!','Periksa kembali jawaban');r.inconsistencies.forEach(s=>box(s));}

page('LANGKAH TINDAK LANJUT');title('04','Satu fokus. Satu tindakan awal.','Mulai dengan fokus yang Anda pilih. Periksa hasilnya sebelum menambah perubahan.');badge(focus.status,M,y);y+=13;text(focus.title,17,true);text(focus.meaning,10,false,muted);box('Yang saya kerjakan: '+focus.action);box('Hasil kerja yang perlu dibuat: '+focus.check);text('Cara mengetahui tindakan ini berguna',11,true,blue);text(focus.verify,10);y+=4;text('Sesuaikan dengan keadaan usaha',11,true,blue);r.context.forEach(s=>text(s,9.5));
page('PROGRAM LANJUTAN');title('05','Sudah mengenali kondisi.\nSekarang tentukan arahnya.','Business Clarity Workshop - kelas edukasi berbayar, 3 jam.');
if(assets.workshop){doc.saveGraphicsState();doc.roundedRect(M,y,W,61,2,2,null);doc.clip();doc.discardPath();doc.addImage(assets.workshop,'PNG',M,y-22,W,116,undefined,'FAST');doc.restoreGraphicsState();y+=68;}
text('Bawa laporan ini sebagai bahan latihan.',15,true);text('Latihan menyusun BMC, menghubungkan temuan antarblok, dan memilih fokus perbaikan. Hasil latihan disatukan dalam Business Clarity Canvas Integration.',11);text('Kelas menggunakan latihan mandiri; bukan konsultasi individual atau pemeriksaan BMC satu per satu.',9,false,muted);
ensure(28);doc.setFillColor(...blue);doc.roundedRect(M,y,W,20,2,2,'F');raw('Tanyakan jadwal Business Clarity Workshop',M+8,y+8,12,W-16,true,[255,255,255]);raw('WhatsApp +62 851-2131-42611',M+8,y+15,9,W-16,false,[225,241,255]);doc.link(M,y,W,20,{url:B.WA});y+=30;
text('Dasar dan batasan pembacaan',11,true,blue);text('Sembilan area mengacu pada Business Model Canvas, Alexander Osterwalder dan Yves Pigneur. Pertanyaan serta aturan pembacaan merupakan rancangan edukasi Business Clarity dan belum divalidasi sebagai instrumen diagnosis kesehatan bisnis. Hasil bergantung pada jawaban peserta. Tidak ada skor kesehatan total atau kepastian akar masalah.',8.5,false,muted);text('Referensi: Strategyzer - The Business Model Canvas',8.5,true,blue);doc.link(M,y-7,W,7,{url:'https://www.strategyzer.com/library/the-business-model-canvas'});text('Ilustrasi pada laporan dibuat dengan AI; bukan dokumentasi peserta atau acara nyata.',7.5,false,muted);

page('BUSINESS CLARITY COMMUNITY');
title('06','Lanjutkan belajar bersama\nBusiness Clarity.','Simpan laporan ini sebagai pegangan, lalu lanjutkan belajar dan berdiskusi.');
text('Gabung Business Clarity Community',16,true);
text('Bergabung melalui WhatsApp untuk belajar dan berdiskusi tentang bisnis.',11);
ensure(28);doc.setFillColor(...blue);doc.roundedRect(M,y,W,20,2,2,'F');
raw('Gabung Business Clarity Community',M+8,y+12,12,W-16,true,[255,255,255]);
doc.link(M,y,W,20,{url:'https://chat.whatsapp.com/E0A49g7bczE1sGa5VEVDZc'});y+=31;
text('Follow Instagram @abifirmansya',16,true);
text('Ikuti konten bisnis dan informasi program Business Clarity berikutnya.',11);
ensure(28);doc.setFillColor(...navy);doc.roundedRect(M,y,W,20,2,2,'F');
raw('Follow Instagram @abifirmansya',M+8,y+12,12,W-16,true,[255,255,255]);
doc.link(M,y,W,20,{url:'https://www.instagram.com/abifirmansya/'});y+=31;
text('Klik tombol pada PDF untuk membuka tautan. Jika membaca versi cetak, cari @abifirmansya di Instagram.',9,false,muted);
text('Bergabung dan mengikuti akun bersifat pilihan. Laporan tetap dapat digunakan secara mandiri.',9,false,muted);
const n=doc.getNumberOfPages();for(let p=1;p<=n;p++){doc.setPage(p);doc.setDrawColor(220,228,235);doc.line(M,284,192,284);raw('Business Clarity | '+state.businessName.slice(0,48),M,290,7,150,false,muted);doc.setFontSize(7);doc.setTextColor(...muted);doc.text(p+' / '+n,192,290,{align:'right'});}return doc;
}
root.createBCReport=createReport;if(typeof module!=='undefined')module.exports=createReport;
})(typeof window!=='undefined'?window:globalThis);
