# Frontend Rules & Standards

## Tech Stack
- **Framework**: `React` + `TypeScript` + `Vite` + `React Router v7` (lazy routes)
- **Styling**: `Tailwind CSS v4` + `shadcn/ui` (Radix + Lucide)
- **Data Fetching**: `Convex` (`useQuery`, `useMutation`) — reactive, tidak perlu TanStack Query
- **Auth**: `ConvexAuthProvider` + `useConvexAuth` / `useAuthActions`
- **Forms & Validation**: `React Hook Form` + `@hookform/resolvers` + `Zod`

---

## 🏛️ Struktur Per Feature (Frontend Vertical Slice)

Frontend diorganisasikan per halaman/fitur di dalam satu app (`src/`):

```text
src/
├── pages/            # Komponen Halaman (Route Target) — Landing, Auth, Dashboard, NotFound
├── components/       # Komponen UI (shared & per-fitur)
├── hooks/            # Custom React hooks (contoh: use-auth.ts)
└── lib/              # Utilitas shared (format, validasi, konfigurasi)
```

---

## 🎨 Layout & UI Standards

1. **Ukuran Komponen**: Jaga komponen React di bawah 300 baris. Pecah UI kompleks menjadi sub-komponen modular.
2. **Pustaka Komponen UI**: Komponen UI dasar menggunakan `shadcn/ui` (Tailwind + Radix) — jangan menulis ulang dari nol.
3. **Pencegahan Duplikasi Form**: Dilarang membuat form duplikat. Ekstrak komponen form yang dapat di-reuse.
4. **Mandatory States (Wajib Didukung)**:
   - ⏳ **Loading State**: Gunakan Skeleton Loader atau Spinner (mis. `Loader2` saat `isLoading` dari `useConvexAuth`).
   - ❌ **Error State**: Tampilkan pesan kesalahan yang user-friendly lengkap dengan tombol Coba Lagi (*Retry*).
   - 📭 **Empty State**: Jelaskan mengapa data kosong dan berikan CTA (*Call-To-Action*) untuk membuat data baru.
   - 📱 **Responsive Layout**: Wajib tampil sempurna di Resolusi HP, Tablet, Laptop, dan Desktop.
   - 🌙 **Dark Mode**: Wajib mendukung sakelar mode terang & gelap.

---

## 🔐 Auth di Frontend

- Auth state disediakan oleh `ConvexAuthProvider` (lihat `src/main.tsx`) dan `src/hooks/use-auth.ts`.
- Gunakan `useConvexAuth` untuk `isLoading` / `isAuthenticated`.
- Route privat dibungkus `RequireAuth` (redirect ke `/auth?returnTo=<path>` bila belum login).
- Jangan menyimpan token secara manual — ConvexAuth mengelola sesi di sisi server.
