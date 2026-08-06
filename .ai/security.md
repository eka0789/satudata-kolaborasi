# Security Standards & Guidelines

## Core Principles
1. **Never Trust Client Input**: Selalu jalankan validasi di sisi server menggunakan validator Convex (`v.object`) — validator Zod hanya untuk layer form.
2. **Zero Trust Architecture**: Setiap function Convex yang mengakses data privat wajib mengautentikasi pengguna (`getAuthUserId`) dan memverifikasi hak aksesnya.
3. **Data Protection & Compliance**: Mengikuti standar keamanan BSSN dan OWASP Top 10.

---

## 🔒 Security Requirements

### 1. Authentication & Session
- Gunakan **Convex Auth** (`@convex-dev/auth`) dengan provider `Email OTP` dan `Anonymous`.
- Sesi dikelola oleh Convex (server-side); jangan menyimpan token secara manual di client.
- Semua function yang butuh identitas user memanggil `getAuthUserId(ctx)` dan menangani kasus `null` (tidak terautentikasi).

### 2. Role-Based Access Control (RBAC) & Scope
- Model pengguna memiliki field `role` (`"user" | "admin"`); peran granular tambahan (contoh: `communityAdmin`) ditentukan lewat relasi keanggotaan (`communityMembers.role`).
- Batasi visibilitas data berdasarkan keanggotaan/unit kerja (*Data Scoping*): cek role anggota sebelum mutasi komunitas/proyek.
- Gunakan `ConvexError` untuk menolak akses — jangan mengembalikan detail internal.

### 3. Data Sanitization & Protection
- Convex selalu menyimpan data sebagai dokumen (parameterized, tanpa SQL injection).
- Sanitasi string input di sisi server sebelum disimpan.
- Jangan pernah menyimpan kata sandi plain text — `Convex Auth` menangani hashing/OTP di sisi server.

### 4. Secret & Key Management
- Dilarang keras menaruh API Key, Secret Key, atau Password di dalam kode sumber (*hardcoded*).
- Gunakan environment variables (`envVars` di `convex.json` / `.env`) yang didaftarkan ke `.gitignore`.
- Konfigurasi `AUTH_SECRET` dan kredensial provider email (mis. `RESEND_API_KEY`) hanya lewat env.

### 5. Audit Logging & Non-Repudiation
- Catat transaksi penting (login, perubahan akses, penghapusan data) ke table `auditLogs` (Paket B).
- Setiap dokumen bisnis menyertakan field audit: `createdBy`, `updatedBy`, dan `deletedAt` (soft-delete).
- Gunakan `_creationTime` bawaan Convex sebagai timestamp (bukan `created_at` manual).

### 6. Error & Information Leak Prevention
- Dilarang mengembalikan stack trace atau detail internal server kepada pengguna client.
- Untuk error yang boleh diketahui klien, lempar `ConvexError` dengan pesan yang aman; catat detail sesungguhnya ke log server / `auditLogs`.
- Jangan mengekspos `process.env` atau nilai `envVars` ke kode client (`src/` di luar `convex/`).
