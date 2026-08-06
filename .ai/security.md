# Security Standards & Guidelines

## Core Principles
1. **Never Trust Client Input**: Selalu jalankan validasi server-side menggunakan Zod.
2. **Zero Trust Architecture**: Setiap permintaan API wajib diautentikasi dan diverifikasi hak aksesnya.
3. **Data Protection & Compliance**: Mengikuti standar keamanan BSSN dan OWASP Top 10.

---

## 🔒 Security Requirements

### 1. Authentication & Session
- Gunakan Supabase Auth (JWT Bearer Token).
- Simpan token dengan aman (HTTP-Only Secure Cookies / Encrypted Storage).
- Waktu kedaluwarsa token JWT yang ketat dan mekanisme refresh token.

### 2. Role-Based Access Control (RBAC) & Scope
- Granular permissions (contoh: `pegawai.read`, `pegawai.create`, `pegawai.delete`).
- Batasi visibilitas data berdasarkan hierarki unit kerja pengguna (*Data Scoping / Multi-tenancy*).

### 3. Data Sanitization & Protection
- Sanitasi seluruh string input untuk mencegah serangan XSS (*Cross-Site Scripting*).
- Drizzle ORM menyusun parameterized queries secara otomatis untuk mencegah SQL Injection.
- Dilarang menyimpan kata sandi plain text. Supabase Auth menangani hashing bcrypt/argon2.

### 4. Secret & Key Management
- Dilarang keras menaruh API Key, Secret Key, atau Password di dalam kode sumber (*hardcoded*).
- Gunakan berkas `.env` yang didaftarkan ke `.gitignore`.

### 5. Audit Logging & Non-Repudiation
- Catat seluruh transaksi penting (Login, Perubahan Akses, TTE, Disposisi Surat, Hapus Data) ke tabel audit log.
- Log harus mencatat: `user_id`, `ip_address`, `action`, `resource`, `old_value`, `new_value`, `timestamp`.

### 6. Error & Information Leak Prevention
- Dilarang mengembalikan stack trace, raw SQL error, atau detail internal server kepada pengguna client.
- Tampilkan pesan error yang umum bagi client, dan catat detail error sesungguhnya ke server log.