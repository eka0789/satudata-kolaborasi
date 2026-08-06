# Folder Structure (Struktur Direktori Monorepo)

```text
my-starter-kit-gov/
├── apps/
│   ├── web/                # Frontend React + Vite + Tailwind CSS + shadcn/ui
│   │   ├── src/
│   │   │   ├── assets/
│   │   │   ├── components/  # Komponen UI global aplikasi web
│   │   │   ├── features/    # Feature-first vertical slices
│   │   │   ├── hooks/       # Global React hooks
│   │   │   ├── layouts/     # Root App Shell, Sidebar, Header layouts
│   │   │   ├── lib/         # Utility functions & axios/fetch client
│   │   │   ├── routes/      # Application router configurations
│   │   │   ├── App.tsx
│   │   │   └── main.tsx
│   │   ├── package.json
│   │   └── README.md
│   │
│   └── api/                # Backend API Hono Framework
│       ├── src/
│       │   ├── features/    # Feature-first backend endpoints & services
│       │   ├── middleware/  # Global Hono middlewares (Auth, Logger, CORS)
│       │   ├── lib/         # Helper utilities (Supabase, Drizzle instance)
│       │   ├── index.ts     # Entry point server Hono
│       │   └── router.ts    # Centralized app router
│       ├── package.json
│       └── README.md
│
├── packages/
│   ├── ui/                 # Shared UI Components library (shadcn/ui primitives)
│   ├── database/           # Drizzle ORM Schemas, Migrations & Supabase config
│   ├── config/             # Shared ESLint, Prettier, TypeScript configurations
│   └── types/              # Shared global DTOs & TypeScript interfaces
│
├── docs/                   # Dokumentasi teknis & arsitektur proyek
├── supabase/               # Migrasi database Supabase, RLS policies, & seed data
├── scripts/                # Utility scripts (seed, backup, deployment)
├── .ai/                    # Sistem instruksi AI Assistant (Rules, Prompts, Templates)
├── .github/                # GitHub Actions CI/CD workflows
├── pnpm-workspace.yaml     # Konfigurasi workspace pnpm
├── turbo.json              # Konfigurasi Turborepo pipeline
├── package.json            # Root package.json
└── README.md               # Root README proyek
```

---

## 📌 Aturan Direktori

1. Setiap folder modul/package WAJIB memiliki `README.md` yang menjelaskan tujuan dan cara penggunaannya.
2. Dilarang membuat folder baru yang tidak memiliki tujuan jelas.
3. Struktur folder wajib mengikuti pola *Feature First*.