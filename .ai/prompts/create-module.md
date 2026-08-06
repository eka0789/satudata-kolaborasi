# AI Prompt: Create Business Domain Module

## Context & Purpose
Gunakan prompt ini untuk membuat Modul Bisnis Domain baru (contoh: Modul Proyek, Modul Komunitas, Modul Event, Modul Kebutuhan/Needs). Modul mengelompokkan beberapa fitur bisnis terkait dalam satu domain otonom.

---

## 🤖 AI Instructions

Ketika diminta membuat modul bisnis domain baru:

### Step 1: Pahami Domain Bisnis
- Minta atau analisis nama domain (contoh: `projects` untuk Proyek, `communities` untuk Komunitas).
- Identifikasi entitas/table utama yang dibutuhkan (contoh: `projects`, `projectMembers`).
- Identifikasi peran (RBAC) yang berkepentingan (contoh: Pembuat Proyek, Admin Komunitas, Member).

### Step 2: Buat Struktur Backend Convex
Di `src/convex/`:
1. Buat `schema.ts` (atau perluas yang sudah ada) — definisikan table modul dengan validator `v`:
   ```typescript
   projects: defineTable({
     title: v.string(),
     slug: v.string(),
     description: v.optional(v.string()),
     communityId: v.optional(v.id("communities")),
     categoryId: v.optional(v.id("categories")),
     provinceId: v.optional(v.id("provinces")),
     status: v.union(v.literal("draft"), v.literal("active"), v.literal("completed"), v.literal("archived")),
     createdBy: v.id("users"),
     deletedAt: v.optional(v.number()),
   })
     .index("by_communityId", ["communityId"])
     .index("by_categoryId", ["categoryId"])
     .index("by_slug", ["slug"]),
   ```
2. Buat `src/convex/[module].ts` — seluruh query/mutation modul:
   - `list` (dengan optional filter & soft-delete excluded), `get`, `getBySlug`.
   - `create`, `update`, `remove` (soft delete via `deletedAt`).
   - Wajib validasi argumen `v.object` dan autentikasi `getAuthUserId(ctx)`.

### Step 3: Buat Struktur Frontend Modul
Di `src/features/[module]/`:
1. Buat subfolder per fitur dengan struktur: `components/`, `pages/`, `hooks/`.
2. Sediakan halaman index utama modul dengan navigation/tab bar jika memuat beberapa sub-fitur.
3. Akses data melalui `useQuery(api.[module].list)` / `useMutation(api.[module].create)`.

### Step 4: Daftarkan Ke Routing & Navigation
- Daftarkan route frontend ke router utama (`src/main.tsx` / route config).
- Tambahkan item menu modul ke Sidebar Navigation dengan Lucide Icon yang relevan.

### Step 5: Dokumentasi Modul
Buat berkas `README.md` di dalam direktori modul yang menjelaskan:
- Tujuan Modul.
- Daftar table & index di Convex schema.
- Alur kerja bisnis (workflow).
