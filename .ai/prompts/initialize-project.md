# AI Prompt: Initialize Enterprise Government Project

## Context & Purpose
Gunakan prompt ini saat ingin menginisialisasi atau menscafhold struktur repositori Monorepo `my-starter-kit-gov` dari nol menggunakan Turborepo, pnpm workspaces, Hono backend, React Vite frontend, Drizzle ORM, Supabase, Tailwind CSS, dan shadcn/ui.

---

## 🤖 AI Instructions

Saat mengeksekusi inisialisasi proyek, ikuti langkah-langkah berikut secara ketat:

### Step 1: Analisis Konfigurasi Monorepo
- Siapkan struktur `pnpm-workspace.yaml` yang menghubungkan `apps/*` dan `packages/*`.
- Siapkan `turbo.json` dengan pipeline `build`, `lint`, `dev`, dan `db:generate`.

### Step 2: Inisialisasi Apps & Packages
1. **`apps/api`**:
   - Framework Hono dengan router terpusat (`apps/api/src/router.ts`).
   - Middleware autentikasi Supabase JWT, CORS, logger, dan error handler terpusat.
2. **`apps/web`**:
   - React 18 + Vite + TypeScript.
   - Konfigurasi Tailwind CSS dan penyedia shadcn/ui primitives.
   - Konfigurasi TanStack Query Client Provider dan React Router root.
3. **`packages/database`**:
   - Konfigurasi Supabase PostgreSQL Client & Drizzle ORM instance.
   - Helper audit columns (`id`, `created_at`, `updated_at`, `deleted_at`, `created_by`, `updated_by`).
4. **`packages/ui`**:
   - Tempat komponen UI shadcn universal.
5. **`packages/config`**:
   - Konfigurasi bersama ESLint, Prettier, dan tsconfig.base.json.

### Step 3: Verifikasi Script Root
Pastikan `package.json` root memiliki script utama:
```json
{
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "lint": "turbo run lint",
    "format": "prettier --write \"**/*.{ts,tsx,md,json}\"",
    "db:generate": "turbo run db:generate",
    "db:push": "turbo run db:push"
  }
}
```

### Step 4: Output Execution Summary
Hasilkan laporan ringkas struktur folder yang telah dibuat dan instruksi cara menjalankan server dev (`pnpm install && pnpm dev`).
