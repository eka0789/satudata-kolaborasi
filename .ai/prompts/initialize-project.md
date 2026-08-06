# AI Prompt: Initialize Project (Setup & Konfigurasi Awal)

## Context & Purpose
Gunakan prompt ini saat ingin menginisialisasi atau menscaffold struktur proyek `satudata-kolaborasi` dari nol: single app Vite (React + TypeScript), backend Convex, ConvexAuth, Tailwind CSS v4, dan shadcn/ui.

---

## 🤖 AI Instructions

Saat mengeksekusi inisialisasi proyek, ikuti langkah-langkah berikut secara ketat:

### Step 1: Analisis Struktur Single App
- Satu aplikasi Vite + React + TypeScript (bukan monorepo). Backend dan frontend dalam satu repo.
- Backend ditulis di `src/convex/` (queries, mutations, actions, schema).
- Semua konfigurasi di root: `vite.config.ts`, `tsconfig.json`, `tailwind` config, `convex.json`.

### Step 2: Inisialisasi Backend Convex
1. **`src/convex/schema.ts`**:
   - Definisikan seluruh table dengan validator `v` (`defineSchema({ ... })`).
   - Gunakan `authTables` dari `@convex-dev/auth/server` untuk table auth (`users`, `sessions`, `authAccounts`, `authVerificationCodes`).
   - Table bisnis wajib menyertakan kolom audit: `createdBy: v.id("users")` dan `deletedAt: v.optional(v.number())`.
2. **`src/convex/auth.ts`**:
   - Konfigurasi `ConvexAuth` dengan provider `EmailOTP` dan `Anonymous` (lihat `auth.config.ts`).
3. **`src/convex/http.ts`**:
   - Buat `httpRouter` dan panggil `auth.addHttpRoutes(http)`.

### Step 3: Inisialisasi Frontend React
1. **`src/main.tsx`**:
   - Bungkus aplikasi dengan `ConvexProvider` + `ConvexAuthProvider` (dari `@convex-dev/react`).
   - Atur React Router v7 (data router, lazy routes) dan `Toaster` dari shadcn.
   - Tambahkan `RouteLoading`, `RootErrorBoundary`, dan `RequireAuth` untuk halaman privat.
2. **`src/hooks/use-auth.ts`**:
   - Sediakan custom hook `useAuth()` yang membungkus `useConvexAuth` + `useAuthActions` + `useQuery(api.users.getCurrentUser)`.
3. **Konfigurasi UI**:
   - Setup Tailwind CSS v4 dan shadcn/ui primitives (`src/components/ui/*`).
   - Ikon menggunakan `lucide-react`.

### Step 4: Verifikasi Script Root
Pastikan `package.json` memiliki script utama:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "format": "prettier --write .",
    "convex:dev": "convex dev",
    "convex:deploy": "convex deploy"
  }
}
```

### Step 5: Output Execution Summary
Hasilkan laporan ringkas struktur folder yang telah dibuat dan instruksi cara menjalankan server dev (`npm install && npx convex dev && npm run dev`).
