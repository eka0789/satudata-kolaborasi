# AI Prompt: Create Feature (Vertical Slice)

## Context & Purpose
Gunakan prompt ini untuk membuat fitur vertikal komplit (End-to-End Vertical Slice Feature) yang mencakup Database Schema, Validation Zod, Backend API Hono, Custom React Hooks TanStack Query, dan Komponen UI Frontend.

---

## 🤖 AI Instructions

Saat mengeksekusi instruksi pembuatan fitur, AI **WAJIB** membuat komponen berikut tanpa menyisakan TODO/placeholder:

### 1. Database Schema (`packages/database/schema/`)
- Tentukan tabel Drizzle ORM dengan Primary Key UUID `defaultRandom()`.
- Wajib sertakan 5 kolom audit: `created_at`, `updated_at`, `deleted_at`, `created_by`, `updated_by`.
- Tentukan tipe DTO inferensi (`Select[Feature]`, `Insert[Feature]`).

### 2. Validation & Types (`features/[feature]/`)
- `schema.ts`: Buat skema Zod untuk create (`create[Feature]Schema`), update (`update[Feature]Schema`), dan query filter (`query[Feature]Schema`).
- `types.ts`: Ekstrak tipe TypeScript eksplisit dari skema Zod.

### 3. Backend Service & Routes (`apps/api/src/features/[feature]/`)
- `service.ts`: Buat fungsi pencarian (dengan pagination, search, filter), detail (by ID), insert, update, dan soft delete.
- `routes.ts`: Terapkan Hono router dengan `authMiddleware`, `requirePermission`, validasi Zod body/query/params, dan response handler terstruktur.

### 4. Frontend Custom Hooks & Service (`apps/web/src/features/[feature]/`)
- `services/[feature]-api.ts`: Fungsi API client (`fetch` / `axios` wrapper).
- `hooks/use-[feature].ts`: Custom hook TanStack Query (`useQuery` untuk list/detail, `useMutation` untuk create/update/delete) dengan toast notification dan auto query invalidation.

### 5. Frontend UI Pages & Components (`apps/web/src/features/[feature]/`)
- `components/[Feature]Table.tsx`: Data Table shadcn/ui dengan search, sorting, pagination, dan action dropdown.
- `components/[Feature]FormModal.tsx`: Form Modal React Hook Form + Zod.
- `pages/[Feature]Page.tsx`: Halaman utama dengan Header, Breadcrumb, Button Tambah, Table, dan Form Modal.
- Wajib dukung 5 state UI: **Loading (Skeleton)**, **Error**, **Empty**, **Responsive**, dan **Dark Mode**.
