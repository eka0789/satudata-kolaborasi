# AI Prompt: Code Review & Security Audit

## Context & Purpose
Gunakan prompt ini untuk melakukan peninjauan kode (code review) dan audit keamanan terhadap file atau modul tertentu sebelum dimasukkan ke dalam branch utama atau lingkungan produksi.

---

## 🤖 AI Instructions

Saat mengeksekusi peninjauan kode, lakukan pemeriksaan menyeluruh berdasarkan 6 dimensi berikut:

### 1. Keamanan & Standar OWASP / BSSN
- Apakah ada potensi SQL Injection? (Harus menggunakan Drizzle ORM parameterized query).
- Apakah ada kredensial/secret key yang di-hardcode dalam kode?
- Apakah endpoint private dilindungi middleware Autentikasi & RBAC?
- Apakah input data divalidasi ketat dengan Zod di sisi server?

### 2. Kepatuhan Aturan Bisnis Pemerintah
- Apakah tabel bisnis memiliki 5 kolom audit (`created_at`, `updated_at`, `deleted_at`, `created_by`, `updated_by`)?
- Apakah fitur menggunakan **Soft Delete** alih-alih `DELETE` permanen?
- Apakah NIP divalidasi 18 digit angka?

### 3. Kualitas Kode & Type Safety
- Apakah ada penggunaan `any` atau `// @ts-ignore`? (Wajib dihapus/diperbaiki).
- Apakah ada kode mati, unused imports, atau komentar `TODO`?
- Apakah panjang fungsi di bawah 50 baris dan komponen UI di bawah 300 baris?

### 4. Performa & Query Efficiency
- Apakah ada masalah N+1 Query pada database?
- Apakah pencarian besar menggunakan paginasi?

### 5. Format Respons & Error Handling
- Apakah REST API mengembalikan format JSON standar (`success`, `message`, `data`, `meta`)?
- Apakah error handling mencegah ekspos stack trace internal ke pengguna client?

---

## 📊 Format Output Laporan Audit

Hasilkan laporan review dengan format berikut:
1. **Ringkasan Skor Kualitas**: (Skor 1-10 & Status PASSED/FAILED).
2. **Temuan Kritis (Critical Issues)**: Masalah keamanan/bug yang wajib diperbaiki segera.
3. **Temuan Sedang (Warnings)**: Pelanggaran coding standards / type safety.
4. **Rekomendasi Perbaikan (Refactoring Code)**: Kode hasil perbaikan siap pakai.
