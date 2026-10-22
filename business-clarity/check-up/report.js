/* Browser-only PDF, using the same result object as the screen. */
(function(root){
'use strict';
function createReport(jsPDF,state,result){
 const B=root.BC,doc=new jsPDF({unit:'mm',format:'a4',compress:true}),M=18,W=174;
 const ink=[9,10,12],muted=[82,88,98],green=[176,65,25],lime=[255,152,99],paper=[245,246,248];
 const colors=[[156,73,55],[152,101,28],[66,106,151],[54,112,81]];let y=24;
 const clean=value=>String(value??'').replace(/[–—]/g,'-').replace(/[“”]/g,'"').replace(/[‘’]/g,"'").replace(/…/g,'...').replace(/[→↗]/g,'>').replace(/↓/g,'').replace(/[^\x20-\x7e\u00a0-\u00ff\n]/g,'');
 function lines(value,size,width,bold=false){doc.setFont('helvetica',bold?'bold':'normal');doc.setFontSize(size);return doc.splitTextToSize(clean(value),width);}
 function height(value,size=10,width=W,bold=false){return lines(value,size,width,bold).length*size*.47;}
 function raw(value,x,top,size=10,width=W,bold=false,color=ink){const rows=lines(value,size,width,bold);doc.setTextColor(...color);rows.forEach((line,i)=>doc.text(line,x,top+i*size*.47));return rows.length*size*.47;}
 function page(label){doc.addPage();doc.setFillColor(...green);doc.rect(0,0,210,3,'F');raw('BUSINESS CLARITY',M,13,8,90,true,green);raw(label,105,13,7,87,false,muted);y=29;}
 function ensure(h,label='HASIL CHECK-UP'){if(y+h>274)page(label);}
 function text(value,size=10,bold=false,color=ink){for(const line of lines(value,size,W,bold)){ensure(size*.47+2);raw(line,M,y,size,W,bold,color);y+=size*.47;}y+=4;}
 function link(label,url){ensure(22);doc.setFillColor(...ink);doc.roundedRect(M,y,W,17,2,2,'F');raw(label,M+7,y+10,11,W-14,true,[255,255,255]);doc.link(M,y,W,17,{url});y+=25;}
 doc.setProperties({title:'Business Clarity - '+state.businessName,subject:'Tingkat kejelasan bisnis dan sembilan blok BMC',author:'Business Clarity'});
 doc.setFillColor(...ink);doc.rect(0,0,210,67,'F');raw('Business Clarity.',M,23,22,W,true,[255,255,255]);raw('CHECK-UP MODEL BISNIS',M,36,9,W,true,lime);raw('Gambaran bisnis Anda.',M,52,19,W,true,[255,255,255]);y=82;
 text(state.businessName,20,true);text(new Date(state.completedAt||Date.now()).toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'}),9,false,muted);
 text([B.industries[state.industry],B.teams[state.teamSize],B.ages[state.businessAge]].filter(Boolean).join(' | '),9,false,muted);
 y+=5;ensure(42);doc.setFillColor(...paper);doc.roundedRect(M,y,W,36,3,3,'F');raw('TINGKAT KEJELASAN BISNIS',M+7,y+10,8,W-14,true,green);raw(result.overallLabel,M+7,y+26,23,W-14,true,ink);y+=46;
 text(result.narrative,11);text('Berdasarkan jawaban Anda. Hasil ini bukan penilaian untung-rugi atau jaminan keberhasilan bisnis.',9,false,muted);
 if(state.businessSummary){y+=3;text('Catatan usaha dari Anda',10,true,green);text(state.businessSummary,9.5);text('Catatan ini ditampilkan apa adanya dan tidak dianalisis otomatis.',8,false,muted);}
 page('PETA BMC');text('Sembilan blok BMC',22,true);text('Status menunjukkan seberapa jelas pilihan bisnis menurut jawaban Anda.',10,false,muted);y+=5;
 const cells=[['partners',0,0,33,88],['activities',35,0,33,43],['resources',35,45,33,43],['value',70,0,33,88],['relationships',105,0,33,43],['channels',105,45,33,43],['customers',140,0,34,88],['costs',0,90,86,36],['revenue',88,90,86,36]],mapY=y;
 for(const [id,x,dy,w,h] of cells){const a=result.areas.find(a=>a.id===id);doc.setFillColor(...paper);doc.setDrawColor(211,222,210);doc.roundedRect(M+x,mapY+dy,w,h,2,2,'FD');doc.setFillColor(...colors[a.status]);doc.rect(M+x,mapY+dy,w,1.2,'F');let cy=mapY+dy+8;cy+=raw(a.name,M+x+3,cy,9,w-6,true)+5;raw(a.label,M+x+3,cy,8,w-6,true,colors[a.status]);}
 y=mapY+139;
 B.labels.forEach((label,i)=>{doc.setFillColor(...colors[i]);doc.circle(M+1,y-1,1.3,'F');raw(label,M+6,y,9,120,true,colors[i]);raw(result.counts[i]+' blok',164,y,9,28,false,muted);y+=9;});
 y+=4;text('Tidak memakai mitra luar bukan kekurangan jika pekerjaan utama memang bisa ditangani sendiri.',9,false,muted);
 for(const [i,a] of result.areas.entries()){
  page('PENJELASAN & REKOMENDASI');
  text(String(i+1).padStart(2,'0')+' / '+a.name,21,true);
  text(a.label,12,true,colors[a.status]);text(a.about,10,false,muted);
  text('Mengapa statusnya '+a.label.toLowerCase()+'?',12,true,green);text(a.reason,10);
  a.findings.forEach(f=>text('- '+(f.noPartner?a.meaning:f.meaning),10));
  ensure(42);text('Apa artinya untuk usaha Anda?',12,true,green);text(a.why,10);
  text(a.example,9.5,false,muted);text('Ini contoh penjelas, bukan kesimpulan tentang usaha Anda.',8,false,muted);
  ensure(30);text('REKOMENDASI',10,true,green);text(a.action,10);
 }
 page('TENTANG HASIL');text('Cara membaca hasil',21,true);
 text('Belum jelas: pilihan utama belum ditentukan. Kurang jelas: sudah ada gambaran, tetapi masih umum. Cukup jelas: pilihan sudah spesifik, tetapi masih ada rincian penting yang belum lengkap. Jelas: unsur penting dapat dijelaskan secara spesifik.',10);
 text('Tingkat bisnis menggabungkan sembilan blok dengan bobot yang sama. Jika pelanggan, manfaat, atau pendapatan belum jelas, tingkat keseluruhan maksimal Sedang. Jika salah satunya kurang jelas, maksimal Tinggi.',10);
 text('Rekomendasi mengikuti jawaban dengan tingkat kejelasan terendah di tiap blok. Jika sama, urutan pertanyaan dipakai. Urutan ini tidak menunjukkan besarnya masalah atau kerugian usaha.',10);
 text('Pertanyaan dan aturan penilaian adalah rancangan edukasi untuk refleksi mandiri, belum divalidasi sebagai alat ukur ilmiah. Sistem tidak memeriksa bukti atau menilai cerita bebas. Status Jelas tidak berarti model bisnis sudah terbukti berhasil atau seluruh bagiannya pasti selaras.',10,false,muted);
 text('Mengacu pada Business Model Canvas dari Alexander Osterwalder dan Yves Pigneur.',9,false,muted);link('Referensi Business Model Canvas', 'https://www.strategyzer.com/library/the-business-model-canvas');
 page('KOMUNITAS & EVENT');text('Lanjut belajar bersama.',24,true);text('Bergabung atau ikut event adalah pilihan. Laporan ini tetap gratis dan dapat digunakan tanpa bergabung.',10,false,muted);y+=8;
 text('Grup WhatsApp Business Clarity',17,true);text('Belajar dan berdiskusi bersama tentang bisnis.',11);link('Gabung grup WhatsApp',B.community);y+=7;
 text('Event berikutnya',9,true,green);text('Business Clarity Workshop',19,true);text('Latihan menyusun BMC dan memahami model bisnis Anda. Tanyakan jadwal, biaya, dan ketersediaan tempat melalui WhatsApp.',11);link('Tanyakan event berikutnya',B.WA);
 text('Klik tombol pada PDF untuk membuka tautan. Informasi program juga tersedia di abifirmansya.github.io/business-clarity/.',9,false,muted);y+=4;link('Lihat program Business Clarity','https://abifirmansya.github.io/business-clarity/');
 const count=doc.getNumberOfPages();for(let n=1;n<=count;n++){doc.setPage(n);doc.setDrawColor(220,227,218);doc.line(M,282,192,282);raw('Business Clarity | '+state.businessName.slice(0,48),M,290,7,145,false,muted);doc.setFont('helvetica','normal');doc.setFontSize(7);doc.setTextColor(...muted);doc.text(n+' / '+count,192,290,{align:'right'});}
 return doc;
}
root.createBCReport=createReport;if(typeof module!=='undefined')module.exports=createReport;
})(typeof window!=='undefined'?window:globalThis);
