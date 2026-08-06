# Domain Context: SatuData Komunitas Indonesia

## 🏛️ Profil Domain & Platform

- **Nama Platform**: SatuData Komunitas Indonesia
- **Kategori**: National Community Collaboration Platform
- **Target Pengguna**:
  - Komunitas
  - Organisasi Sosial
  - Yayasan
  - Pesantren
  - UMKM
  - Relawan
  - Perusahaan (CSR)
  - Pemerintah
  - Akademisi
  - NGO
- **Tujuan Platform**:
  Menjadi platform nasional yang menghubungkan komunitas di Indonesia untuk mempercepat kolaborasi, pendanaan, relawan, program sosial, serta pengukuran dampak berbasis data.

---

# 📋 Business Rules & Domain Entities

## 1. Community ID (CID)

Setiap komunitas memiliki Community ID unik.

Format:

CID-YYYY-XXXXXX

Contoh:

CID-2026-000125

Validation:

```
^CID-\d{4}-\d{6}$
```

Community ID bersifat UNIQUE.

Community ID digunakan sebagai identitas utama seluruh relasi data.

---

## 2. Status Verifikasi Komunitas

Workflow:

DRAFT

↓

SUBMITTED

↓

DOCUMENT_VERIFICATION

↓

FIELD_VERIFICATION (Optional)

↓

VERIFIED

↓

ACTIVE

atau

REJECTED

Komunitas yang belum VERIFIED tidak dapat:

- membuka kebutuhan
- menerima CSR
- membuka donasi
- membuat event nasional

---

## 3. Jenis Komunitas

Enum:

- SOCIAL
- EDUCATION
- ENVIRONMENT
- HEALTH
- RELIGIOUS
- DISABILITY
- WOMEN
- YOUTH
- TECHNOLOGY
- AGRICULTURE
- CULTURE
- SPORTS
- HUMANITARIAN
- UMKM
- STARTUP
- FOUNDATION
- PESANTREN
- OTHER

---

## 4. Status Komunitas

- ACTIVE
- INACTIVE
- SUSPENDED
- ARCHIVED

---

## 5. Tingkat Wilayah

Indonesia

↓

Provinsi

↓

Kabupaten/Kota

↓

Kecamatan

↓

Kelurahan/Desa

Setiap komunitas wajib memiliki lokasi.

Gunakan koordinat GPS.

---

# 🗄️ Domain Entities

## communities

Master data komunitas.

Field:

- Community ID
- Nama
- Deskripsi
- Logo
- Banner
- Kategori
- Tahun Berdiri
- Website
- Email
- WhatsApp
- Instagram
- Facebook
- TikTok
- Lokasi
- Latitude
- Longitude
- Jumlah Anggota
- Status Verifikasi
- Status Aktif

---

## users

Master pengguna.

Setiap user dapat bergabung ke banyak komunitas.

---

## memberships

Relasi user dengan komunitas.

Role:

- Owner
- Admin
- Member
- Volunteer

---

## volunteers

Master data relawan.

Data:

- Skill
- Sertifikat
- Pengalaman
- Lokasi
- Minat

---

## community_needs

Marketplace kebutuhan komunitas.

Kategori:

- Volunteer
- Donation
- Mentor
- Training
- Equipment
- Internet
- Transportation
- Education
- Health
- Infrastructure
- Technology

Status:

- OPEN
- MATCHED
- IN_PROGRESS
- COMPLETED
- CANCELLED

---

## collaborations

Proyek kolaborasi.

Data:

- Nama
- Komunitas
- Partner
- Timeline
- Progress
- Milestone
- Outcome

---

## csr_programs

Program CSR perusahaan.

Data:

- Perusahaan
- Budget
- Lokasi
- Fokus
- Kuota

---

## grants

Program Hibah.

Data:

- Pemberi Hibah
- Persyaratan
- Deadline
- Nominal

---

## events

Event komunitas.

Jenis:

- Seminar
- Workshop
- Pelatihan
- Webinar
- Volunteer
- Bakti Sosial
- Festival

---

## impact_reports

Laporan dampak.

Metrik:

- Jumlah Penerima Manfaat
- Relawan
- Donasi
- Jam Pengabdian
- Nilai Ekonomi
- Foto Dokumentasi

---

## notifications

Realtime Notification.

---

## files

Dokumen.

Jenis:

- Proposal
- LPJ
- Foto
- Video
- Banner
- Logo
- Sertifikat

---

# 🎯 Role Based Access Control (RBAC)

## SUPER_ADMIN

Mengelola seluruh sistem.

Hak akses:

- Semua data
- Verifikasi
- Audit
- CMS
- Master Data

---

## COMMUNITY_ADMIN

Mengelola komunitas.

Hak akses:

- Profil
- Event
- Kebutuhan
- Member
- Laporan

---

## COMMUNITY_MEMBER

Hak akses:

- Bergabung komunitas
- Mengikuti event
- Melihat laporan

---

## VOLUNTEER

Hak akses:

- Melihat kebutuhan
- Mendaftar volunteer
- Mengikuti kegiatan
- Mendapat sertifikat

---

## CSR_COMPANY

Hak akses:

- Membuat program CSR
- Memilih komunitas
- Monitoring bantuan
- Laporan dampak

---

## GOVERNMENT

Hak akses:

- Dashboard statistik
- Monitoring wilayah
- Export data
- Analytics

---

## NGO_PARTNER

Hak akses:

- Kolaborasi program
- Monitoring project
- Pendanaan

---

## PUBLIC_USER

Hak akses:

- Browse komunitas
- Search
- Melihat event
- Registrasi

---

# 🤖 AI Recommendation Rules

AI digunakan untuk:

- Merekomendasikan komunitas yang relevan
- Mencocokkan relawan
- Merekomendasikan program CSR
- Memberikan rekomendasi hibah
- Menemukan partner kolaborasi
- Memberikan insight kebutuhan wilayah
- Mendeteksi komunitas dengan kebutuhan mendesak

AI harus bersifat modular sehingga dapat menggunakan OpenAI, Gemini, Claude, OpenRouter, Ollama, atau provider lain tanpa mengubah business logic aplikasi.

---

# 🔒 Security Rules

- Semua data menggunakan UUID
- Terapkan Row Level Security (RLS) Supabase
- Gunakan Soft Delete
- Audit Log untuk seluruh perubahan data
- Role-based Authorization
- Input Validation dengan Zod
- File Upload Validation
- Rate Limiting
- Secure Environment Variables

---

# 📊 Dashboard Metrics

Dashboard harus menampilkan:

- Total Komunitas
- Total Relawan
- Total Event
- Total Kolaborasi
- Total Program CSR
- Total Hibah
- Total Penerima Manfaat
- Total Donasi
- Total Wilayah Aktif
- Community Growth
- Impact Score

---

# 🎨 Design Principles

UI harus modern, clean, dan profesional.

Inspirasi:

- Linear
- Vercel
- Stripe
- GitHub
- Notion

Gunakan:

- Tailwind CSS
- shadcn/ui
- Framer Motion
- Responsive Design
- Accessibility WCAG AA
- Dark Mode
- Light Mode

Seluruh implementasi harus mengikuti prinsip:

- Clean Architecture
- SOLID
- Modular Feature-Based Structure
- Production Ready
- Type Safe
- Secure by Default
- Scalable
- Maintainable

# AI Coding Guidelines

Saat mengembangkan aplikasi ini, AI wajib mengikuti aturan berikut:

- Gunakan Next.js App Router.
- Gunakan Server Components secara default.
- Gunakan Client Components hanya jika diperlukan.
- Seluruh data berasal dari Supabase.
- Jangan membuat backend terpisah kecuali benar-benar diperlukan.
- Gunakan Supabase Auth untuk autentikasi.
- Gunakan Supabase RLS sebagai lapisan keamanan utama.
- Semua CRUD harus menggunakan Server Actions atau Route Handlers.
- Gunakan TypeScript strict mode.
- Gunakan React Hook Form + Zod untuk validasi.
- Gunakan TanStack Query hanya untuk data yang membutuhkan cache client-side.
- Hindari over-engineering.
- Optimalkan untuk deployment di Vercel.
- Seluruh fitur harus mobile-first dan siap production.