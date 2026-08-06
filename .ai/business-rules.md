# Business Rules (Aturan Bisnis Pemerintah Enterprise)

## Purpose

Dokumen ini mendefinisikan aturan bisnis utama untuk aplikasi instansi pemerintah (Kementerian, Lembaga, Pemerintah Daerah). Setiap kode, skema database, API, dan UI yang dihasilkan WAJIB mematuhi aturan di bawah ini.

---

## 1. Identitas & Data Pegawai (ASN / PNS / PPPK / Non-ASN)

### Validasi NIP (Nomor Induk Pegawai)
- NIP ASN terdiri dari **18 digit angka** dengan format: `YYYYMMDD YYYYMM X NNN`
  - 8 digit pertama: Tanggal Lahir (`YYYYMMDD`)
  - 6 digit berikutnya: TMT Pengangkatan PNS (`YYYYMM`)
  - 1 digit berikutnya: Jenis Kelamin (`1` = Pria, `2` = Wanita)
  - 3 digit terakhir: Nomor Urut Pengangkatan
- NIP WAJIB divalidasi dengan regex: `/^\d{18}$/`
- NIP bersifat unik (`UNIQUE constraint`) dan menjadi kunci pencarian utama data pegawai.

### Validasi NIK (Nomor Induk Kependudukan)
- NIK terdiri dari **16 digit angka**.
- Wajib divalidasi dengan regex: `/^\d{16}$/`

---

## 2. Struktur Organisasi & Hierarki Jabatan

### Unit Kerja & Jabatan
- Setiap pegawai terikat pada satu **Unit Kerja Utama** (Satuan Kerja / Eselon I, II, III, IV atau Kelompok Jabatan Fungsional).
- Hirarki Jabatan menentukan kewenangan persetujuan (approval/disposisi) dan visibilitas data.
- Perubahan jabatan/unit kerja wajib tercatat dalam riwayat (history) dan tidak menghapus data historis.

---

## 3. Pengelolaan Naskah Dinas & E-Surat (Tata Naskah Dinas Elektronik - TNDE)

### Penomoran Surat Otomatis
- Format Nomor Surat mengikuti standar instansi: `[Kode-Klasifikasi]/[No-Urut]/[Kode-Unit]/[Tahun]` (contoh: `005/124/Diskominfo/2026`).
- Nomor urut dipicu secara otomatis per tahun kalender per jenis naskah dinas.

### Klasifikasi Kerahasiaan Surat
- `BIASA`: Dapat diakses oleh unit kerja terkait.
- `TERBATAS`: Hanya dapat diakses oleh pihak yang tertera pada tujuan/tembusan.
- `RAHASIA`: Memerlukan otentikasi tingkat lanjut dan otorisasi peranan khusus (`surat.secret.read`).
- `SANGAT RAHASIA`: Terenkripsi pada tingkat data dan dibatasi secara ketat.

### Alur Disposisi & Persetujuan (Workflow)
- Alur disposisi bersifat terarah dari Atasan ke Bawahan atau Antar-Unit Kerja.
- Status Surat: `DRAFT` ➔ `PENGAJUAN` ➔ `VERIFIKASI` ➔ `TANDA_TANGAN` ➔ `TERKIRIM` ➔ `DISPOSISI` ➔ `SELESAI` / `DITOLAK`.
- Tanda Tangan Elektronik (TTE) mengintegrasikan layanan BSrE / BSSN atau mockup token digital standar SPBE.

---

## 4. Keamanan Data, Soft Delete & Audit Trail

### Kebijakan Hapus Data (Soft Delete)
- **DILARANG** melakukan `DELETE` permanen pada data bisnis (Pegawai, Surat, Anggaran, Pengaduan, Aset).
- Hapus data dilakukan secara **Soft Delete** dengan mengisi kolom `deleted_at = CURRENT_TIMESTAMP` dan `deleted_by = user_id`.
- Pencarian data secara default WAJIB menyaring record yang `deleted_at IS NULL`.

### Audit Trail Standar BPK & BSSN
Setiap tabel transaksi bisnis WAJIB memiliki 5 kolom audit:
1. `created_at` (timestamp with timezone, default now())
2. `updated_at` (timestamp with timezone, default now())
3. `deleted_at` (timestamp with timezone, nullable)
4. `created_by` (uuid / string ID pengguna pembuat)
5. `updated_by` (uuid / string ID pengguna pengubah)

Setiap aksi kritis (Login, Ubah Akses, Disposisi, TTE, Hapus Data) WAJIB mencatat log audit ke tabel `audit_logs` (User ID, IP Address, Action, Target Resource, Old Values, New Values, Timestamp).

---

## 5. Matriks Akses Peran (Role-Based Access Control - RBAC)

Peran Standar Sistem Pemerintah:
- `SUPER_ADMIN`: Pengelola penuh konfigurasi sistem dan sistem log.
- `ADMIN_INSTANSI`: Pengelola master data pegawai, unit kerja, dan peran instansi.
- `PIMPINAN`: Menyetujui naskah dinas, melakukan disposisi, melihat dashboard eksekutif.
- `VERIFIKATOR`: Memeriksa draft naskah dinas dan kelengkapan berkas.
- `OPERATOR` / `PENGELOLA_SURAT`: Input data awal, agenda surat masuk/keluar.
- `PEGAWAI`: Pengguna standar (mengajukan izin, melihat profil, menerima disposisi).

Aturan Akses:
- Pengguna hanya dapat melihat data sesuai batas kewenangan unit kerjanya (*Data Scoping / Multi-tenancy Unit Kerja*).

---

## 6. Penanganan Sanksi & Validasi Input

- Semua formulir input WAJIB melakukan validasi dua arah (Client-side & Server-side Zod Validation).
- Tindakan manipulasi data atau percobaan akses tanpa hak harus diblokir dan dicatat sebagai potensi insiden siber.
