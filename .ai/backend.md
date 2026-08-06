# Backend Rules & Standards

## Framework & Tech Stack
- **Framework**: `Convex` (reactive TypeScript backend — queries, mutations, actions)
- **Lokasi kode**: `src/convex/`
- **Validation**: Validator `v` pada signature fungsi (`v.object({ ... })`)
- **Autentikasi**: `ConvexAuth` — `getAuthUserId(ctx)` dari `@convex-dev/auth/server`

---

## 🏛️ Struktur Per Feature (Convex Vertical Slice)

Setiap fitur backend ditulis sebagai satu (atau beberapa) berkas di `src/convex/`:

1. `src/convex/[feature].ts`: Berisi query, mutation, dan action untuk fitur tersebut (contoh: `projects.ts`, `communities.ts`, `users.ts`).
2. `src/convex/schema.ts`: Definisi seluruh table dengan validator `v` (satu sumber kebenaran schema).
3. `src/convex/http.ts`: Route HTTP tambahan (mis. ConvexAuth `httpActions`).
4. `src/convex/auth.ts` / `auth.config.ts`: Konfigurasi ConvexAuth (provider, route).

---

## 🚫 Larangan Struktur Backend

- **DILARANG** membuat folder `controllers/`, `repositories/`, `entities/`, `services/` — logika bisnis langsung di dalam fungsi Convex.
- **DILARANG** menulis fungsi tanpa validasi argumen (`v.object`) — semua query/mutation/action wajib memvalidasi input.
- **DILARANG** menempatkan kode frontend (React) di dalam `src/convex/`.

---

## 🔒 Security & Middleware Guidelines

1. **Autentikasi**: Setiap mutation yang butuh pengguna wajib memanggil `getAuthUserId(ctx)` dan melempar error bila `null` (tidak login).
2. **Otorisasi / RBAC**: Cek `role` pengguna (dari table `users`) atau membership (mis. `communityMembers`, `projectMembers`) sebelum operasi sensitif.
3. **Penyaringan Soft Delete**: Query default WAJIB mengecualikan dokumen dengan `deletedAt` terisi (`isDeleted` helper), kecuali untuk aksi pemulihan (*restore*).
4. **Audit Logging**: Catat log ke table `auditLogs` pada aksi mutasi data penting (`create`, `update`, `remove`).
5. **Error Handling**: Lempar `ConvexError` untuk error bisnis (pesan aman ditampilkan ke klien); error tak terduga ditangani `try/catch` dan di-log, tanpa membocorkan detail internal.
