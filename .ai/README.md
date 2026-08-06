# SatuData Kolaborasi

Platform kolaborasi komunitas nasional Indonesia berbasis **single-app Vite + React + Convex**, dengan sistem instruksi AI `.ai` (Rules, Prompts, dan Templates) agar AI Coding Assistant memproduksi kode produksi secara konsisten.

---

## 🎯 Tujuan Repositori

1. **PLATFORM KOLABORASI KOMUNITAS**: Menghubungkan komunitas, relawan, proyek, event, dan kebutuhan di Indonesia — lihat `domain-satudata-indonesia.md`.
2. **REAL-TIME & PRODUCTION-READY**: Backend Convex (reactive, database + functions terpadu) dengan autentikasi `Convex Auth` (Email OTP + Anonymous).
3. **AI-FIRST DEVELOPMENT**: Direktori `.ai` berisi System Rules, Prompts Library, dan Code Templates agar AI konsisten menghasilkan kode bertipe aman.

---

## 🧰 Stack Teknologi (Ringkas)

- **Frontend**: React 19 + TypeScript strict + Vite + React Router v7 (lazy routes)
- **UI**: Tailwind CSS v4 + shadcn/ui (Radix + Lucide)
- **Backend & DB**: Convex (`src/convex/` — schema + functions terpadu, reactive query)
- **Auth**: Convex Auth — Email OTP + Anonymous (`src/convex/auth.ts`, `auth.config.ts`)
- **Forms**: React Hook Form + `@hookform/resolvers` + Zod
- **Package Manager**: npm

> Detail lengkap di `.ai/tech-stack.md`.

---

## 📁 Struktur Direktori `.ai/`

```text
.ai/
├── README.md               # Dokumentasi utama direktori .ai
├── constitution.md         # Kontrak kerja & urutan prioritas pembacaan AI
├── project.md              # Visi & prinsip dasar proyek
├── tech-stack.md           # Stack teknologi resmi (React, Vite, Convex, Convex Auth)
├── architecture.md         # Arsitektur single-app + Convex feature-first
├── folder-structure.md     # Struktur direktori aplikasi
├── domain-satudata-indonesia.md # Konteks domain & aturan bisnis komunitas
├── business-rules.md       # Aturan bisnis & regulasi
├── coding-standards.md     # Standar penulisan kode & type-safety
├── backend.md              # Aturan pengembangan Backend (Convex functions)
├── frontend.md             # Aturan pengembangan Frontend (React + Vite + shadcn)
├── database.md             # Aturan database Convex (schema, index, soft-delete)
├── api-rules.md            # Standar function API Convex
├── security.md             # Keamanan auth, RBAC, audit trail, & OWASP
├── ui-guidelines.md        # Panduan UI/UX
├── workflow.md             # Alur pengembangan fitur
├── definition-of-done.md   # Checklist kriteria kelayakan fitur (DoD)
├── agent-memory.md         # Catatan keputusan arsitektur jangka panjang (ADR)
├── prompt-library.md       # Daftar perintah prompt AI yang tersedia
├── prompts/                # Instruksi prompt AI siap pakai
└── templates/              # Boilerplate & template kode
```

---

## 📖 Urutan Pembacaan Konteks AI (Reading Order)

Sebelum AI Assistant menghasilkan atau memodifikasi kode, AI **WAJIB** membaca dokumen berikut secara berurutan:

1. `project.md`
2. `tech-stack.md`
3. `architecture.md`
4. `folder-structure.md`
5. `coding-standards.md`
6. `backend.md`
7. `frontend.md`
8. `database.md`
9. `api-rules.md`
10. `security.md`
11. `ui-guidelines.md`
12. `workflow.md`
13. `definition-of-done.md`
14. `business-rules.md`
15. `domain-satudata-indonesia.md`
16. `agent-memory.md`

---

## 🚀 Cara Menggunakan Starter Kit

### 1. Pengembangan Fitur Baru
Gunakan prompt siap pakai di `.ai/prompts/create-feature.md` atau salin template dari `.ai/templates/feature.md`.

Contoh eksekusi perintah ke AI:
> *"Tolong buatkan fitur kolaborasi baru menggunakan instruksi dari `.ai/prompts/create-feature.md`."*

### 2. Pembuatan Convex Function / API
Gunakan prompt `.ai/prompts/create-api.md` dan template `.ai/templates/api.md`.

### 3. Pembuatan Halaman UI & Tabel Data
Gunakan `.ai/prompts/create-page.md`, `.ai/prompts/create-table.md`, dan `.ai/templates/table.md`.

---

## 🛡️ Standar Wajib

- **Autentikasi**: Wajib melalui Convex Auth (`getAuthUserId`) — tidak ada endpoint tanpa identitas.
- **Audit Trail**: Setiap dokumen bisnis menyertakan `createdBy`, `updatedBy`, dan `deletedAt`.
- **Soft Delete**: Penghapusan data menggunakan soft-delete (`deletedAt`) secara default, bukan `delete` permanen.
- **Keamanan Data**: RBAC granular, validasi server-side dengan `v.object`, dan penanganan error tanpa ekspos detail internal.
- **Aksesibilitas & UI**: Tema bersih, kontras tinggi, mendukung Mode Gelap, dan ramah pembaca layar (Screen Reader).
