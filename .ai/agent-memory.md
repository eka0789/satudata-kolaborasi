# Agent Memory (Log Keputusan Arsitektur Jangka Panjang)

Dokumen ini mencatat keputusan arsitektural dan konvensi penting yang telah disepakati untuk repositori ini.

---

## 📌 Keputusan Terdaftar

### [2026-07-21] Adopsi Penuh Feature-First Monorepo
- **Keputusan**: Repositori menggunakan Turborepo + pnpm workspace dengan struktur Feature-First / Vertical Slice.
- **Rasional**: Memudahkan isolasi modul bisnis pemerintah (Naskah Dinas, Kepegawaian, E-Kinerja) agar dapat dipelihara mandiri.

### [2026-07-21] Standardisasi Audit Trail & Soft Delete Enterprise
- **Keputusan**: Setiap tabel bisnis wajib memiliki 5 kolom audit (`created_at`, `updated_at`, `deleted_at`, `created_by`, `updated_by`) dan menggunakan UUID v4.
- **Rasional**: Memenuhi standar audit BPK dan regulasi keamanan data BSSN.

### [2026-07-21] Framework Backend Hono & Drizzle ORM
- **Keputusan**: Backend menggunakan Hono Framework dengan Drizzle ORM dan Supabase PostgreSQL.
- **Rasional**: Performa eksekusi super cepat, tipe terstruktur penuh (type-safe), dan overhead memori sangat rendah.

### [2026-07-21] Frontend Stack React + Vite + Tailwind + shadcn/ui
- **Keputusan**: Web frontend menggunakan React 18, Vite, Tailwind CSS, shadcn/ui primitives, dan TanStack Query v5.
- **Rasional**: Pengalaman UI/UX enterprise yang modern, responsif, dan konsisten.