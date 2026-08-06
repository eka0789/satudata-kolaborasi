# Panduan Satu Data Kolaborasi

Panduan menjalankan aplikasi **Satu Data Kolaborasi** dan mengintegrasikan **Convex** agar semua data terpusat ke aplikasi.

## Daftar Isi

- [1. Ringkasan aplikasi](#1-ringkasan-aplikasi)
- [2. Prasyarat](#2-prasyarat)
- [3. Menjalankan aplikasi lokal](#3-menjalankan-aplikasi-lokal)
- [4. Mengisi data awal (seed)](#4-mengisi-data-awal-seed)
- [5. Cara Convex mengintegrasikan data](#5-cara-convex-mengintegrasikan-data)
- [6. Konek ke Convex cloud (produksi)](#6-konek-ke-convex-cloud-produksi)
- [7. Environment variables](#7-environment-variables)
- [8. Catatan penting saat mengubah data](#8-catatan-penting-saat-mengubah-data)

---

## 1. Ringkasan aplikasi

- **Frontend:** Vite + React 19 + TypeScript + Tailwind v4 + Shadcn UI + React Router v7 + Framer Motion.
- **Backend & database:** Convex.
- **Autentikasi:** Convex Auth (email OTP & anonymous).
- **Integrasi tambahan:** VLY (AI, email, pembayaran) — lihat `integrations.md`.

Semua model backend & database berada di folder `src/convex/`. Frontend terhubung ke Convex lewat URL yang dibaca dari `.env.local` (`VITE_CONVEX_URL`).

---

## 2. Prasyarat

- **Node.js** versi 18 atau lebih tinggi.
- **npm** (package manager). *README menyarankan `bun`, tapi npm bekerja normal di proyek ini.*
- **Akun Convex** (gratis) di `dashboard.convexcloud.com` — **wajib hanya** jika ingin menggunakan backend cloud / produksi. Untuk pengembangan lokal, tidak perlu akun.
- Dependensi (`node_modules`) umumnya sudah terpasang.

Periksa versi yang tersedia:

```bash
node --version
npm --version
```

---

## 3. Menjalankan aplikasi lokal

Jalankan **dua terminal** dari root proyek.

### Terminal 1 — Backend Convex lokal

```bash
npm run convex:dev     # = npx convex dev
```

Perintah ini:
- menjalankan backend Convex di `http://localhost:3210`
- **otomatis menulis** `VITE_CONVEX_URL=http://localhost:3210` ke `.env.local`
- menjalankan push / codegen ke `src/convex/_generated/` setiap kali kode backend berubah

### Terminal 2 — Frontend Vite

```bash
npm run dev
```

Buka `http://localhost:5173`. Navigasi login/sign-up ada di `/auth`. Halaman yang dilindungi ada di bawah `/dashboard` (beranda, pencarian, proyek, kegiatan, komunitas, notifikasi, pengaturan, admin).

> ⚠️ Backend Convex harus jalan lebih dulu. Tanpa backend, fetch data akan gagal.

### Jika node_modules bermasalah, pasang ulang

```bash
npm install
```

---

## 4. Mengisi data awal (seed)

Setelah backend lokal jalan, jalankan proses seeding **sekali**:

```bash
npx convex run seed:seedReferenceData
```

Perintah ini mengisi:
- **34 provinsi Indonesia** (kode, nama, region)
- **7 kategori** (Open Data, Kesehatan, Pendidikan, dst.)

Sifatnya **idempotent** — aman dijalankan ulang; tidak membuat duplikat. Tanpa seed, dropdown provinsi/kategori akan kosong.

---

## 5. Cara Convex mengintegrasikan data

Semua data terpusat via skema Convex. Alur arsitektur:

```
Tabel (schema.ts) ──► Backend functions ──► Hasil generate ──► Hooks frontend
                       (query/mutation/action)   (_generated)   (useQuery/useMutation)
```

### 5.1 Skema data — `src/convex/schema.ts`

Mendefinisikan seluruh tabel: `users`, `provinces`, `categories`, `communities`, `communityMembers`, `projects`, `projectMembers`, `events`, `eventAttendees`, `needs`, `volunteers`, `notifications`, `onboarding`.

Saat skema diubah, Convex otomatis membuat type TypeScript ke `src/convex/_generated/` (saat `convex:dev` berjalan).

### 5.2 Backend functions — `src/convex/*.ts`

| Jenis | Kegunaan | Contoh |
|-------|----------|--------|
| `query` | Baca data, real-time | `users.ts` → `getCurrentUser` |
| `mutation` | Tulis data | `users.ts` → `updateProfile` |
| `action` | Eksternal / node, wajib `"use node"` di baris atas | `seed.ts` → `seedReferenceData` |

Aturan (dari README):
- Jangan letakkan aksi dengan `"use node"` dan query/mutation di file yang sama.
- Gunakan `crud` bawaan (`convex-helpers/server/crud`) untuk operasi DB sederhana.

### 5.3 Menggabungkan dari frontend

Impor dari basis `@/convex/_generated/api` dan gunakan hook `convex/react`:

```ts
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

// baca real-time
const projects = useQuery(api.projects.list);

// tulis
const createProject = useMutation(api.projects.create);
createProject({ title: "Proyek Baru", ... });
```

Data pengguna yang sedang login — **wajib pakai hook ini, jangan manual**:

```ts
import { useAuth } from "@/hooks/use-auth";
const { isLoading, isAuthenticated, user, signIn, signOut } = useAuth();
```

### 5.4 Menambahkan data baru (minimal)

Untuk memasukkan data baru ke aplikasi, hanya perlu:

1. Tambah / ubah tabel di `src/convex/schema.ts`.
2. Buat `query` / `mutation` di `src/convex/*.ts`.
3. Panggil dari halaman via `useQuery` / `useMutation`.

Backend dan type akan otomatis tersinkron selama `convex:dev` berjalan.

---

## 6. Konek ke Convex cloud (produksi)

Agar "semua data terintegrasi" ke satu deployment bersama, gunakan cloud Convex:

```bash
npx convex login        # login ke dashboard.convexcloud.com
npx convex deploy       # deploy fungsi ke project cloud
npx convex dashboard    # buka dashboard (tables, logs, console)
```

Setelah itu jalankan `npx convex dev` dan pilih project cloud → Convex menulis `VITE_CONVEX_URL` berupa `https://<nama>.convex.cloud` ke `.env.local`.

---

## 7. Environment variables

### Backend (ditetapkan di Dashboard Convex → Settings → Environment Variables)

Karena backend menjalankan auth dan integrasi VLY, set di dashboard Convex (bukan `.env.local`):

| Variabel | Keterangan |
|----------|-----------|
| `JWKS` | Public key autentikasi (dibuat otomatis saat `convex auth`) |
| `JWT_PRIVATE_KEY` | Private key JWT untuk auth |
| `SITE_URL` | URL frontend (contoh `http://localhost:5173` atau domain produksi) |
| `VLY_INTEGRATION_KEY` | Kunci integrasi VLY (biasanya otomatis saat pembuatan proyek) |

> ⚠️ `JWT_PRIVATE_KEY` dan `VLY_INTEGRATION_KEY` **tidak boleh** bocor ke sisi client.

### Frontend (`.env.local`)

| Variabel | Keterangan |
|----------|-----------|
| `VITE_CONVEX_URL` | URL backend Convex (contoh `http://localhost:3210` atau `https://<nama>.convex.cloud`) |

---

## 8. Catatan penting saat mengubah data

- **Jangan modifikasi** file otentikasi: `src/convex/auth.ts`, `src/convex/auth.config.ts`, `src/convex/auth/emailOtp.ts` (dilarang oleh README).
- Gunakan `Id<"NamaTabel">` untuk tipe ID; field ID ditulis `_id`, bukan `id`.
- Jangan menampilkan `_id` dan `_creationTime` dalam hasil query (sudah otomatis ada).
- Jangan mengindeks `_creationTime` (sudah otomatis) dan hindari indeks duplikat.
- Pertahankan `schemaValidation: false` pada file skema.
- Verifikasi type setelah ubah kode:

```bash
npm run typecheck
```

---

## Ringkasan jalankan cepat

```bash
# Terminal 1
npm run convex:dev        # backend Convex lokal (localhost:3210)

# Terminal 2 (opsional, seed sekali)
npx convex run seed:seedReferenceData

# Terminal 3
npm run dev               # frontend Vite (localhost:5173)
```