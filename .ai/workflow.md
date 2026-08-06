# Development Workflow

## Alur Kerja Pengembangan Fitur (Feature Development Cycle)

Setiap pengembangan fitur baru WAJIB mengikuti 5 alur sistematis berikut:

```text
1. ANALISIS  ➔  2. DESAIN SKEMA  ➔  3. CONVEX BACKEND  ➔  4. FRONTEND UI  ➔  5. DOKUMENTASI & VERIFIKASI
```

---

## 🔄 Tahapan Alur Kerja

### 1. Analisis & Perencanaan
- Pahami kebutuhan bisnis dan regulasi pemerintah terkait.
- Tentukan scope data, peranan (RBAC), dan aturan audit trail.

### 2. Desain Database & Validator
- Definisikan table di `src/convex/schema.ts` menggunakan validator `v` (`v.id`, `v.string`, `v.number`, `v.optional`, `v.array`, dst.).
- Sertakan kolom audit (`createdBy: v.id("users")`) dan timestamp soft-delete (`deletedAt: v.optional(v.number())`) bila data tidak boleh dihapus permanen.
- Tambahkan index (`index("by_...")`) dan `searchIndex` sesuai kebutuhan query.
- Ranah RBAC/perizinan dinyatakan sebagai field (mis. `role`) pada table atau validator argumen.

### 3. Pengembangan Convex Backend
- Buat file fungsi di `src/convex/[feature].ts` (query, mutation, action).
- Gunakan `getAuthUserId(ctx)` dari `@convex-dev/auth/server` untuk otentikasi di setiap mutation.
- Akses data hanya via `ctx.db` (`query`, `get`, `insert`, `patch`, `replace`, `delete`).
- Validasi argumen dengan `v.object({ ... })` pada signature fungsi.
- Sertakan penanganan error (`ConvexError` untuk error bisnis yang aman ditampilkan) dan audit log ke table `auditLogs` bila diperlukan.

### 4. Pengembangan Frontend UI (React + shadcn/ui)
- Gunakan `useQuery` / `useMutation` dari Convex React Client (`convex/react`) di komponen atau hook (`src/hooks/`).
- Otentikasi via `useConvexAuth` / `useAuthActions` (lihat `src/hooks/use-auth.ts`).
- Pastikan mendukung Loading (Skeleton), Error, Empty, dan Dark Mode.

### 5. Verifikasi & Dokumentasi
- Lakukan pengujian manual / otomatis.
- Pastikan `npm run typecheck`, `npm run lint`, dan `npm run build` sukses.
- Perbarui dokumentasi di `.ai/` yang relevan.
