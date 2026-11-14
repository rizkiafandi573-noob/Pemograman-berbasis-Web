// Dummy data (dari dataBahanAjar.js soal, dijadikan objek global agar dipakai bersama oleh stok-app.js & tracking-app.js)
var dataBahanAjar = {
  upbjjList: ["Jakarta", "Surabaya", "Makassar", "Padang", "Denpasar"],
  kategoriList: ["MK Wajib", "MK Pilihan", "Praktikum", "Problem-Based"],
  pengirimanList: [
    { kode: "REG", nama: "JNE Regular (3-5 hari)" },
    { kode: "EXP", nama: "JNE Express (1-2 hari)" }
  ],
  paket: [
    { kode: "PAKET-UT-001", nama: "PAKET IPS Dasar", isi: ["EKMA4116", "EKMA4115"], harga: 120000 },
    { kode: "PAKET-UT-002", nama: "PAKET IPA Dasar", isi: ["BIOL4201", "FISIP4001"], harga: 140000 }
  ],
  stok: [
    { kode: "EKMA4116", judul: "Pengantar Manajemen", kategori: "MK Wajib", upbjj: "Jakarta", lokasiRak: "R1-A3", harga: 65000, qty: 28, safety: 20, catatanHTML: "<em>Edisi 2024, cetak ulang</em>" },
    { kode: "EKMA4115", judul: "Pengantar Akuntansi", kategori: "MK Wajib", upbjj: "Jakarta", lokasiRak: "R1-A4", harga: 60000, qty: 7, safety: 15, catatanHTML: "<strong>Cover baru</strong>" },
    { kode: "BIOL4201", judul: "Biologi Umum (Praktikum)", kategori: "Praktikum", upbjj: "Surabaya", lokasiRak: "R3-B2", harga: 80000, qty: 12, safety: 10, catatanHTML: "Butuh <u>pendingin</u> untuk kit basah" },
    { kode: "FISIP4001", judul: "Dasar-Dasar Sosiologi", kategori: "MK Pilihan", upbjj: "Makassar", lokasiRak: "R2-C1", harga: 55000, qty: 2, safety: 8, catatanHTML: "Stok <i>menipis</i>, prioritaskan reorder" },
    { kode: "MKDK4001", judul: "Pendidikan Kewarganegaraan", kategori: "MK Wajib", upbjj: "Surabaya", lokasiRak: "R1-B1", harga: 50000, qty: 0, safety: 10, catatanHTML: "Menunggu cetak ulang" },
    { kode: "PBL4302", judul: "Studi Kasus Manajemen Proyek", kategori: "Problem-Based", upbjj: "Jakarta", lokasiRak: "R4-A1", harga: 72000, qty: 14, safety: 12, catatanHTML: "-" },
    { kode: "STAT4101", judul: "Statistika Dasar", kategori: "MK Pilihan", upbjj: "Padang", lokasiRak: "R2-D2", harga: 58000, qty: 9, safety: 9, catatanHTML: "<em>Stok pas di batas aman</em>" },
    { kode: "PRAK4210", judul: "Praktikum Kimia Dasar", kategori: "Praktikum", upbjj: "Denpasar", lokasiRak: "R3-C4", harga: 95000, qty: 0, safety: 6, catatanHTML: "<strong>Habis</strong>, reorder segera" }
  ],
  // Data awal tracking DO (nomor memakai format DO{tahun}-{urut 3 digit})
  tracking: [
    {
      noDO: "DO2025-001", nim: "123456789", nama: "Rina Wulandari", status: "Dalam Perjalanan",
      ekspedisi: "REG", tanggalKirim: "2025-08-25", paket: "PAKET-UT-001", total: 120000,
      perjalanan: [
        { waktu: "2025-08-25 10:12:20", keterangan: "Penerimaan di Loket: TANGSEL" },
        { waktu: "2025-08-25 14:07:56", keterangan: "Tiba di Hub: JAKSEL" },
        { waktu: "2025-08-26 08:44:01", keterangan: "Diteruskan ke Kantor Tujuan" }
      ]
    }
  ]
};
