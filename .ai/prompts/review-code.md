# AI Prompt: Code Review & Security Audit

## Context & Purpose
Gunakan prompt ini untuk melakukan peninjauan kode (code review) dan audit keamanan terhadap file atau modul tertentu sebelum dimasukkan ke dalam branch utama atau lingkungan produksi.

---

## 🤖 AI Instructions

Saat mengeksekusi peninjauan kode, lakukan pemeriksaan menyeluruh berdasarkan 6 dimensi berikut:

### 1. Keamanan & Standar OWASP
- Apakah ada potensi injection? (Convex sudah mem-parameterisasi query secara aman; waspadai input string yang di-interpolasi ke argumen).
- Apakah ada kredensial/secret key yang di-hardcode dalam kode?
- Apakah mutation privat dilindungi `getAuthUserId(ctx)` + cek peran (RBAC)?
- Apakah argumen tervalidasi ketat dengan validator `v.object` / `v.id`?
- Apakah `@convex-dev/auth` dikonfigurasi dengan benar (provider, password hash, dsb.)?

### 2. Kepatuhan Aturan Bisnis Pemerintah
- Apakah table bisnis memiliki kolom audit `createdBy: v.id("users")` dan `deletedAt: v.optional(v.number())`?
- Apakah fitur menggunakan **Soft Delete** (patch `deletedAt`) alih-alih `ctx.db.delete` permanen?
- Apakah semua query `list`/`get`/`getBySlug` menyaring `deletedAt === undefined`?
- Apakah NIP divalidasi 18 digit angka (validasi Zod di form)?

### 3. Kualitas Kode & Type Safety
- Apakah ada penggunaan `any` atau `// @ts-ignore`? (Wajib dihapus/diperbaiki).
- Apakah ada kode mati, unused imports, atau komentar `TODO`?
- Apakah panjang fungsi di bawah 50 baris dan komponen UI di bawah 300 baris?
- Apakah tipe Convex (`v.id`, hasil `api`) digunakan eksplisit & type-safe?

### 4. Performa & Query Efficiency
- Apakah ada masalah N+1 query (panggil query per item dalam loop)?
- Apakah query list menggunakan index (`withIndex`) dan filter soft-delete yang benar?
- Apakah hasil query dibatasi (`take`) jika hanya butuh sebagian data?

### 5. Format Respons & Error Handling
- Apakah mutation melempar error yang jelas ("Not authenticated", validasi) tanpa mengekspos stack trace internal ke client?
- Apakah client menangani error `useQuery`/`useMutation` dengan UI yang ramah (alert/retry)?

---

## 📊 Format Output Laporan Audit

Hasilkan laporan review dengan format berikut:
1. **Ringkasan Skor Kualitas**: (Skor 1-10 & Status PASSED/FAILED).
2. **Temuan Kritis (Critical Issues)**: Masalah keamanan/bug yang wajib diperbaiki segera.
3. **Temuan Sedang (Warnings)**: Pelanggaran coding standards / type safety.
4. **Rekomendasi Perbaikan (Refactoring Code)**: Kode hasil perbaikan siap pakai.
