# Definition of Done (DoD)

Sebuah fitur dinyatakan **SELESAI (DONE)** dan siap disebar ke lingkungan produksi hanya jika telah memenuhi seluruh poin pemeriksaan berikut:

---

## 📋 Checklist Kelayakan Fitur

- [ ] **Database & Migrasi**:
  - Tabel Drizzle ORM didefinisikan dengan Primary Key UUID & 5 kolom audit (`created_at`, `updated_at`, `deleted_at`, `created_by`, `updated_by`).
  - File migrasi SQL berhasil dibuat (`drizzle-kit generate`) dan diuji (`drizzle-kit push`/`migrate`).

- [ ] **Validasi & Type Safety**:
  - Skema Zod lengkap untuk Body, Query, dan Params.
  - Bebas dari tipe `any`, `@ts-ignore`, atau warning TypeScript.

- [ ] **Backend API**:
  - Route Hono terpasang dengan middleware autentikasi & RBAC permission.
  - Mengembalikan format JSON standar (`success`, `message`, `data`, `meta`).
  - Log audit tercatat untuk operasi pemutakhiran/penghapusan.

- [ ] **Frontend & UI**:
  - Menggunakan komponen `shadcn/ui` + Tailwind CSS.
  - Mendukung 5 State UI: **Loading (Skeleton)**, **Error**, **Empty**, **Data View**, & **Responsive Layout**.
  - Mendukung Mode Terang (Light Mode) dan Mode Gelap (Dark Mode).

- [ ] **Pengujian & Build**:
  - Build aplikasi backend & frontend sukses tanpa error (`pnpm build`).
  - Linter & Formatter sukses tanpa warning (`pnpm lint`).

- [ ] **Dokumentasi**:
  - OpenAPI / Dokumentasi API diperbarui.
  - Berkas `README.md` pada modul terkait telah diperbarui.