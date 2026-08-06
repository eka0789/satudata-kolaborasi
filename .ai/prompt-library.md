# AI Prompt Library

Kumpulan perintah prompt AI terstruktur yang tersedia di direktori `.ai/prompts/` untuk mempercepat pembuatan dan pemeliharaan aplikasi pemerintah enterprise.

---

## 📚 Perintah Prompt Terdaftar

| Perintah Prompt | Berkas Panduan | Tujuan Utama |
| :--- | :--- | :--- |
| `Inisialisasi Proyek` | `.ai/prompts/initialize-project.md` | Membuat struktur monorepo Turborepo + Hono + React Vite dari awal |
| `Buat Modul Domain` | `.ai/prompts/create-module.md` | Menginisialisasi modul bisnis domain baru (contoh: Naskah Dinas, Kepegawaian) |
| `Buat Fitur Vertical Slice` | `.ai/prompts/create-feature.md` | Membangun fitur end-to-end (Database ➔ Zod ➔ API ➔ UI Component) |
| `Buat REST API` | `.ai/prompts/create-api.md` | Membuat API endpoint Hono + Zod + Drizzle ORM + OpenAPI docs |
| `Buat Halaman UI` | `.ai/prompts/create-page.md` | Membuat halaman React enterprise dengan Breadcrumb, Header, & Layout |
| `Buat Dashboard` | `.ai/prompts/create-dashboard.md` | Membuat eksekutif dashboard e-Gov dengan Ringkasan Card & Chart |
| `Buat Data Table` | `.ai/prompts/create-table.md` | Membuat tabel data TanStack + shadcn dengan search, pagination, & filter |
| `Buat Form Complex` | `.ai/prompts/create-form.md` | Membuat form kompleks React Hook Form + Zod dengan validasi instan |
| `Review Kode / Audit` | `.ai/prompts/review-code.md` | Mengaudit kualitas kode terhadap standar OWASP, BSSN, & Type-safety |
| `Refactor Kode` | `.ai/prompts/refactor.md` | Merapikan kode legacy menjadi arsitektur Feature-First Clean Code |
| `Optimasi Performa` | `.ai/prompts/optimize.md` | Mengoptimalkan query database Drizzle & rendering React |
| `Debug & Fix Bug` | `.ai/prompts/debug.md` | Menganalisis dan mengoreksi masalah/bug sistematis hingga tuntas |

---

## 💡 Cara Menggunakan Prompt

Berikan instruksi kepada AI Assistant dengan mereferensikan berkas prompt terkait.
Contoh:
> *"Tolong buatkan REST API pengelolaan data pegawai berdasarkan panduan `.ai/prompts/create-api.md`."*