# Definition of Done (DoD)

Sebuah fitur dinyatakan **SELESAI (DONE)** dan siap disebar ke lingkungan produksi hanya jika telah memenuhi seluruh poin pemeriksaan berikut:

---

## 📋 Checklist Kelayakan Fitur

- [ ] **Database & Schema**:
  - Table didefinisikan di `src/convex/schema.ts` menggunakan validator `v` (termasuk `index`/`searchIndex` bila diperlukan).
  - Kolom audit (`createdBy: v.id("users")`, `deletedAt: v.optional(v.number())` bila soft-delete) sudah terpasang.

- [ ] **Validasi & Type Safety**:
  - Signature Convex function menggunakan `v.object({ ... })` untuk seluruh argumen (query, mutation, action).
  - Bebas dari tipe `any`, `@ts-ignore`, atau warning TypeScript.

- [ ] **Convex Backend**:
  - Mutation otentikasi menggunakan `getAuthUserId(ctx)` dari `@convex-dev/auth/server`.
  - Periksa peran (RBAC) sebelum operasi sensitif.
  - Error bisnis dilempar via `ConvexError` (aman ditampilkan), tidak membocorkan detail internal.
  - Log audit tercatat untuk operasi pemutakhiran/penghapusan.

- [ ] **Frontend & UI**:
  - Menggunakan komponen `shadcn/ui` + Tailwind CSS.
  - Data dari `useQuery` / `useMutation` Convex React Client.
  - Mendukung 5 State UI: **Loading (Skeleton)**, **Error**, **Empty**, **Data View**, & **Responsive Layout**.
  - Mendukung Mode Terang (Light Mode) dan Mode Gelap (Dark Mode).

- [ ] **Pengujian & Build**:
  - Build aplikasi sukses tanpa error (`npm run build`).
  - Linter & Formatter sukses tanpa warning (`npm run lint`).
  - Typecheck sukses (`npm run typecheck`).

- [ ] **Dokumentasi**:
  - Konvensi `.ai/` terkait diperbarui.
  - Berkas `README.md` atau dokumentasi modul terkait telah diperbarui.
