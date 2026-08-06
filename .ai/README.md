# Enterprise Government Starter Kit (`my-starter-kit-gov`)

Starter Kit Enterprise Aplikasi Pemerintah Indonesia berbasis arsitektur **Feature-First Monorepo**, dibangun dengan teknologi modern, tipe terstruktur, aman, serta memenuhi standar Sistem Pemerintahan Berbasis Elektronik (SPBE).

---

## 🎯 Tujuan Repositori

Repositori ini dirancang sebagai sistem acuan (starter kit) untuk membangun aplikasi instansi pemerintah (Kementerian, Lembaga, Daerah / Pemda) dengan kriteria:
1. **SIAP PAKAI (Production Ready)**: Mendukung fitur standar seperti e-Surat/Naskah Dinas Digital, SIMPEG/Manajemen ASN, E-Kinerja, Sistem Pengaduan/SP4N-LAPOR, hingga Layanan Publik.
2. **STANDAR SPBE & BSSN**: Mengikuti pedoman keamanan informasi, audit trail, akses berbasis peran (RBAC), serta enkripsi data sensitif.
3. **AI-FIRST DEVELOPMENT**: Dilengkapi dengan sistem konteks `.ai` (System Rules, Prompts Library, dan Code Templates) yang memungkinkan AI Coding Assistant memproduksi kode berkualitas produksi secara konsisten.

---

## 📁 Struktur Direktori `.ai/`

```text
.ai/
├── README.md               # Dokumentasi utama direktori .ai
├── constitution.md         # Kontrak kerja & urutan prioritas pembacaan AI
├── project.md              # Visi & prinsip dasar proyek
├── tech-stack.md           # Stack teknologi resmi (Monorepo, Hono, React, Drizzle)
├── architecture.md         # Arsitektur Feature-First Vertical Slice
├── folder-structure.md     # Struktur direktori monorepo & aplikasi
├── business-rules.md       # Aturan bisnis & regulasi standar pemerintah
├── coding-standards.md     # Standar penulisan kode & type-safety
├── backend.md              # Aturan pengembangan Backend (Hono + Zod + Drizzle)
├── frontend.md             # Aturan pengembangan Frontend (React + Vite + shadcn)
├── database.md             # Aturan database Supabase PostgreSQL & Drizzle ORM
├── api-rules.md            # Standar REST API & OpenAPI
├── security.md             # Keamanan RBAC, Audit Trail, & OWASP
├── ui-guidelines.md        # Panduan UI/UX Enterprise Government
├── workflow.md             # Alur pengembangan fitur
├── definition-of-done.md   # Checklist kriteria kelayakan fitur (DoD)
├── agent-memory.md         # Catatan keputusan arsitektur jangka panjang
├── prompt-library.md       # Daftar perintah prompt AI yang tersedia
├── prompts/                # Instruksi prompt AI siap pakai (12 file)
└── templates/              # Boilerplate & template kode produksi (9 file)
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
15. `agent-memory.md`

---

## 🚀 Cara Menggunakan Starter Kit

### 1. Pengembangan Fitur Baru
Gunakan prompt siap pakai di `.ai/prompts/create-feature.md` atau salin template dari `.ai/templates/feature.md`.

Contoh eksekusi perintah ke AI:
> *"Tolong buatkan fitur pengajuan surat keluar (outgoing-mail) menggunakan instruksi dari `.ai/prompts/create-feature.md`."*

### 2. Pembuatan API Endpoint
Gunakan prompt `.ai/prompts/create-api.md` dan template `.ai/templates/api.md`.

### 3. Pembuatan Halaman UI & Tabel Data
Gunakan `.ai/prompts/create-page.md`, `.ai/prompts/create-table.md`, dan `.ai/templates/table.md`.

---

## 🛡️ Standar Wajib Aplikasi Pemerintah

- **Validasi Identitas**: Penggunaan format NIP 18-digit (ASN/PNS) dan NIK 16-digit.
- **Audit Trail BPK/BSSN**: Setiap tabel bisnis menyertakan `created_at`, `updated_at`, `deleted_at`, `created_by`, `updated_by`.
- **Keamanan Data**: Penggunaan Soft Delete secara default, RBAC granular (contoh: `surat.read`, `surat.approve`), dan penanganan error tanpa ekspos detail database/SQL.
- **Aksesibilitas & UI**: Tema bersih, kontras tinggi, mendukung Mode Gelap, dan ramah pembaca layar (Screen Reader).
