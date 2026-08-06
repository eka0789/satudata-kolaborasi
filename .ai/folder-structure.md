# Folder Structure (Struktur Direktori Aplikasi)

```text
satudata-kolaborasi/
├── src/
│   ├── convex/                # Backend Convex (single source of truth)
│   │   ├── schema.ts          # Definisi seluruh table + validator v
│   │   ├── auth.ts            # Konfigurasi ConvexAuth (EmailOTP + Anonymous)
│   │   ├── auth.config.ts     # Daftar provider auth
│   │   ├── http.ts            # HTTP actions tambahan (ConvexAuth routes)
│   │   ├── users.ts           # Fitur pengguna (getCurrentUser, update, dsb.)
│   │   ├── communities.ts     # Fitur komunitas
│   │   ├── communityMembers.ts# Keanggotaan komunitas
│   │   ├── projects.ts        # Fitur proyek
│   │   ├── events.ts          # Fitur event
│   │   ├── needs.ts           # Fitur kebutuhan komunitas
│   │   ├── volunteers.ts      # Fitur relawan
│   │   ├── auditLogs.ts       # Fitur audit log
│   │   └── ...                # Fitur lain sesuai kebutuhan
│   ├── components/            # Komponen UI (shadcn/ui + komponen fitur)
│   ├── hooks/                 # Custom React hooks (use-auth.ts, dsb.)
│   ├── pages/                 # Halaman React Router (Landing, Auth, Dashboard, NotFound)
│   ├── lib/                   # Utility functions & konfigurasi client
│   ├── main.tsx               # Entry point + ConvexProvider + AuthProvider + Router
│   ├── vite-env.d.ts
│   └── index.css
├── public/                    # Aset statis
├── .ai/                       # Sistem instruksi AI Assistant (Rules, Prompts, Templates)
├── convex.json                # Konfigurasi Convex
├── tsconfig.json              # TypeScript strict
├── vite.config.ts             # Konfigurasi Vite
├── tailwind.config.ts / index.css # Konfigurasi Tailwind v4
├── package.json               # Dependensi & script (npm)
└── README.md                  # README proyek
```

---

## 📌 Aturan Direktori

1. Setiap folder modul WAJIB memiliki tujuan yang jelas — dilarang membuat folder tanpa tujuan.
2. Dilarang menempatkan logika backend di luar `src/convex/`.
3. Struktur folder wajib mengikuti pola *Feature First* (satu berkas Convex per fitur, satu halaman per rute).
