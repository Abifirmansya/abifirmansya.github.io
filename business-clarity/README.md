# Business Clarity

- `/business-clarity/`: halaman program ID/EN; pilihan bahasa mengikuti `abi-site-language` milik website pribadi.
- `/business-clarity/check-up/`: kuesioner, analisis, dan laporan PDF berbahasa Indonesia. Dibuka langsung pada profil atau jawaban tersimpan. Tidak memakai login ChatGPT maupun API AI.
- Pilihan ID/EN dijelaskan sebelum peserta masuk. Check-up tidak mengubah pilihan bahasa website pribadi.
- `check-up/assessment.js` berisi pertanyaan aktif dan aturan interpretasi; dimuat setelah `data.js`. Empat pertanyaan pada setiap blok BMC, jumlah pilihan sesuai pertanyaan. Ini instrumen edukasi, bukan skala kesehatan tervalidasi.
- `check-up/report.js` membuat PDF di browser dengan jsPDF berlisensi MIT (`check-up/vendor`). Gambar ilustrasi AI disimpan lokal di `check-up/assets`.
- Jawaban tersimpan di browser peserta dengan kunci `business-clarity-checkup-v4`, bukan di repository atau server.
- WhatsApp workshop berbeda dari tautan komunitas. Instagram dan komunitas tersedia tanpa menjadi syarat unduhan.

Publikasi mengikuti pengaturan GitHub Pages yang sudah digunakan repository: branch main, direktori root. Jangan menambahkan workflow yang hanya mempublikasikan folder check-up, karena akan menghilangkan halaman website pribadi dari keluaran publikasi.

Uji integrasi: `BC_JSDOM=/lokasi/instalasi/jsdom node tests/business-clarity.cjs`. jsdom hanya untuk pengujian; pengunjung tidak memerlukannya.
