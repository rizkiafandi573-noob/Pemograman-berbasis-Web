// Logika Vue untuk tracking.html
new Vue({
  el: '#app',
  data: {
    pengirimanList: dataBahanAjar.pengirimanList,
    paket: dataBahanAjar.paket,
    stok: dataBahanAjar.stok,
    daftar: dataBahanAjar.tracking.slice(),
    form: { nim: '', nama: '', ekspedisi: '', paket: '', tanggalKirim: '' },
    errors: {},
    terbuka: null,
    pesan: ''
  },
  created: function () { this.form.tanggalKirim = this.hariIni(); },
  computed: {
    paketDipilih: function () {
      var k = this.form.paket;
      return this.paket.find(function (p) { return p.kode === k; }) || null;
    },
    // DO + tahun berjalan + urutan 3 digit (lanjut dari nomor terbesar di tahun tsb)
    nomorBaru: function () {
      var prefix = 'DO' + new Date().getFullYear() + '-';
      var max = 0;
      this.daftar.forEach(function (d) {
        if (d.noDO.indexOf(prefix) === 0) max = Math.max(max, parseInt(d.noDO.slice(prefix.length), 10));
      });
      return prefix + String(max + 1).padStart(3, '0');
    }
  },
  watch: {
    // watcher 1: NIM hanya boleh angka
    'form.nim': function (v) {
      var bersih = v.replace(/\D/g, '');
      if (bersih !== v) this.form.nim = bersih;
    },
    // watcher 2: hapus pesan sukses & error paket saat paket diganti
    'form.paket': function () { this.pesan = ''; this.$delete(this.errors, 'paket'); }
  },
  methods: {
    hariIni: function () {
      var d = new Date(), p = function (n) { return String(n).padStart(2, '0'); };
      return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
    },
    rupiah: function (n) { return 'Rp ' + Number(n).toLocaleString('id-ID'); },
    judulDari: function (kode) {
      var s = this.stok.find(function (x) { return x.kode === kode; });
      return s ? s.judul : '(tidak ada di stok)';
    },
    namaEkspedisi: function (kode) {
      var e = this.pengirimanList.find(function (x) { return x.kode === kode; });
      return e ? e.nama : kode;
    },
    toggle: function (no) { this.terbuka = this.terbuka === no ? null : no; },
    tambah: function () {
      var f = this.form, e = {};
      if (!/^\d{9,}$/.test(f.nim)) e.nim = 'NIM harus berupa angka, minimal 9 digit.';
      if (f.nama.length < 3) e.nama = 'Nama minimal 3 huruf.';
      if (!f.ekspedisi) e.ekspedisi = 'Pilih ekspedisi.';
      if (!f.paket) e.paket = 'Pilih paket bahan ajar.';
      if (!f.tanggalKirim) e.tanggalKirim = 'Tanggal kirim wajib diisi.';
      this.errors = e;
      if (Object.keys(e).length) return;
      var no = this.nomorBaru;
      this.daftar.unshift({
        noDO: no, nim: f.nim, nama: f.nama, status: 'Diproses', ekspedisi: f.ekspedisi,
        tanggalKirim: f.tanggalKirim, paket: f.paket, total: this.paketDipilih.harga,
        perjalanan: [{ waktu: f.tanggalKirim, keterangan: 'DO dibuat, menunggu pengiriman' }]
      });
      this.form = { nim: '', nama: '', ekspedisi: '', paket: '', tanggalKirim: this.hariIni() };
      this.pesan = 'DO ' + no + ' berhasil dibuat.';
    }
  }
});
