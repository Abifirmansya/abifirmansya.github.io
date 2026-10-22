# Business Clarity — acuan versi 5

## Tujuan dan batas

Check-up gratis untuk membantu owner memahami **kejelasan model bisnis**, memakai sembilan blok Business Model Canvas. Bukan audit SOP, kesehatan usaha, profitabilitas, validasi pasar, atau diagnosis akar masalah. Bahasa Indonesia sehari-hari. Tidak ada API AI, login, email wajib, atau nomor HP wajib.

Versi ini untuk usaha yang **sudah menawarkan atau menjual produk/jasa**, termasuk usaha baru. Profil “Belum mulai menjual” tidak menghasilkan penilaian; peserta diarahkan ke halaman program. Jenis usaha dan tim adalah konteks profil, tidak mengubah skor. Cerita singkat opsional dan tidak dianalisis.

## Output yang disepakati

1. Kejelasan bisnis: **Rendah / Sedang / Tinggi / Sangat tinggi** dan penjelasan singkat.
2. Status tiap blok: **Belum jelas / Kurang jelas / Cukup jelas / Jelas** dalam susunan kanvas BMC.
3. Penjelasan setiap blok berdasarkan jawaban peserta, dengan jawaban dasar yang bisa dibuka.
4. Satu rekomendasi setiap blok.

Tidak ada bagian hubungan antartemuan, prioritas bisnis, fokus berikutnya, diagnosis kerugian, atau prediksi sukses. CTA paling akhir: grup WhatsApp dan event berikutnya. PDF memuat hasil yang sama dan CTA opsional. Tidak mengklaim telah menilai keselarasan seluruh model karena jawaban teks tidak dianalisis.

## Pertanyaan dan indikator

27 pertanyaan inti, 3 per blok. Pilihan tunggal per pertanyaan; jumlah opsi tidak ditentukan oleh jumlah tingkat hasil. Isi lengkap pertanyaan, opsi, penjelasan per opsi, dan rekomendasi dicatat pada bagian katalog di bawah dan di `business-clarity/check-up/data.js`. `assessment.js` hanya memuat aturan penilaian; tidak menimpa pertanyaan seperti versi sebelumnya.

| Blok | Indikator |
|---|---|
| Pelanggan | Target pembeli, kebutuhan utama, keputusan pembelian |
| Manfaat | Manfaat bagi pembeli, isi/batas penawaran, alasan memilih |
| Saluran | Tempat mendapatkan pembeli, cara memesan, penyerahan |
| Hubungan | Bantuan sebelum membeli, cara menghubungi, layanan setelah membeli |
| Pendapatan | Sumber/bentuk penjualan, dasar harga, ketentuan pembayaran |
| Sumber daya | Kebutuhan utama, cara penyediaan, kapasitas yang diketahui |
| Aktivitas | Pekerjaan wajib, pekerjaan pendukung manfaat, kegiatan penjualan |
| Mitra | Perlu/tidaknya mitra, kontribusi, alasan kerja sama |
| Biaya | Komponen biaya, perilaku biaya, hubungan biaya dan harga |

Pilihan menggambarkan hal yang diketahui/diputuskan, bukan apakah praktik itu menguntungkan. Tidak harus memiliki tim, mitra, langganan, garansi, atau pembelian berulang untuk mendapat status jelas. Harga yang diketahui tidak menutup biaya tetap bisa menjadi model yang jelas; kejelasan bukan kesehatan.

### Percabangan mitra

Pada `partnerNeed`, pilihan kelima menyatakan seluruh pekerjaan utama bisa ditangani sendiri dan tidak memerlukan pihak luar. Nilainya 3. `partnerRole` dan `partnerReason` dilewati dan tidak masuk penyebut; jawaban lama pada dua pertanyaan itu dihapus dari state versi 5. Total menjadi 25 pertanyaan. Jika pilihan diubah kembali, kedua pertanyaan wajib dijawab kembali. Semua sembilan blok tetap ada; mitra dijelaskan sebagai keputusan tidak menggunakan pihak luar, bukan kelemahan.

## Aturan status

Setiap opsi memiliki nilai 0–3 secara eksplisit:

- 0: pilihan/bagian belum diketahui atau ditentukan.
- 1: sudah ada gambaran, masih umum.
- 2: sudah spesifik, masih ada unsur yang belum lengkap.
- 3: unsur yang ditanyakan sudah jelas menurut peserta.

Nilai blok = rata-rata pertanyaan yang berlaku. Status memakai interval `[0, 0.75)`, `[0.75, 1.75)`, `[1.75, 2.75)`, `[2.75, 3]`. Dengan tiga pertanyaan bernilai bulat, status Jelas membutuhkan semua jawaban bernilai 3. Satu jawaban rendah tidak otomatis membuat seluruh blok mendapat status terendah.

Nilai keseluruhan = rata-rata nilai sembilan blok, memakai interval yang sama. Pembatas pelanggan, manfaat, dan pendapatan: jika status terendah ketiganya 0, keseluruhan maksimal 1 (Sedang); jika 1, maksimal 2 (Tinggi). Selain itu tidak dibatasi. Ini aturan produk yang transparan, bukan batas empiris/ilmiah. Nilai angka tidak disajikan sebagai persentase kesehatan.

Penjelasan tiap blok menggabungkan makna tiap opsi yang benar-benar dipilih. Rekomendasi berasal dari indikator bernilai terendah dalam blok; jika seri, urutan pertanyaan menjadi pemilih yang deterministik. Blok Jelas mendapat rekomendasi pemeliharaan yang relevan. Tidak menetapkan prioritas antarblok. Status keseluruhan tidak boleh mengklaim isi bisnis sudah terverifikasi.

## Contoh hasil yang wajib lolos pengujian

- Semua jawaban 0 → 9 blok Belum jelas, keseluruhan Rendah.
- Semua 1 → Kurang jelas, keseluruhan Sedang.
- Semua 2 → Cukup jelas, keseluruhan Tinggi.
- Semua 3 → Jelas, keseluruhan Sangat tinggi.
- Pelanggan semuanya 0, blok lain 3 → keseluruhan maksimal Sedang.
- Pelanggan semuanya 1, blok lain 3 → keseluruhan maksimal Tinggi.
- Mitra tanpa pihak luar → 25 jawaban wajib, mitra Jelas, tanpa penalti/anjuran mencari mitra.
- Jawaban belum lengkap, indeks salah, atau profil prausaha → tidak boleh menghasilkan laporan lengkap.
- Mengubah jawaban → status, penjelasan, rekomendasi, dan PDF diperbarui.

## Tampilan dan aksesibilitas

Gaya mengikuti website utama Abi Firmansya (`assets/styles.css` dan `assets/profile.css`): latar #090a0c, panel #101216/#15181d, aksen oranye #ff5a1f/#ff7b36, judul besar, tombol membulat, dan logo AF asli. Identitas berbeda dari varian biru di halaman program; acuan revisi desain ini adalah website utama. Ruang lega dan hierarki tipografi tetap dijaga. Susunan BMC desktop: mitra; aktivitas/sumber daya; manfaat; hubungan/saluran; pelanggan; biaya/pendapatan di baris bawah. Pada ponsel disusun ulang menjadi kartu dua kolom yang bisa dibaca tanpa geser horizontal. Status memakai teks dan warna, bukan warna saja. Setiap kartu membuka detail yang sesuai; dapat digunakan dengan keyboard. Hormati reduced motion.

## Penyimpanan dan PDF

`localStorage` memakai `business-clarity-checkup-v5`. Versi 4 tidak dimigrasikan karena arti indeks jawaban berubah. Versi 4 tetap disimpan, tidak dihapus otomatis. Data tidak dikirim ke server. Jika storage gagal, formulir dan PDF tetap bisa digunakan selama halaman terbuka. Resume hasil hanya jika jawaban lengkap dan versi cocok. Mulai ulang meminta konfirmasi dan hanya mengganti state versi 5.

PDF memakai jsPDF lokal, tanpa font/gambar eksternal atau API. Hasil dari objek analisis yang sama seperti layar. Isian peserta di-escape pada HTML. Nama file unduhan disanitasi. Membuka WhatsApp mengarah ke layanan eksternal; tidak mengirim jawaban check-up secara otomatis.

## CTA yang digunakan

- Grup: https://chat.whatsapp.com/E0A49g7bczE1sGa5VEVDZc
- Event: Business Clarity Workshop; https://api.whatsapp.com/send/?phone=62851213142611&text&type=phone_number&app_absent=0
- Tidak mengarang tanggal, kuota, harga, atau ketersediaan event.
- Bergabung/ikut event bukan syarat melihat atau mengunduh hasil.

## Validasi dan publikasi

Jalankan tes aturan analisis, alur DOM, percabangan, penyimpanan, perubahan jawaban, PDF, dan CTA. Periksa browser desktop dan ponsel. Jangan hanya mengandalkan lolos syntax check. Situs tetap GitHub Pages main/root; tidak menambah deployment khusus folder check-up. Perubahan ini belum merupakan publikasi sampai masuk ke alur deployment pengguna.

## Status keputusan

Diimplementasikan mengikuti permintaan eksekusi pengguna. Detail interval skor, pemilihan rekomendasi saat seri, dan batas profil adalah keputusan implementasi yang dicatat terbuka; belum tervalidasi lewat riset owner. Uji pemahaman langsung dengan owner tetap berguna sebelum menganggap instrumen teruji.

## Katalog pertanyaan dan jawaban versi 5

### Pelanggan

**Apakah usaha Anda sudah punya target pembeli?** (`target`)

Jawab untuk produk atau jasa utama Anda.

- A. Belum, saya belum menentukan siapa yang ingin saya layani. — nilai 0.
  Penjelasan: Target pembeli belum ditentukan.
- B. Saya masih mencoba menjual ke siapa saja. — nilai 1.
  Penjelasan: Target pembeli masih sangat luas.
- C. Saya sudah memilih beberapa kelompok pembeli, tetapi belum tahu mana yang ingin saya utamakan. — nilai 2.
  Penjelasan: Beberapa kelompok pembeli sudah dipilih, tetapi belum ada yang diutamakan.
- D. Saya sudah tahu kelompok pembeli yang ingin saya utamakan. — nilai 3.
  Penjelasan: Kelompok pembeli utama sudah ditentukan.

Rekomendasi bila indikator ini perlu diperjelas: Pilih satu kelompok pembeli yang ingin Anda layani lebih dulu. Sebutkan siapa mereka dan kapan mereka membutuhkan produk atau jasa Anda.

**Apa yang paling dicari pembeli dari produk atau jasa Anda?** (`need`)

Misalnya makan siang yang cepat sampai, baju untuk ukuran tertentu, atau bantuan membuat laporan.

- A. Saya belum tahu apa yang mereka cari. — nilai 0.
  Penjelasan: Kebutuhan pembeli belum diketahui.
- B. Saya baru punya gambaran umum, seperti murah atau berkualitas. — nilai 1.
  Penjelasan: Kebutuhan pembeli masih disebut secara umum.
- C. Saya tahu beberapa kebutuhan mereka, tetapi belum tahu mana yang paling penting. — nilai 2.
  Penjelasan: Beberapa kebutuhan sudah diketahui, tetapi yang utama belum dipilih.
- D. Saya tahu kebutuhan utama yang membuat mereka membeli. — nilai 3.
  Penjelasan: Kebutuhan utama pembeli sudah diketahui.

Rekomendasi bila indikator ini perlu diperjelas: Tanyakan kepada beberapa pembeli: saat mencari produk atau jasa ini, apa yang paling mereka butuhkan? Bandingkan jawabannya.

**Siapa yang biasanya memutuskan untuk membeli?** (`buyer`)

Pengguna belum tentu pembeli. Misalnya anak ikut les, tetapi orang tua memilih dan membayar.

- A. Saya belum tahu siapa yang memutuskan pembelian. — nilai 0.
  Penjelasan: Pengambil keputusan pembelian belum diketahui.
- B. Saya tahu siapa yang memakai, tetapi belum tahu siapa yang memutuskan pembelian. — nilai 1.
  Penjelasan: Pengguna sudah dikenali, tetapi pengambil keputusan belum diketahui.
- C. Saya tahu siapa yang memutuskan pembelian, tetapi belum tahu apa pertimbangannya. — nilai 2.
  Penjelasan: Pengambil keputusan sudah dikenali, tetapi pertimbangannya belum jelas.
- D. Saya tahu siapa yang memutuskan pembelian dan apa yang mereka pertimbangkan. — nilai 3.
  Penjelasan: Pengambil keputusan dan pertimbangannya sudah diketahui.

Rekomendasi bila indikator ini perlu diperjelas: Lihat satu pembelian terakhir. Bedakan siapa yang memakai, siapa yang memutuskan, dan apa yang membuat mereka memilih.

### Manfaat yang Ditawarkan

**Kalau ditanya manfaat produk atau jasa Anda, apa yang bisa Anda jelaskan?** (`benefit`)

Manfaat adalah yang didapat pembeli, bukan hanya isi paket atau fitur.

- A. Saya belum bisa menjelaskan manfaatnya. — nilai 0.
  Penjelasan: Manfaat penawaran belum dirumuskan.
- B. Saya biasanya menyebut murah, bagus, atau berkualitas. — nilai 1.
  Penjelasan: Manfaat masih dijelaskan dengan kata yang umum.
- C. Saya bisa menyebut manfaatnya, tetapi belum mengaitkannya dengan kebutuhan pembeli. — nilai 2.
  Penjelasan: Manfaat sudah disebut, tetapi kaitannya dengan kebutuhan pembeli belum jelas.
- D. Saya bisa menjelaskan manfaatnya dan kebutuhan pembeli yang dibantu. — nilai 3.
  Penjelasan: Manfaat penawaran sudah dikaitkan dengan kebutuhan pembeli.

Rekomendasi bila indikator ini perlu diperjelas: Lengkapi kalimat ini: produk atau jasa saya membantu pembeli untuk … sehingga mereka bisa ….

**Apakah Anda sudah menentukan apa saja yang didapat pembeli?** (`offer`)

Termasuk isi produk atau layanan dan hal yang tidak termasuk dalam harga.

- A. Belum, isi produk atau layanan masih berubah-ubah tanpa ketentuan. — nilai 0.
  Penjelasan: Isi penawaran belum ditentukan.
- B. Saya sudah tahu produk atau layanannya, tetapi rinciannya belum ditentukan. — nilai 1.
  Penjelasan: Produk atau layanan sudah dipilih, tetapi rinciannya belum jelas.
- C. Rinciannya sudah ada, tetapi yang termasuk dan tidak termasuk dalam harga belum jelas. — nilai 2.
  Penjelasan: Rincian penawaran sudah ada, tetapi batasnya belum jelas.
- D. Saya sudah menentukan apa yang didapat pembeli dan apa yang tidak termasuk dalam harga. — nilai 3.
  Penjelasan: Isi dan batas penawaran sudah ditentukan.

Rekomendasi bila indikator ini perlu diperjelas: Pilih satu produk atau paket jasa. Tuliskan apa yang diterima pembeli, batas layanan, dan tambahan yang dibayar terpisah.

**Mengapa pembeli perlu memilih usaha Anda?** (`choice`)

Bandingkan dengan pilihan lain, termasuk mengerjakan sendiri atau tidak jadi membeli.

- A. Saya belum tahu alasannya. — nilai 0.
  Penjelasan: Alasan memilih penawaran belum diketahui.
- B. Saya merasa usaha saya lebih baik, tetapi belum tahu bedanya di bagian apa. — nilai 1.
  Penjelasan: Keunggulan masih berupa pernyataan umum.
- C. Saya tahu perbedaannya, tetapi belum tahu apakah itu penting bagi pembeli. — nilai 2.
  Penjelasan: Perbedaan penawaran sudah diketahui, tetapi manfaatnya bagi pembeli belum jelas.
- D. Saya tahu perbedaannya dan mengapa itu berguna bagi pembeli yang saya tuju. — nilai 3.
  Penjelasan: Perbedaan penawaran dan kegunaannya bagi pembeli sudah dijelaskan.

Rekomendasi bila indikator ini perlu diperjelas: Bandingkan penawaran Anda dengan satu pilihan lain. Cari perbedaan yang benar-benar membantu pembeli, bukan hanya berbeda.

### Saluran Penjualan

**Dari mana Anda ingin mendapatkan pembeli?** (`discovery`)

Contoh: rekomendasi, toko, marketplace, media sosial, atau kunjungan langsung.

- A. Saya belum menentukan tempat mencari pembeli. — nilai 0.
  Penjelasan: Tempat mendapatkan pembeli belum dipilih.
- B. Saya ingin mencoba banyak tempat, tetapi belum memilih yang utama. — nilai 1.
  Penjelasan: Ada beberapa pilihan saluran, tetapi belum ada yang diutamakan.
- C. Saya sudah memilih tempatnya, tetapi belum tahu apakah target pembeli ada di sana. — nilai 2.
  Penjelasan: Saluran sudah dipilih, tetapi kecocokannya dengan pembeli belum jelas.
- D. Saya sudah memilih tempatnya dan tahu mengapa tempat itu cocok untuk target pembeli. — nilai 3.
  Penjelasan: Saluran dipilih sesuai target pembeli.

Rekomendasi bila indikator ini perlu diperjelas: Pilih satu tempat yang biasa digunakan target pembeli untuk mencari produk atau jasa seperti milik Anda.

**Setelah tertarik, bagaimana orang bisa membeli?** (`ordering`)

Bayangkan langkah dari melihat penawaran sampai pesanan diterima usaha Anda.

- A. Saya belum menentukan cara menerima pesanan. — nilai 0.
  Penjelasan: Cara menerima pesanan belum ditentukan.
- B. Saya sudah memilih tempat menerima pesanan, tetapi langkahnya belum jelas. — nilai 1.
  Penjelasan: Tempat menerima pesanan sudah dipilih, tetapi langkahnya belum jelas.
- C. Langkah memesan sudah ada, tetapi cara membayar atau mengonfirmasi pesanan belum ditentukan. — nilai 2.
  Penjelasan: Cara memesan sudah ada, tetapi pembayaran atau konfirmasi belum jelas.
- D. Saya sudah menentukan langkah memesan, membayar, dan mendapat konfirmasi. — nilai 3.
  Penjelasan: Alur pemesanan sampai konfirmasi sudah ditentukan.

Rekomendasi bila indikator ini perlu diperjelas: Tuliskan langkah pembeli dari memilih produk sampai mendapat konfirmasi pesanan. Lengkapi bagian yang belum ditentukan.

**Bagaimana pembeli menerima produk atau jasa Anda?** (`delivery`)

Bisa diantar, diambil, dipakai secara online, atau dilayani langsung.

- A. Saya belum menentukan cara menyerahkannya. — nilai 0.
  Penjelasan: Cara penyerahan belum ditentukan.
- B. Saya sudah memilih caranya, tetapi belum menentukan waktu atau tempatnya. — nilai 1.
  Penjelasan: Cara penyerahan sudah dipilih, tetapi waktu atau tempatnya belum jelas.
- C. Cara, waktu, dan tempat sudah ada, tetapi batas jangkauan atau ketentuannya belum jelas. — nilai 2.
  Penjelasan: Cara penyerahan sudah ada, tetapi jangkauan atau ketentuannya belum jelas.
- D. Cara, waktu, tempat atau jangkauan, dan ketentuannya sudah saya tentukan. — nilai 3.
  Penjelasan: Cara dan ketentuan penyerahan sudah ditentukan.

Rekomendasi bila indikator ini perlu diperjelas: Jelaskan kepada pembeli bagaimana, kapan, dan di mana mereka menerima produk atau layanan, termasuk batas jangkauannya.

### Hubungan Pelanggan

**Bantuan seperti apa yang dibutuhkan pembeli sebelum membeli?** (`help`)

Ada yang bisa memilih sendiri, ada yang perlu penjelasan atau konsultasi.

- A. Saya belum tahu bantuan yang mereka butuhkan. — nilai 0.
  Penjelasan: Kebutuhan bantuan sebelum membeli belum diketahui.
- B. Saya tahu mereka perlu bantuan, tetapi belum tahu bagian mana. — nilai 1.
  Penjelasan: Kebutuhan bantuan masih umum.
- C. Saya tahu bagian yang perlu dibantu, tetapi belum memilih cara membantunya. — nilai 2.
  Penjelasan: Bagian yang perlu dibantu sudah diketahui, tetapi bentuk bantuannya belum dipilih.
- D. Saya tahu bantuan yang dibutuhkan dan sudah memilih cara memberikannya; termasuk jika pembeli bisa memilih sendiri. — nilai 3.
  Penjelasan: Bentuk bantuan sudah disesuaikan dengan kebutuhan pembeli.

Rekomendasi bila indikator ini perlu diperjelas: Pilih satu pertanyaan yang sering muncul sebelum pembelian. Tentukan apakah cukup dijawab lewat informasi produk atau perlu bantuan langsung.

**Kalau pembeli ingin bertanya, bagaimana mereka menghubungi usaha Anda?** (`contact`)

Pilih cara yang memang akan Anda gunakan untuk melayani pembeli.

- A. Saya belum menentukan cara pembeli menghubungi usaha. — nilai 0.
  Penjelasan: Cara menghubungi usaha belum ditentukan.
- B. Saya sudah memilih tempat menerima pertanyaan, tetapi belum menentukan siapa yang menjawab. — nilai 1.
  Penjelasan: Tempat bertanya sudah ada, tetapi pemberi jawaban belum ditentukan.
- C. Tempat dan orang yang menjawab sudah ada, tetapi waktu layanannya belum ditentukan. — nilai 2.
  Penjelasan: Pemberi jawaban sudah ada, tetapi waktu layanan belum jelas.
- D. Saya sudah menentukan tempat, orang yang menjawab, dan waktu layanan; orang itu boleh saya sendiri. — nilai 3.
  Penjelasan: Cara menghubungi usaha dan ketentuan layanan sudah ditentukan.

Rekomendasi bila indikator ini perlu diperjelas: Tentukan satu tempat menerima pertanyaan, siapa yang menjawab, dan kapan pembeli bisa mendapat layanan.

**Setelah membeli, layanan apa yang Anda sediakan?** (`aftercare`)

Misalnya bantuan penggunaan, garansi, perawatan, atau layanan selesai saat penyerahan.

- A. Saya belum menentukan layanan setelah pembelian. — nilai 0.
  Penjelasan: Layanan setelah pembelian belum ditentukan.
- B. Saya ingin tetap membantu, tetapi belum menentukan bentuk bantuannya. — nilai 1.
  Penjelasan: Ada rencana membantu pembeli, tetapi bentuknya belum jelas.
- C. Bentuk bantuan sudah ditentukan, tetapi batas waktu atau cakupannya belum jelas. — nilai 2.
  Penjelasan: Bentuk bantuan sudah ada, tetapi batasnya belum jelas.
- D. Saya sudah menentukan bentuk dan batas bantuannya, termasuk jika layanan selesai saat penyerahan. — nilai 3.
  Penjelasan: Bentuk dan batas layanan setelah pembelian sudah ditentukan.

Rekomendasi bila indikator ini perlu diperjelas: Jelaskan bantuan yang masih bisa diminta setelah pembelian, berapa lama berlaku, dan apa yang tidak termasuk.

### Sumber Pendapatan

**Dari penjualan apa usaha Anda mendapat uang?** (`income`)

Contoh: barang satuan, paket jasa, langganan, sewa, atau komisi.

- A. Saya belum menentukan apa yang akan dijual. — nilai 0.
  Penjelasan: Sumber pendapatan belum ditentukan.
- B. Saya sudah punya beberapa pilihan, tetapi belum memilih sumber penjualan utama. — nilai 1.
  Penjelasan: Ada beberapa pilihan sumber pendapatan, tetapi belum ada yang diutamakan.
- C. Saya sudah memilih produk atau jasa utama, tetapi bentuk penjualannya belum ditentukan. — nilai 2.
  Penjelasan: Produk atau jasa utama sudah dipilih, tetapi bentuk penjualannya belum jelas.
- D. Saya sudah menentukan produk atau jasa utama dan bentuk penjualannya, misalnya satuan, paket, atau langganan. — nilai 3.
  Penjelasan: Sumber pendapatan utama dan bentuk penjualannya sudah ditentukan.

Rekomendasi bila indikator ini perlu diperjelas: Pilih satu sumber pendapatan utama. Jelaskan apa yang dibayar pelanggan dan apakah dibeli satuan, paket, langganan, sewa, atau bentuk lain.

**Bagaimana Anda menentukan harga?** (`price`)

Yang dinilai adalah dasar keputusan harga, bukan mahal atau murahnya.

- A. Saya belum menentukan harga. — nilai 0.
  Penjelasan: Harga belum ditentukan.
- B. Harga sudah ada, tetapi saya belum tahu dasar perhitungannya. — nilai 1.
  Penjelasan: Harga sudah ada, tetapi dasarnya belum jelas.
- C. Saya memakai biaya sendiri atau harga pasar sebagai acuan, tetapi belum membandingkan keduanya. — nilai 2.
  Penjelasan: Harga memiliki acuan, tetapi pertimbangannya belum lengkap.
- D. Saya mempertimbangkan biaya sendiri serta harga pasar atau manfaat yang diterima pembeli. — nilai 3.
  Penjelasan: Harga sudah mempertimbangkan biaya dan pasar atau manfaat bagi pembeli.

Rekomendasi bila indikator ini perlu diperjelas: Periksa satu harga: berapa biaya untuk memenuhi penawarannya, dan bagaimana harga itu dibandingkan dengan pilihan atau manfaat bagi pembeli.

**Kapan dan bagaimana pembeli membayar?** (`payment`)

Bisa lunas di awal, uang muka, bertahap, setelah selesai, atau berlangganan.

- A. Saya belum menentukan cara pembayarannya. — nilai 0.
  Penjelasan: Cara pembayaran belum ditentukan.
- B. Cara membayar sudah dipilih, tetapi waktu pembayarannya belum ditentukan. — nilai 1.
  Penjelasan: Cara pembayaran sudah dipilih, tetapi waktunya belum jelas.
- C. Cara dan waktu pembayaran sudah ada, tetapi jumlah tiap pembayaran atau ketentuan tambahannya belum jelas. — nilai 2.
  Penjelasan: Cara dan waktu pembayaran sudah ada, tetapi rinciannya belum lengkap.
- D. Cara, waktu, dan jumlah pembayaran sudah jelas, termasuk jika langsung lunas sekali bayar. — nilai 3.
  Penjelasan: Ketentuan pembayaran sudah ditentukan.

Rekomendasi bila indikator ini perlu diperjelas: Buat contoh pembayaran untuk satu pesanan: jumlah yang dibayar, caranya, dan kapan harus dibayar.

### Sumber Daya Utama

**Apa yang harus tersedia agar Anda bisa melayani pembeli?** (`resources`)

Bisa berupa keterampilan, waktu, bahan, alat, tempat, akses, atau dana.

- A. Saya belum tahu kebutuhan utamanya. — nilai 0.
  Penjelasan: Kebutuhan utama usaha belum diketahui.
- B. Saya tahu beberapa kebutuhan, tetapi belum tahu mana yang wajib tersedia. — nilai 1.
  Penjelasan: Beberapa kebutuhan sudah dikenali, tetapi yang wajib belum dipilih.
- C. Saya tahu yang wajib tersedia, tetapi jumlah atau kemampuan yang dibutuhkan belum jelas. — nilai 2.
  Penjelasan: Kebutuhan wajib sudah dipilih, tetapi ukurannya belum jelas.
- D. Saya tahu yang wajib tersedia dan jumlah atau kemampuan yang dibutuhkan untuk melayani pesanan. — nilai 3.
  Penjelasan: Kebutuhan utama dan ukurannya sudah diketahui.

Rekomendasi bila indikator ini perlu diperjelas: Ambil contoh satu pesanan. Daftar bahan, alat, waktu, keterampilan, dan dana yang wajib tersedia untuk menyelesaikannya.

**Bagaimana Anda menyediakan kebutuhan utama itu?** (`resourceAccess`)

Tidak harus membeli; bisa memakai milik sendiri, menyewa, atau bekerja sama.

- A. Saya belum tahu cara menyediakannya. — nilai 0.
  Penjelasan: Cara menyediakan kebutuhan utama belum ditentukan.
- B. Saya tahu beberapa pilihan, tetapi belum memilih cara yang akan digunakan. — nilai 1.
  Penjelasan: Ada beberapa pilihan penyediaan, tetapi belum ada keputusan.
- C. Caranya sudah dipilih, tetapi belum jelas dari siapa atau kapan bisa tersedia. — nilai 2.
  Penjelasan: Cara penyediaan sudah dipilih, tetapi sumber atau waktunya belum jelas.
- D. Saya sudah tahu caranya, dari siapa memperolehnya, dan kapan tersedia. — nilai 3.
  Penjelasan: Sumber dan waktu penyediaan kebutuhan utama sudah diketahui.

Rekomendasi bila indikator ini perlu diperjelas: Untuk setiap kebutuhan wajib, tentukan apakah memakai yang sudah ada, membeli, menyewa, atau mendapatkan bantuan pihak lain.

**Berapa banyak pesanan yang bisa dilayani dengan sumber daya yang ada?** (`capacity`)

Gunakan ukuran yang cocok: pesanan per hari, pelanggan per bulan, atau proyek bersamaan.

- A. Saya belum tahu batasnya. — nilai 0.
  Penjelasan: Batas jumlah pesanan belum diketahui.
- B. Saya punya perkiraan, tetapi belum tahu apa yang membatasi jumlah pesanan. — nilai 1.
  Penjelasan: Ada perkiraan kemampuan, tetapi pembatasnya belum diketahui.
- C. Saya tahu batas utamanya, tetapi belum menentukan jumlah pesanan yang bisa diterima. — nilai 2.
  Penjelasan: Pembatas utama sudah diketahui, tetapi jumlah yang bisa dilayani belum ditentukan.
- D. Saya bisa menyebut jumlah pesanan yang bisa dilayani dan apa yang membatasi jumlah itu. — nilai 3.
  Penjelasan: Jumlah pesanan yang bisa dilayani dan pembatasnya sudah diketahui.

Rekomendasi bila indikator ini perlu diperjelas: Pilih satu ukuran, misalnya pesanan per hari. Perkirakan berapa yang bisa dilayani berdasarkan waktu, alat, dan orang yang tersedia.

### Aktivitas Utama

**Pekerjaan apa saja yang harus dilakukan untuk memenuhi pesanan?** (`work`)

Dari pesanan diterima sampai produk atau layanan sampai ke pembeli.

- A. Saya belum tahu pekerjaan apa saja yang diperlukan. — nilai 0.
  Penjelasan: Pekerjaan untuk memenuhi pesanan belum diketahui.
- B. Saya tahu sebagian pekerjaan, tetapi belum bisa menjelaskan dari awal sampai selesai. — nilai 1.
  Penjelasan: Sebagian pekerjaan sudah diketahui, tetapi alurnya belum lengkap.
- C. Saya bisa menjelaskan urutannya, tetapi belum tahu pekerjaan mana yang wajib dilakukan. — nilai 2.
  Penjelasan: Urutan pekerjaan sudah diketahui, tetapi kegiatan wajib belum dipilih.
- D. Saya tahu urutannya dan pekerjaan yang wajib dilakukan agar pesanan selesai. — nilai 3.
  Penjelasan: Urutan dan kegiatan wajib sudah diketahui.

Rekomendasi bila indikator ini perlu diperjelas: Tuliskan pekerjaan dari pesanan diterima sampai selesai. Tandai pekerjaan yang tanpanya pembeli tidak mendapat hasil yang dijanjikan.

**Pekerjaan mana yang paling menentukan manfaat yang Anda janjikan?** (`promiseWork`)

Misalnya penjadwalan pengiriman untuk janji tepat waktu, atau pemeriksaan bahan untuk kebutuhan tertentu.

- A. Saya belum menentukan manfaat yang dijanjikan. — nilai 0.
  Penjelasan: Manfaat yang harus didukung pekerjaan belum ditentukan.
- B. Manfaatnya sudah ada, tetapi saya belum tahu pekerjaan yang membuatnya tercapai. — nilai 1.
  Penjelasan: Manfaat sudah ada, tetapi kegiatan pendukungnya belum diketahui.
- C. Saya tahu beberapa pekerjaan yang mendukungnya, tetapi belum tahu mana yang paling menentukan. — nilai 2.
  Penjelasan: Kegiatan pendukung sudah diketahui, tetapi yang paling menentukan belum dipilih.
- D. Saya tahu pekerjaan yang paling menentukan dan bagaimana pekerjaan itu mendukung janji kepada pembeli. — nilai 3.
  Penjelasan: Kegiatan utama sudah dikaitkan dengan manfaat yang dijanjikan.

Rekomendasi bila indikator ini perlu diperjelas: Pilih satu manfaat yang dijanjikan. Sebutkan pekerjaan yang harus dilakukan agar pembeli benar-benar mendapat manfaat itu.

**Pekerjaan apa yang Anda lakukan untuk mendapatkan penjualan?** (`sellingWork`)

Misalnya menghubungi calon pembeli, menawarkan produk, memberi demo, atau menyiapkan tampilan toko.

- A. Saya belum menentukan kegiatan untuk mendapatkan penjualan. — nilai 0.
  Penjelasan: Kegiatan untuk mendapatkan penjualan belum dipilih.
- B. Saya sudah punya beberapa ide, tetapi belum memilih yang akan dilakukan. — nilai 1.
  Penjelasan: Ada ide kegiatan penjualan, tetapi belum ada pilihan.
- C. Saya sudah memilih kegiatannya, tetapi belum jelas bagaimana kegiatan itu mengarah ke pembelian. — nilai 2.
  Penjelasan: Kegiatan penjualan sudah dipilih, tetapi jalannya menuju pembelian belum jelas.
- D. Saya tahu kegiatan yang dilakukan dan langkah calon pembeli sampai melakukan pembelian. — nilai 3.
  Penjelasan: Kegiatan penjualan dan langkah menuju pembelian sudah diketahui.

Rekomendasi bila indikator ini perlu diperjelas: Pilih satu kegiatan penjualan. Jelaskan siapa yang ingin dijangkau dan apa langkah berikutnya agar mereka bisa membeli.

### Mitra Utama

**Apakah pekerjaan utama usaha Anda membutuhkan pihak luar?** (`partnerNeed`)

Misalnya pemasok bahan, kurir, tenaga lepas, atau penyedia platform. Tidak semua usaha perlu mitra utama.

- A. Saya belum tahu apakah perlu pihak luar. — nilai 0.
  Penjelasan: Kebutuhan pihak luar belum diketahui.
- B. Saya merasa perlu bantuan, tetapi belum tahu untuk pekerjaan apa. — nilai 1.
  Penjelasan: Ada kebutuhan bantuan, tetapi pekerjaannya belum ditentukan.
- C. Saya tahu pekerjaan yang perlu dibantu, tetapi batas antara pekerjaan sendiri dan pihak luar belum jelas. — nilai 2.
  Penjelasan: Pekerjaan pihak luar sudah dikenali, tetapi batas pembagiannya belum jelas.
- D. Saya tahu pekerjaan mana yang ditangani sendiri dan mana yang membutuhkan pihak luar. — nilai 3.
  Penjelasan: Pembagian pekerjaan sendiri dan pihak luar sudah ditentukan.
- E. Semua pekerjaan utama bisa saya tangani sendiri; saat ini tidak perlu pihak luar. — nilai 3.
  Penjelasan: Anda sudah memilih menjalankan pekerjaan utama tanpa mitra luar.

Rekomendasi bila indikator ini perlu diperjelas: Lihat pekerjaan utama usaha. Tentukan mana yang bisa dilakukan sendiri dan mana yang memerlukan bantuan pihak luar.

**Bantuan apa yang Anda butuhkan dari pihak luar?** (`partnerRole`)

Jawab untuk pihak luar yang paling dibutuhkan usaha.

- A. Saya belum tahu bantuan yang dibutuhkan. — nilai 0.
  Penjelasan: Kontribusi pihak luar belum diketahui.
- B. Saya tahu jenis bantuannya, tetapi belum tahu hasil yang perlu mereka berikan. — nilai 1.
  Penjelasan: Jenis bantuan sudah dipilih, tetapi hasil yang dibutuhkan belum jelas.
- C. Saya tahu hasil yang dibutuhkan, tetapi jumlah, waktu, atau ketentuannya belum jelas. — nilai 2.
  Penjelasan: Hasil yang dibutuhkan sudah diketahui, tetapi ketentuannya belum jelas.
- D. Saya tahu hasil yang dibutuhkan beserta jumlah, waktu, atau ketentuan yang sesuai. — nilai 3.
  Penjelasan: Kontribusi dan kebutuhan dari pihak luar sudah ditentukan.

Rekomendasi bila indikator ini perlu diperjelas: Untuk satu pihak luar, tuliskan hasil yang dibutuhkan dan kapan hasil itu harus tersedia.

**Mengapa pekerjaan itu perlu dibantu pihak luar?** (`partnerReason`)

Contoh: membutuhkan keahlian khusus, alat, akses, atau biaya yang lebih sesuai.

- A. Saya belum tahu mengapa perlu pihak luar. — nilai 0.
  Penjelasan: Alasan bekerja sama belum diketahui.
- B. Saya mengikuti kebiasaan atau usaha lain, tetapi belum tahu manfaatnya bagi usaha saya. — nilai 1.
  Penjelasan: Kerja sama belum memiliki alasan yang sesuai dengan kebutuhan sendiri.
- C. Saya tahu manfaatnya, tetapi belum membandingkannya dengan mengerjakan sendiri. — nilai 2.
  Penjelasan: Manfaat kerja sama sudah diketahui, tetapi pilihan mengerjakan sendiri belum dibandingkan.
- D. Saya tahu manfaat dan batas kerja samanya dibandingkan mengerjakan sendiri. — nilai 3.
  Penjelasan: Alasan dan batas kerja sama sudah dipertimbangkan.

Rekomendasi bila indikator ini perlu diperjelas: Bandingkan mengerjakan sendiri dan memakai pihak luar dari sisi keahlian, waktu, serta biaya yang dibutuhkan.

### Struktur Biaya

**Biaya apa saja yang diperlukan untuk menyediakan produk atau jasa Anda?** (`costItems`)

Termasuk biaya yang mudah terlewat, seperti kemasan, komisi, waktu kerja, atau pengiriman.

- A. Saya belum tahu biaya yang diperlukan. — nilai 0.
  Penjelasan: Komponen biaya penawaran belum diketahui.
- B. Saya baru tahu biaya bahan atau barang utamanya. — nilai 1.
  Penjelasan: Biaya baru mencakup bahan atau barang utama.
- C. Saya sudah tahu berbagai biayanya, tetapi masih ada bagian pekerjaan yang belum dihitung. — nilai 2.
  Penjelasan: Beberapa komponen biaya sudah diketahui, tetapi belum mencakup seluruh pekerjaan.
- D. Saya bisa menyebut biaya untuk seluruh bagian utama penawaran, termasuk pengerjaan dan penyerahannya. — nilai 3.
  Penjelasan: Komponen biaya sudah mencakup bagian utama penawaran.

Rekomendasi bila indikator ini perlu diperjelas: Ikuti satu pesanan dari awal sampai diterima pembeli. Catat biaya yang muncul di setiap tahap, bukan hanya bahan atau barang.

**Apa yang terjadi pada biaya usaha ketika jumlah pesanan berubah?** (`costTypes`)

Ada biaya yang mengikuti pesanan dan ada yang tetap dibayar saat penjualan sepi.

- A. Saya belum tahu biaya mana yang berubah. — nilai 0.
  Penjelasan: Perubahan biaya terhadap jumlah pesanan belum diketahui.
- B. Saya tahu ada biaya tetap dan biaya per pesanan, tetapi belum bisa membedakan biaya usaha saya. — nilai 1.
  Penjelasan: Jenis biaya sudah dikenal, tetapi biaya usaha sendiri belum dibedakan.
- C. Saya bisa membedakan sebagian, tetapi masih ada biaya utama yang belum jelas. — nilai 2.
  Penjelasan: Sebagian biaya sudah dibedakan, tetapi belum lengkap.
- D. Saya tahu biaya utama yang mengikuti pesanan dan biaya yang tetap dibayar, termasuk jika salah satunya tidak ada. — nilai 3.
  Penjelasan: Biaya utama sudah dibedakan menurut perubahan jumlah pesanan.

Rekomendasi bila indikator ini perlu diperjelas: Pisahkan biaya yang bertambah saat pesanan bertambah dari biaya yang tetap harus dibayar meskipun tidak ada pesanan.

**Apakah Anda tahu berapa biaya untuk memenuhi satu penawaran dibandingkan harga jualnya?** (`costPrice`)

Yang diperiksa adalah apakah angkanya diketahui. Biaya yang lebih tinggi dari harga tidak otomatis berarti modelnya tidak jelas.

- A. Saya belum tahu harga atau biayanya. — nilai 0.
  Penjelasan: Perbandingan harga dan biaya belum dapat dibuat.
- B. Saya tahu harga jualnya, tetapi belum memperkirakan biaya untuk memenuhinya. — nilai 1.
  Penjelasan: Harga sudah diketahui, tetapi biaya pemenuhannya belum diperkirakan.
- C. Saya sudah punya perkiraan biaya, tetapi belum membandingkannya dengan harga jual. — nilai 2.
  Penjelasan: Perkiraan biaya sudah ada, tetapi belum dibandingkan dengan harga.
- D. Saya sudah membandingkan harga dengan biaya memenuhi penawaran, dan tahu masih ada atau tidak ada biaya rutin yang perlu ditutup. — nilai 3.
  Penjelasan: Harga dan biaya sudah dibandingkan dengan memperhatikan biaya rutin.

Rekomendasi bila indikator ini perlu diperjelas: Pilih satu produk atau paket. Bandingkan harga jual dan biaya untuk memenuhinya, lalu lihat biaya rutin yang masih perlu ditutup.


## Revisi testing: penjelasan lengkap dan sepuluh simulasi

- Semua detail blok terbuka secara default; owner tetap dapat melipatnya.
- Tiap blok memuat arti blok, alasan status dari komposisi jawaban, pembacaan setiap jawaban, kegunaan blok dalam bisnis, contoh edukasi yang ditandai jelas, dan rekomendasi. Isi yang sama masuk ke PDF.
- Aturan skor tidak diubah dalam revisi ini. Status dibandingkan dengan ekspektasi yang ditulis sebelumnya pada `tests/fixtures/business-clarity-scenarios.json`.
- `tests/business-clarity-simulations.cjs` menjalankan 10 pengisian melalui DOM, menguji 5 pengulangan, resume, teks PDF, dan CTA. Membutuhkan jsdom serta `pdftotext`.
- Laporan: `docs/business-clarity-simulations.md`.
- `scripts/build-business-clarity-preview.cjs` menghasilkan situs HTML mandiri **di luar checkout produksi**. Output default `/workspace/shared/downloads/business-clarity-testing`. Tidak menulis ke website publik atau menjalankan deployment.
- Paket testing memiliki toolbar 10 contoh dan opsi mengisi sendiri. CSS/JS/jsPDF disertakan di dalam satu HTML sehingga bisa digunakan tanpa koneksi internet. Tautan ke WhatsApp/program tetap membutuhkan internet.
- Penyimpanan testing memakai `business-clarity-testing-v5`, terpisah dari versi situs utama. Contoh memerlukan localStorage; jika browser menolak penyimpanan file lokal, peserta tetap dapat mengisi manual dan mengunduh PDF.
