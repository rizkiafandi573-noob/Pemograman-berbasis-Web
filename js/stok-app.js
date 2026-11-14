// Logika Vue untuk stok.html
var blankForm = function () {
  return { kode: '', judul: '', kategori: '', upbjj: '', lokasiRak: '', harga: null, qty: null, safety: null, catatanHTML: '' };
};

new Vue({
  el: '#app',
  data: {
    upbjjList: dataBahanAjar.upbjjList,
    kategoriList: dataBahanAjar.kategoriList,
    stok: dataBahanAjar.stok.map(function (s) { return Object.assign({}, s); }),
    filter: { upbjj: '', kategori: '', reorder: false },
    sortBy: '',
    sortDir: 'asc',
    form: blankForm(),
    editKode: null,
    errors: {},
    notice: ''
  },
  computed: {
    // dependent options: kategori hanya yang ada di UT-Daerah terpilih
    kategoriOptions: function () {
      var up = this.filter.upbjj;
      var set = this.stok.filter(function (s) { return s.upbjj === up; }).map(function (s) { return s.kategori; });
      return set.filter(function (k, i) { return set.indexOf(k) === i; });
    },
    // computed di-cache: hanya dihitung ulang bila filter/sort/stok berubah
    filteredStok: function () {
      var f = this.filter;
      var list = this.stok.filter(function (s) {
        if (f.upbjj && s.upbjj !== f.upbjj) return false;
        if (f.kategori && s.kategori !== f.kategori) return false;
        if (f.reorder && !(s.qty < s.safety || s.qty === 0)) return false;
        return true;
      });
      if (this.sortBy) {
        var key = this.sortBy, dir = this.sortDir === 'asc' ? 1 : -1;
        list = list.slice().sort(function (a, b) {
          return (typeof a[key] === 'string' ? a[key].localeCompare(b[key]) : a[key] - b[key]) * dir;
        });
      }
      return list;
    },
    ringkas: function () {
      var r = { aman: 0, tipis: 0, kosong: 0 }, self = this;
      this.stok.forEach(function (s) { r[self.statusOf(s).key]++; });
      return r;
    }
  },
  watch: {
    // watcher 1: ganti UT-Daerah -> reset kategori agar tidak tersisa pilihan lama
    'filter.upbjj': function () { this.filter.kategori = ''; },
    // watcher 2: pantau perubahan data stok
    stok: {
      deep: true,
      handler: function () { this.notice = 'Data stok diperbarui pukul ' + new Date().toLocaleTimeString('id-ID'); }
    }
  },
  methods: {
    statusOf: function (s) {
      if (s.qty === 0) return { key: 'kosong', label: 'Kosong', icon: '✖' };
      if (s.qty < s.safety) return { key: 'tipis', label: 'Menipis', icon: '⚠' };
      return { key: 'aman', label: 'Aman', icon: '✔' };
    },
    rupiah: function (n) { return 'Rp ' + Number(n).toLocaleString('id-ID'); },
    resetFilter: function () {
      this.filter = { upbjj: '', kategori: '', reorder: false };
      this.sortBy = ''; this.sortDir = 'asc';
    },
    mulaiEdit: function (s) {
      this.form = Object.assign({}, s);
      this.editKode = s.kode; this.errors = {};
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    },
    batalEdit: function () { this.form = blankForm(); this.editKode = null; this.errors = {}; },
    validasi: function () {
      var f = this.form, e = {};
      var angka = function (v) { return typeof v === 'number' && Number.isInteger(v) && v >= 0; };
      if (!f.kode) e.kode = 'Kode wajib diisi.';
      else if (!this.editKode && this.stok.some(function (s) { return s.kode.toLowerCase() === f.kode.toLowerCase(); })) e.kode = 'Kode sudah dipakai.';
      if (!f.judul) e.judul = 'Judul wajib diisi.';
      if (!f.kategori) e.kategori = 'Pilih kategori.';
      if (!f.upbjj) e.upbjj = 'Pilih UT-Daerah.';
      if (!f.lokasiRak) e.lokasiRak = 'Lokasi rak wajib diisi.';
      if (!(typeof f.harga === 'number' && f.harga > 0)) e.harga = 'Harga harus lebih dari 0.';
      if (!angka(f.qty)) e.qty = 'Stok harus bilangan bulat 0 atau lebih.';
      if (!angka(f.safety)) e.safety = 'Safety harus bilangan bulat 0 atau lebih.';
      this.errors = e;
      return Object.keys(e).length === 0;
    },
    simpan: function () {
      if (!this.validasi()) return;
      var data = Object.assign({}, this.form);
      if (this.editKode) {
        var i = this.stok.findIndex(function (s) { return s.kode === data.kode; });
        this.$set(this.stok, i, data);
      } else {
        this.stok.push(data);
      }
      this.batalEdit();
    }
  }
});
