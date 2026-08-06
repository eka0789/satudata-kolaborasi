# Frontend Rules & Standards

## Tech Stack
- **Framework**: `React` + `TypeScript` + `Vite` + `React Router`
- **Styling**: `Tailwind CSS` + `shadcn/ui`
- **State Management & Fetching**: `TanStack Query` (React Query)
- **Forms & Validation**: `React Hook Form` + `Zod`

---

## 🏛️ Structure Per Feature (Frontend Vertical Slice)

Setiap fitur pada aplikasi frontend (`apps/web/src/features/[feature_name]/`) WAJIB berisi:

```text
features/[feature_name]/
├── components/     # Komponen UI khusus fitur (Cards, Modals, Local Tables)
├── pages/          # Komponen Halaman (Route Target)
├── hooks/          # Custom React hooks & TanStack Query mutations/queries
├── services/       # Client API call functions (axios/fetch wrapper)
├── schemas/        # Zod form schemas
├── types/          # Frontend TypeScript types
└── index.ts        # Public exports
```

---

## 🎨 Layout & UI Standards

1. **Ukuran Komponen**: Jaga komponen React di bawah 300 baris. Pecah UI kompleks menjadi sub-komponen modular.
2. **Pustaka Komponen UI**: Komponen UI universal dasar diletakkan di `packages/ui` (`shadcn/ui`).
3. **Pencegahan Duplikasi Form**: Dilarang membuat form duplikat. Ekstrak komponen form yang dapat di-reuse.
4. **Mandatory States (Wajib Didukung)**:
   - ⏳ **Loading State**: Gunakan Skeleton Loader atau Spinner.
   - ❌ **Error State**: Tampilkan pesan kesalahan yang user-friendly lengkap dengan tombol Coba Lagi (*Retry*).
   - 📭 **Empty State**: Jelaskan mengapa data kosong dan berikan CTA (*Call-To-Action*) untuk membuat data baru.
   - 📱 **Responsive Layout**: Wajib tampil sempurna di Resolusi HP, Tablet, Laptop, dan Desktop.
   - 🌙 **Dark Mode**: Wajib mendukung sakelar mode terang & gelap.