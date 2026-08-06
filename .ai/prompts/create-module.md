# AI Prompt: Create Business Domain Module

## Context & Purpose
Gunakan prompt ini untuk membuat Modul Bisnis Domain baru (contoh: Modul Naskah Dinas/Surat, Modul Kepegawaian/SIMPEG, Modul E-Kinerja, Modul Pengaduan). Modul mengelompokkan beberapa fitur bisnis terkait dalam satu domain otonom.

---

## 🤖 AI Instructions

Ketika diminta membuat modul bisnis domain baru:

### Step 1: Pahami Domain Bisnis Pemerintah
- Minta atau analisis nama domain (contoh: `correspondence` untuk Naskah Dinas, `employee` untuk SIMPEG).
- Identifikasi peran (RBAC) yang berkepentingan (contoh: Operator Surat, Verifikator, Pimpinan).

### Step 2: Buat Struktur Folder Backend Modul
Di `apps/api/src/features/[module_name]/`:
1. Buat folder untuk sub-fitur utama (contoh: `incoming-mail`, `outgoing-mail`).
2. Setiap sub-fitur harus memuat: `routes.ts`, `schema.ts`, `service.ts`, `types.ts`.
3. Buat `index.ts` untuk mendaftarkan seluruh route sub-fitur ke router utama modul.

### Step 3: Buat Struktur Folder Frontend Modul
Di `apps/web/src/features/[module_name]/`:
1. Buat subfolder per fitur dengan struktur: `components/`, `pages/`, `hooks/`, `schemas/`, `services/`.
2. Sediakan halaman index utama modul dengan tab/navigation bar jika memuat beberapa sub-fitur.

### Step 4: Daftarkan Ke Router Aplikasi Utama
- Daftarkan route backend modul ke `apps/api/src/router.ts`.
- Daftarkan route frontend ke `apps/web/src/routes/app-router.tsx`.
- Tambahkan item menu modul ke Sidebar Navigation dengan Lucide Icon yang relevan.

### Step 5: Dokumentasi Modul
Buat berkas `README.md` di dalam direktori modul yang menjelaskan:
- Tujuan Modul.
- Daftar Peran/Permission yang dibutuhkan.
- Skema Database & Tabel terkait.
- Alur kerja bisnis (workflow).
