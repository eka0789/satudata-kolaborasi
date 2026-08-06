# Architecture Guidelines

## Architecture Style

- **Modular Monorepo**: Dikelola dengan Turborepo & pnpm workspace.
- **Feature First (Vertical Slice)**: Pengkodean dikelompokkan berdasarkan fitur bisnis, bukan berdasarkan lapisan teknikal (controller/service/repository).
- **Domain Separation**: Setiap modul domain (contoh: `pegawai`, `correspondence`, `organization`) terisolasi dengan rapi.
- **Shared Packages**: Kode yang dipakai bersama diletakkan di dalam `packages/` (`ui`, `database`, `config`, `types`).

---

## 🚫 Larangan Arsitektur

- **Dilarang** menggunakan MVC Klasik (Model-View-Controller).
- **Dilarang** mengelompokkan folder secara horizontal berdasarkan lapisan teknis (misal: folder `controllers/` global, `models/` global).
- **Dilarang** membuat *tight coupling* antar-fitur. Fitur harus independen.

---

## 📁 Contoh Struktur Feature-First

```text
features/
├── authentication/
├── employee/
├── correspondence/     # (Naskah Dinas / E-Surat)
│   ├── components/     # Komponen UI spesifik fitur ini
│   ├── pages/          # Halaman React Router
│   ├── hooks/          # TanStack Query custom hooks
│   ├── routes.ts       # Hono API endpoint routes
│   ├── service.ts      # Logic bisnis & Drizzle ORM query
│   ├── schema.ts       # Zod validation schema
│   ├── types.ts        # TypeScript type definitions
│   └── index.ts        # Public API ekspor fitur
└── organization/
```

---

## 💡 Prinsip Desain

- Setiap fitur bertanggung jawab penuh atas UI, API, Validasi, Tipe Data, Hooks, dan Logic Bisnis miliknya.
- Kode publik yang digunakan lebih dari 2 modul diletakkan di `packages/`.
- Utamakan Komposisi dibanding Pewarisan (*Prefer composition over inheritance*).
- Setiap modul harus dapat dipelihara dan diuji secara independen.