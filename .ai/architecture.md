# Architecture Guidelines

## Architecture Style

- **Single App**: Satu aplikasi Vite (React + TypeScript), bukan monorepo.
- **Convex Backend**: Seluruh logika server berada di `src/convex/` (queries, mutations, actions, schema).
- **Feature First (Vertical Slice)**: Pengkodean dikelompokkan berdasarkan fitur bisnis, bukan berdasarkan lapisan teknikal (controller/service/repository).
- **Single Source of Truth**: `src/convex/schema.ts` mendefinisikan seluruh struktur data dengan validator `v`.

---

## 🚫 Larangan Arsitektur

- **Dilarang** menggunakan MVC Klasik (Model-View-Controller).
- **Dilarang** mengelompokkan folder secara horizontal berdasarkan lapisan teknis (misal: folder `controllers/` global, `models/` global).
- **Dilarang** menempatkan logika backend di folder frontend (`src/pages`, `src/components`) — backend hanya di `src/convex/`.
- **Dilarang** membuat *tight coupling* antar-fitur. Fitur harus independen.

---

## 📁 Struktur Aplikasi

```text
src/
├── convex/                # Backend Convex (single source of truth)
│   ├── schema.ts          # Definisi seluruh table + validator
│   ├── auth.ts            # Konfigurasi ConvexAuth
│   ├── auth.config.ts     # Provider auth (email-otp, anonymous)
│   ├── http.ts            # HTTP actions tambahan (ConvexAuth)
│   ├── projects.ts        # Fitur proyek (list/get/getBySlug/create/update/remove)
│   ├── communities.ts     # Fitur komunitas
│   ├── users.ts           # Fitur pengguna
│   └── ...
├── components/            # Komponen UI (shared + per-fitur)
├── hooks/                 # Custom hooks React (contoh: use-auth.ts)
├── pages/                 # Halaman React Router (Landing, Auth, Dashboard, NotFound)
├── lib/                   # Utilitas shared
└── main.tsx               # Entry point + ErrorBoundary
```

---

## 💡 Prinsip Desain

- Setiap fitur backend bertanggung jawab penuh atas validasi, otorisasi, dan logika bisnis miliknya.
- Frontend mengakses backend melalui `useQuery` / `useMutation` dengan path string `api.<feature>.<function>`.
- Utamakan Komposisi dibanding Pewarisan (*Prefer composition over inheritance*).
- Reuse kode lintas fitur melalui helper kecil di `src/convex` (mis. helper filter soft-delete) dan utilitas di `src/lib`.
- Setiap fitur harus dapat dipelihara dan diuji secara independen.
