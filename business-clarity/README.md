# Business Clarity

- `/business-clarity/`: halaman program ID/EN, mengikuti `abi-site-language`.
- `/business-clarity/check-up/`: check-up kejelasan model bisnis berbahasa Indonesia. Dibuka pada profil, jawaban tersimpan, atau hasil lengkap terakhir. Tidak memakai API AI, login, atau pengumpulan kontak.
- Acuan isi dan aturan: [`../docs/business-clarity-spec.md`](../docs/business-clarity-spec.md).
- `check-up/data.js`: 27 pertanyaan, tiga per blok BMC, makna opsi dan rekomendasi. Jika tidak membutuhkan mitra luar, dua pertanyaan dilewati (25 pertanyaan).
- `check-up/assessment.js`: empat tingkat kejelasan per blok dan keseluruhan. Bukan penilaian kesehatan/keuntungan usaha dan belum divalidasi ilmiah.
- `check-up/report.js`: PDF lokal memakai jsPDF (MIT) yang sudah tersedia di `vendor`; tidak memerlukan fetch gambar/font eksternal.
- `business-clarity-checkup-v5`: jawaban hanya tersimpan di browser. Versi 4 tidak diubah atau dibaca sebagai jawaban versi baru.
- Usaha yang belum mulai menawarkan/menjual diarahkan ke halaman program; tidak menerima penilaian usaha berjalan.
- Grup WhatsApp dan event berikutnya ada di akhir hasil/PDF, keduanya opsional. Tidak ada tanggal atau harga event yang dikarang.

Publikasi tetap mengikuti GitHub Pages: main, direktori root. Jangan menambah workflow yang hanya mempublikasikan check-up.

Validasi:

```sh
node tests/business-clarity-analysis.cjs
BC_JSDOM=/workspace/.setup/abi-site/node_modules/jsdom node tests/business-clarity.cjs
python3 -m http.server 8000 --bind 127.0.0.1
```

jsdom hanya dependensi pengujian dan dipasang di luar checkout. Skrip integrasi mencakup situs ID/EN, alur check-up, PDF, penyimpanan, perubahan jawaban, percabangan mitra, dan tautan CTA.

Versi testing terpisah (tidak mempublikasikan situs):

```sh
BC_JSDOM=/workspace/.setup/abi-site/node_modules/jsdom node tests/business-clarity-simulations.cjs
node scripts/build-business-clarity-preview.cjs
```

Buka `index.html` pada folder output di browser. Sepuluh contoh dapat dipilih di toolbar testing; `simulasi.html` memuat hasil pemeriksaannya. Detail tiap blok terbuka dan memuat alasan status, penjelasan, contoh, dan rekomendasi yang juga ada dalam PDF.
