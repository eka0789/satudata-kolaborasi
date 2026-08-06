# AI Prompt: Refactor Legacy Code

## Context & Purpose
Gunakan prompt ini untuk merapikan dan merestrukturisasi kode lama (*legacy code*) atau kode monolitis menjadi arsitektur Feature-First / Vertical Slice yang bersih, terstruktur, type-safe, dan mematuhi aturan `.ai/`.

---

## 🤖 AI Instructions

Saat melakukan refactoring kode, ikuti alur kerja aman berikut:

### Step 1: Analisis Kode Asal & Identifikasi Masalah
Tentukan titik-titik yang perlu diperbaiki:
- Pengelompokan berkas yang masih acak/monolitis.
- Komponen UI yang terlalu besar (>300 baris).
- Penggunaan `any` atau penanganan error yang tidak konsisten.
- Mutasi data langsung di UI tanpa lewat Convex mutation.
- Query yang redundan / tanpa filter soft-delete (`deletedAt`).

### Step 2: Rencanakan Struktur Target Feature-First
Petakan berkas lama ke dalam struktur fitur otonom:
```text
src/features/[feature_name]/
├── components/
├── pages/
├── hooks/
└── schema.ts          # skema Zod untuk form
```
Backend tetap di `src/convex/[feature].ts` (query/mutation) + `src/convex/schema.ts`.

### Step 3: Eksekusi Refactoring Step-by-Step
1. Ekstrak skema validasi Zod ke `schema.ts` (di dalam fitur).
2. Pindahkan logika akses data ke mutation/query Convex di `src/convex/[feature].ts` (jika belum ada).
3. Ganti panggilan REST/fetch manual dengan `useQuery` / `useMutation` dari `convex/react`.
4. Ekstrak custom hook pembungkus Convex ke `hooks/`.
5. Pecah komponen UI raksasa menjadi sub-komponen kecil di `components/`.
6. Pastikan semua list/detail menyaring `deletedAt === undefined`.

### Step 4: Verifikasi Fungsionalitas
- Pastikan tidak ada perubahan perilaku bisnis (*zero functional regression*).
- Pastikan `npm run typecheck`, `npm run lint`, dan `npm run build` lulus tanpa warning.
- Pastikan `npx convex dev` berjalan tanpa error.
