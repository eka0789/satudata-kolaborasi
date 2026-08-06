# AI Prompt: Debug & Fix System Issue

## Context & Purpose
Gunakan prompt ini untuk menganalisis, mendiagnosis, dan menyelesaikan bug atau error sistematis secara efektif sampai tuntas tanpa merusak bagian kode lain.

---

## 🤖 AI Instructions

Saat mengeksekusi debugging dan pemulihan bug, lakukan langkah-langkah berikut:

### Step 1: Analisis Gejala & Error Log
Minta atau kumpulkan detail:
- Pesan kesalahan (Error message & stack trace).
- Langkah-langkah mereproduksi bug (*steps to reproduce*).
- Berkas/komponen yang dicurigai.

### Step 2: Identifikasi Penyebab Utama (Root Cause Analysis)
Tentukan akar masalah dengan mengecek lapisan berikut:
- **Validator Convex** (`v.object`/`v.id`/`v.union`): apakah payload tidak cocok dengan schema?
- **Schema/Index**: apakah table belum didefinisikan di `src/convex/schema.ts`, atau index yang dirujuk `withIndex` tidak ada?
- **Autentikasi**: apakah `getAuthUserId(ctx)` mengembalikan `null` (belum login / token kedaluwarsa) atau user tidak punya peran?
- **Soft Delete**: apakah query menampilkan data yang `deletedAt` sudah terisi (filter tidak diterapkan)?
- **Reactivity**: apakah data di client tidak ter-update setelah mutation (rekomendasi: pastikan mutation me-return nilai yang diperlukan / query tergantung data yang berubah)?
- **State UI**: apakah terjadi re-render tak berujung (mis. argumen object baru dibuat setiap render di `useQuery` — gunakan `useMemo` atau inline primitive)?

### Step 3: Susun Rencana Perbaikan Minimal (Minimal Invasive Fix)
Rencanakan solusi perbaikan yang paling efisien tanpa mengubah arsitektur secara drastis.

### Step 4: Eksekusi Perbaikan Kode
Perbaiki kode dengan menyertakan komentar penjelas di tempat terjadinya bug.

### Step 5: Verifikasi & Pencegahan (Regression Prevention)
Jelaskan mengapa perbaikan tersebut menyelesaikan akar masalah dan berikan saran pengujian agar bug tidak terulang di masa mendatang:
- Jalankan `npm run typecheck`, `npm run lint`, `npm run build`.
- Jika bug terkait mutation/query, uji ulang alur dengan `npx convex dev`.
