# Backend Rules & Standards

## Framework & Tech Stack
- **Framework**: `Hono` (Ringan, super cepat, ideal untuk Node.js / Serverless)
- **Validation**: `Zod` (Validasi input eksplisit)
- **ORM**: `Drizzle ORM` (Type-safe SQL queries)
- **Authentication**: `Supabase Auth` (JWT validation & session)

---

## 🏛️ Structure Per Feature (Backend Vertical Slice)

Setiap fitur pada aplikasi backend (`apps/api/src/features/[feature_name]/`) WAJIB berisi:

1. `routes.ts`: Definisi Hono route handler & mounting middleware.
2. `schema.ts`: Skema validasi Zod untuk Request Body, Query Params, dan URL Params.
3. `service.ts`: Eksekusi logika bisnis dan operasi database Drizzle.
4. `types.ts`: Definisi TypeScript DTO & return types.
5. `index.ts`: Ekspor publik fitur.

---

## 🚫 Larangan Struktur Backend

- **DILARANG** membuat folder terpisah `controllers/`, `repositories/`, `entities/` secara global.
- **DILARANG** menempatkan SQL query langsung di dalam berkas `routes.ts`.
- **DILARANG** mengembalikan data rawa (*raw DB entity*) tanpa formatting/mapping DTO.

---

## 🔒 Security & Middleware Guidelines

1. **Autentikasi**: Semua private route wajib dilindungi middleware `authMiddleware` (validasi JWT Supabase).
2. **Otorisasi / RBAC**: Cek hak akses menggunakan `requirePermission('surat.create')` sebelum menjalankan service logic.
3. **Penyaringan Soft Delete**: Pastikan query Drizzle selalu menyertakan `isNull(table.deletedAt)` kecuali untuk aksi pemulihan (*restore*).
4. **Audit Logging**: Panggil `auditLogger.log()` pada setiap aksi mutasi data (`POST`, `PATCH`, `DELETE`).
5. **Centralized Error Handling**: Gunakan `app.onError()` di level utama Hono untuk menangkap error yang tidak terduga dan mengembalikan format respons standar tanpa menyebarkan stack trace SQL.