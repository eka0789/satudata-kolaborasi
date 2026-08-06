# Agent Memory (Log Keputusan Arsitektur Jangka Panjang)

Dokumen ini mencatat keputusan arsitektural dan konvensi penting yang telah disepakati untuk repositori ini.

---

## 📌 Keputusan Terdaftar

### [2026-07-21] Single Application (Non-Monorepo)
- **Keputusan**: Repositori adalah satu aplikasi (single app), bukan monorepo. Tidak menggunakan Turborepo/pnpm workspace.
- **Rasional**: Menjaga kesederhanaan dan memudahkan pengembang mandiri; semua kode (frontend + Convex backend) dalam satu repo.

### [2026-07-21] Audit Trail & Soft Delete Enterprise
- **Keputusan**: Setiap table bisnis wajib memiliki kolom audit (`createdBy`) dan mekanisme soft-delete (`deletedAt: v.optional(v.number())`) untuk data yang tidak boleh dihapus permanen. ID memakai `v.id(...)` (Convex), bukan UUID manual.
- **Rasional**: Memenuhi standar audit BPK dan regulasi keamanan data BSSN.

### [2026-07-21] Backend Convex (Reactive TypeScript Backend)
- **Keputusan**: Backend menggunakan Convex (queries, mutations, actions) dengan database Convex. Tidak ada REST API terpisah — akses data via `ctx.db` dan validasi `v`.
- **Rasional**: Type-safe penuh, real-time inherent, tanpa manajemen server/ORM terpisah.

### [2026-07-21] Autentikasi ConvexAuth (Email OTP + Anonymous)
- **Keputusan**: Autentikasi menggunakan `@convex-dev/auth` dengan provider `Email OTP` dan `Anonymous`. Session dikelola ConvexAuth; pengguna aplikasi disimpan di table `users` (memperluas `authTables`).
- **Rasional**: Alur login tanpa password cocok untuk konteks layanan publik, RBAC berbasis role (`user`/`admin`) tetap didukung.

### [2026-07-21] Frontend Stack React + Vite + Tailwind + shadcn/ui
- **Keputusan**: Web frontend menggunakan React 19, Vite, Tailwind CSS v4, shadcn/ui primitives, dan Convex React Client (`useQuery`/`useMutation`).
- **Rasional**: Pengalaman UI/UX enterprise yang modern, responsif, dan konsisten.

### [2026-08-06] KOREKSI DOKUMENTASI STACK
- **Keputusan**: Dokumentasi `.ai/` sebelumnya mengacu stack lama (pnpm/Turborepo/Hono/Supabase/Drizzle/TanStack Query). Realita stack adalah npm + Vite + React 19 + Convex + ConvexAuth + Zod + RHF (lihat `tech-stack.md`). Dokumen `.ai/` telah diperbarui agar sesuai implementasi nyata.
- **Rasional**: Menjaga akurasi konteks untuk AI Coding Assistant; `hono` yang tersisa di `package.json` tidak dipakai dan bukan bagian dari stack resmi.
