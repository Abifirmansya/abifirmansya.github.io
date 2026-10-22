(function(root){
'use strict';
const B=root.BC,level=score=>score<0.75?0:score<1.75?1:score<2.75?2:3;
const context={
 customers:['Blok ini menjelaskan siapa pembeli yang ingin Anda layani, apa yang mereka cari, dan siapa yang memutuskan pembelian.','Gambaran pelanggan membantu Anda memilih produk, harga, dan cara menawarkan. Jika pembelinya masih terlalu umum, keputusan tersebut lebih sulit disesuaikan dengan kebutuhan mereka.','Contoh: bukan hanya “pekerja kantor”, tetapi “karyawan kantor yang membutuhkan makan siang diantar sebelum jam istirahat”.'],
 value:['Blok ini menjelaskan apa yang didapat pembeli, kebutuhan yang dibantu, dan alasan memilih penawaran Anda.','Pembeli perlu memahami manfaatnya, bukan hanya daftar fitur atau kata “berkualitas”. Batas penawaran juga membantu mereka mengetahui apa yang termasuk dalam harga.','Contoh: jasa desain menu menawarkan file siap cetak dan dua kali revisi, sehingga pemilik kedai tidak perlu menyiapkan desain sendiri.'],
 channels:['Blok ini menjelaskan jalan pembeli dari mengenal usaha, memesan, sampai menerima produk atau jasa.','Memilih Instagram atau WhatsApp saja belum menjelaskan seluruh alurnya. Cara memesan, membayar, dan menerima penawaran juga perlu diketahui.','Contoh: pembeli melihat menu di Instagram, memesan melalui WhatsApp, lalu mengambil pesanan pada waktu yang disepakati.'],
 relationships:['Blok ini menjelaskan bentuk bantuan dan hubungan yang Anda sediakan sebelum dan setelah pembelian.','Tidak semua usaha membutuhkan layanan personal atau tindak lanjut terus-menerus. Yang penting, bentuk bantuan dan batasnya sesuai dengan kebutuhan pembeli.','Contoh: pembeli memilih barang sendiri dari katalog, tetapi bisa bertanya melalui WhatsApp selama jam layanan.'],
 revenue:['Blok ini menjelaskan apa yang dibayar pelanggan, bentuk penjualannya, dasar harga, dan ketentuan pembayaran.','Banyak pesanan belum otomatis menjelaskan cara usaha mendapat uang. Produk yang dijual, isi harga, dan waktu pembayaran perlu dibedakan.','Contoh: jasa foto dibayar per paket, dengan uang muka saat memesan dan pelunasan sebelum file akhir diserahkan.'],
 resources:['Blok ini menjelaskan kebutuhan utama untuk melayani pembeli, cara menyediakannya, dan batas kemampuan usaha.','Kebutuhan ini tidak selalu berupa alat yang harus dibeli. Waktu, keterampilan, akses, dan dana juga bisa menentukan jumlah pesanan yang dapat dilayani.','Contoh: seorang desainer memerlukan laptop, aplikasi, keterampilan, dan waktu kerja untuk menangani dua proyek sekaligus.'],
 activities:['Blok ini menjelaskan pekerjaan yang wajib dilakukan agar manfaat sampai ke pembeli dan usaha mendapatkan penjualan.','Daftar kesibukan belum tentu menunjukkan pekerjaan utama. Kegiatan yang dipilih perlu membantu memenuhi janji penawaran atau membawa calon pembeli sampai membeli.','Contoh: pada katering dengan janji tepat waktu, menyiapkan menu, memasak, dan mengatur pengiriman merupakan kegiatan utama.'],
 partners:['Blok ini menjelaskan apakah usaha memerlukan pihak luar, bantuan yang dibutuhkan, dan alasan bekerja sama.','Mitra diperlukan jika perannya membantu menjalankan penawaran. Jika semua pekerjaan utama memang bisa dilakukan sendiri, tidak memakai mitra tetap merupakan pilihan yang jelas.','Contoh: kedai memakai pemasok untuk bahan tertentu; penyedia jasa mandiri bisa mengerjakan layanan utamanya tanpa mitra tambahan.'],
 costs:['Blok ini menjelaskan biaya menyediakan penawaran, biaya yang mengikuti pesanan, dan biaya yang tetap berjalan.','Harga perlu dibandingkan dengan biaya memenuhi penawaran dan kebutuhan rutin. Mengetahui angka tersebut menunjukkan kejelasan, bukan otomatis menunjukkan bahwa usaha sudah untung.','Contoh: biaya satu paket makanan mencakup bahan dan kemasan, sedangkan sewa tempat tetap dibayar meskipun pesanan sedang sepi.']
};
B.analyze=function(answers,profile={}){
 if(profile.businessAge==='pre')throw Error('Check-up ini untuk usaha yang sudah mulai menawarkan atau menjual produk/jasa.');
 const findings=B.applicableQuestions(answers).map(q=>{
  const value=answers[q.id];if(!Number.isInteger(value)||!q.options[value])throw Error('Jawaban belum lengkap: '+q.id);
  return {...q.options[value],qid:q.id,question:q.title,blockId:q.blockId,action:q.action};
 });
 const areas=B.blocks.map(b=>{
  const items=findings.filter(f=>f.blockId===b.id),score=items.reduce((n,f)=>n+f.score,0)/items.length;
  const status=level(score),lead=[...items].sort((a,b)=>a.score-b.score)[0],noPartner=b.id==='partners'&&items[0].noPartner;
  const counts=[0,1,2,3].map(n=>items.filter(f=>f.score===n).length);
  const descriptions=['belum ditentukan','masih umum','sudah spesifik tetapi belum lengkap','sudah jelas'];
  const reason=noPartner?'Anda sudah menentukan bahwa pekerjaan utama ditangani sendiri. Dua pertanyaan tentang bantuan dan alasan bekerja sama tidak dinilai karena tidak berlaku pada pilihan ini.':
   'Dari '+items.length+' jawaban pada blok ini, '+counts.map((n,i)=>n?n+' '+descriptions[i]:null).filter(Boolean).join('; ')+'. Gabungan jawaban tersebut menghasilkan status '+B.labels[status]+'.';
  return {id:b.id,name:b.name,bmc:b.bmc,score,status,label:B.labels[status],findings:items,
   about:context[b.id][0],why:context[b.id][1],example:context[b.id][2],reason,
   meaning:noPartner?'Anda memilih menangani semua pekerjaan utama sendiri. Tidak memakai mitra bukan kekurangan jika kebutuhan usaha memang dapat dipenuhi sendiri.':items.map(f=>f.meaning).join(' '),
   action:noPartner?'Periksa lagi kebutuhan pihak luar saat penawaran atau jumlah pekerjaan berubah. Tidak perlu menambah mitra hanya untuk melengkapi BMC.':status===3?b.ready:lead.action};
 });
 const average=areas.reduce((n,a)=>n+a.score,0)/areas.length,rawLevel=level(average);
 const core=areas.filter(a=>['customers','value','revenue'].includes(a.id));
 const coreCap=Math.min(3,Math.min(...core.map(a=>a.status))+1),overallLevel=Math.min(rawLevel,coreCap);
 const summaries=['Banyak pilihan penting dalam model bisnis Anda masih perlu ditentukan. Jawaban Anda membantu menunjukkan bagian mana yang belum jelas.','Sebagian pilihan bisnis sudah jelas, tetapi masih ada bagian penting yang perlu Anda perjelas. Lihat penjelasan setiap blok untuk mengetahui bagian tersebut.','Sebagian besar pilihan bisnis sudah bisa Anda jelaskan. Masih ada beberapa rincian yang perlu dilengkapi pada blok di bawah.','Jawaban Anda menunjukkan bahwa pilihan penting di sembilan blok BMC sudah dapat dijelaskan secara spesifik.'];
 const clear=areas.filter(a=>a.status===3),gaps=areas.filter(a=>a.status<2);let narrative=summaries[overallLevel];
 if(clear.length&&clear.length<9)narrative+=' Bagian yang sudah jelas: '+clear.map(a=>a.name.toLowerCase()).join(', ')+'.';
 if(gaps.length&&gaps.length<=3)narrative+=' Bagian yang masih perlu diperjelas: '+gaps.map(a=>a.name.toLowerCase()).join(', ')+'.';
 return {areas,findings,overallLevel,overallLabel:B.overallLabels[overallLevel],narrative,coreLimited:coreCap<rawLevel,counts:B.labels.map((_,i)=>areas.filter(a=>a.status===i).length)};
};
if(typeof module!=='undefined')module.exports=B;
})(typeof window!=='undefined'?window:globalThis);
