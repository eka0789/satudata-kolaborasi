# Development Workflow

## Alur Kerja Pengembangan Fitur (Feature Development Cycle)

Setiap pengembangan fitur baru WAJIB mengikuti 5 alur sistematis berikut:

```text
1. ANALISIS  ➔  2. DESAIN SKEMA  ➔  3. REST API  ➔  4. FRONTEND UI  ➔  5. DOKUMENTASI & VERIFIKASI
```

---

## 🔄 Tahapan Alur Kerja

### 1. Analisis & Perencanaan
- Pahami kebutuhan bisnis dan regulasi pemerintah terkait.
- Tentukan scope data, peranan (RBAC), dan aturan audit trail.

### 2. Desain Database & Skema Zod
- Buat tabel Drizzle ORM di `packages/database/schema/`.
- Sertakan 5 kolom audit (`created_at`, `updated_at`, `deleted_at`, `created_by`, `updated_by`).
- Buat skema Zod untuk validasi data.
- Generate file migrasi database.

### 3. Pengembangan Backend REST API (Hono)
- Buat router dan handler di `apps/api/src/features/[feature]/`.
- Terapkan `authMiddleware`, `requirePermission`, dan `Zod validator`.
- Tulis service logic Drizzle ORM.
- Sertakan penanganan error dan audit logger.

### 4. Pengembangan Frontend UI (React + shadcn/ui)
- Buat custom hook TanStack Query (`useQuery` / `useMutation`) di `apps/web/src/features/[feature]/hooks/`.
- Buat komponen UI dan Halaman di `apps/web/src/features/[feature]/pages/`.
- Pastikan mendukung Loading (Skeleton), Error, Empty, dan Dark Mode.

### 5. Verifikasi & Dokumentasi
- Lakukan pengujian manual / otomatis.
- Pastikan `pnpm build` dan `pnpm lint` sukses.
- Perbarui dokumentasi di `README.md` modul.