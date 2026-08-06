# Official Technology Stack

## Project Structure
- **Topology**: Single application (bukan monorepo). Tidak memakai Turborepo/pnpm workspace.
- **Package Manager**: `npm` (lockfile: `package-lock.json`)

## Frontend Stack
- **Framework**: `React 19`
- **Language**: `TypeScript` (Strict mode)
- **Build Tool**: `Vite 7` + `@vitejs/plugin-react`
- **Routing**: `React Router v7` (lazy route components via `React.lazy`)
- **Styling**: `Tailwind CSS v4` (plugin `@tailwindcss/vite`, CSS-first config)
- **UI Components**: `shadcn/ui` + `Radix UI` primitives
- **Icons**: `Lucide Icons`
- **State & Data Fetching**: `Convex React Client` (`useQuery`, `useMutation`, `useConvexAuth`, `useAuthActions`)
- **Form Management**: `React Hook Form` + `@hookform/resolvers`
- **Validation**: `Zod v4`
- **Animations**: `framer-motion`
- **Toast**: `sonner`
- **Charts**: `recharts`
- **HTTP client (integrasi eksternal)**: `axios`

## Backend Stack
- **Framework**: `Convex` (reactive TypeScript backend — queries, mutations, actions)
- **Language**: `TypeScript` (Strict mode)
- **Lokasi kode**: `src/convex/` (function files + `schema.ts` + `_generated/`)
- **Real-time**: Inherent pada Convex (`useQuery`/`useMutation` revalidasi otomatis)

## Database, Authentication & Storage
- **Database Engine**: `Convex Database` (document store, validator `v` di `schema.ts`)
- **ORM**: Tidak ada — akses data via `ctx.db` (Convex queries/mutations)
- **Authentication**: `ConvexAuth` (`@convex-dev/auth`) — provider `Email OTP` + `Anonymous`
- **Object Storage**: `Convex Storage` (tersedia; belum ada flow upload — kolom `imageUrl` saat ini berisi string URL)

## Deployment & CI/CD
- **Backend**: `Convex Cloud` (`npm run convex:dev` untuk dev, `convex deploy` untuk production)
- **Frontend**: Static build `vite build` (output `dist/`), di-hosting sebagai static site

## Testing & Quality Assurance
- **Testing**: Belum dikonfigurasi (belum ada Vitest/Playwright di dependencies)
- **Linter**: `ESLint` 9 (`eslint .`)
- **Formatter**: `Prettier`
- **Typecheck**: `tsc --noEmit` (`npm run typecheck`)

## Scripts (`package.json`)
| Script | Perintah |
| --- | --- |
| `dev` | `vite` (dev server) |
| `build` | `tsc -b && vite build` |
| `preview` | `vite preview` |
| `lint` | `eslint .` |
| `typecheck` | `tsc --noEmit` |
| `convex:dev` | `convex dev` (jalankan Convex lokal) |

## Catatan Dependency
- `hono` hadir di `package.json` namun **tidak dipakai** di kode `src/` — legacy/tidak termasuk stack resmi.
- `@vly-ai/integrations` + `@zumer/snapdom` digunakan untuk toolbar preview (VlyToolbar, lihat `vly-toolbar-readonly.tsx`).

---

> ⚠️ **Aturan Penting**: Dilarang menambah pustaka atau framework pihak ketiga di luar daftar resmi ini tanpa persetujuan arsitek sistem.
