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

> Implementasi: disimpan pada field `communities.slug` (index `by_slug`), karena slug bersifat unik per dokumen Convex.

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

> Catatan: status verifikasi belum diimplementasikan di schema saat ini; tambahkan field `verificationStatus` pada tabel `communities` bila fitur ini dikerjakan.

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

> Implementasi: dipetakan ke master data `categories` (`name` + `slug`, index `by_slug`), direferensikan via `communities.categoryId`.

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

> Implementasi: master data `provinces` (`code` + `name`, index `by_code`). Referensi provinsi via `provinceId` pada `users`, `communities`, dan `projects`. Level wilayah lain (kabupaten dst.) dapat ditambahkan sebagai tabel master baru.

---

# 🗄️ Domain Entities (Implementasi Schema Convex)

## users

Master pengguna (diturunkan dari tabel auth Convex).

Field domain:

- `role` (`user` | `admin`)
- `bio`
- `occupation`
- `provinceId`
- `skills` (array string)
- `isOnboarded`

Setiap user dapat bergabung ke banyak komunitas.

---

## provinces & categories

Master data referensi:

- `provinces`: `code`, `name`, `region?` — index `by_code`
- `categories`: `name`, `slug`, `description?` — index `by_slug`

---

## communities

Master data komunitas.

Field:

- `name`, `slug` (unix) — index `by_slug` + searchIndex `search_name`
- `description?`, `imageUrl?`
- `provinceId?`, `categoryId?`
- `createdBy` (user id)
- `isFeatured?`

---

## communityMembers

Relasi user dengan komunitas (replaces "memberships").

Role:

- `admin`
- `moderator`
- `member`

Index: `by_communityId`, `by_userId`, `by_community_user`.

---

## projects

Proyek kolaborasi.

Field:

- `title`, `slug` — index `by_slug` + searchIndex `search_title`
- `description?`, `imageUrl?`
- `communityId?`, `categoryId?`, `provinceId?`
- `status`: `draft` | `active` | `completed` | `archived` — index `by_status`
- `startDate?`, `endDate?` (timestamp ms)
- `tags?` (array string)
- `createdBy`

---

## projectMembers

Relasi user dengan proyek.

Role:

- `owner`
- `contributor`
- `viewer`

---

## events

Event komunitas.

Jenis (deskripsi):

- Seminar
- Workshop
- Pelatihan
- Webinar
- Volunteer
- Bakti Sosial
- Festival

Field:

- `title` — searchIndex `search_title`
- `description?`, `location?`, `imageUrl?`
- `projectId?`, `communityId?`, `categoryId?`
- `startTime` (wajib), `endTime?`
- `capacity?`
- `status`: `upcoming` | `ongoing` | `ended` | `cancelled`
- `createdBy`

---

## eventAttendees

Relasi user dengan event.

Status:

- `going`
- `interested`
- `cancelled`

---

## needs

Marketplace kebutuhan komunitas (per proyek).

Kategori (deskripsi):

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

Field:

- `projectId` (wajib) — index `by_projectId`
- `title`, `description?`
- `categoryId?`
- `quantity?`
- `skillsRequired?` (array string)
- `status`: `open` | `in_progress` | `fulfilled` | `closed` — index `by_status`
- `createdBy`

---

## volunteers

Master data relawan (pendaftaran volunteer ke proyek/kebutuhan).

Field:

- `userId` (wajib) — index `by_userId`
- `projectId?`, `needId?`
- `message?`
- `skills?` (array string)
- `status`: `pending` | `accepted` | `declined` | `completed` — index `by_status`

---

## notifications & onboarding

- `notifications`: realtime notifikasi per user (`type`, `title`, `body?`, `link?`, `read`) — index `by_user_read`.
- `onboarding`: progres onboarding pengguna (`step`, `completed`, `data?`) — index `by_user_completed`.

> Fitur lain yang direncanakan (belum ada di schema): `auditLogs`, `impact_reports`, `csr_programs`, `grants`, `collaborations`, `files`. Tambahkan via `schema.ts` saat dikerjakan.

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

> Implementasi: `users.role === "admin"`.

---

## COMMUNITY_ADMIN

Mengelola komunitas.

Hak akses:

- Profil
- Event
- Kebutuhan
- Member
- Laporan

> Implementasi: `communityMembers.role === "admin"`.

---

## COMMUNITY_MEMBER

Hak akses:

- Bergabung komunitas
- Mengikuti event
- Melihat laporan

> Implementasi: terdaftar di `communityMembers` (`role` apa pun).

---

## VOLUNTEER

Hak akses:

- Melihat kebutuhan
- Mendaftar volunteer
- Mengikuti kegiatan
- Mendapat sertifikat

> Implementasi: `volunteers` terdaftar ke proyek/kebutuhan.

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

> Integrasi AI direncanakan lewat HTTP action Convex (`http.ts`) atau scheduler; jangan menaruh API key di kode client.

---

# 🔒 Security Rules

- Semua id dokumen menggunakan id Convex (bukan UUID manual).
- Autentikasi wajib lewat `Convex Auth` — gunakan `getAuthUserId(ctx)` di setiap function.
- Gunakan Soft Delete (`deletedAt`) untuk data bisnis.
- Audit field wajib: `createdBy`, `updatedBy`, `deletedAt` (timestamp `_creationTime` bawaan Convex).
- Role-based Authorization (lihat RBAC di atas).
- Input Validation dengan validator `v.object` di sisi Convex + Zod di form.
- File Upload Validation (Convex Storage tersedia, belum dipakai — pastikan validasi tipe/ukuran saat diimplementasikan).
- Rate Limiting / batasan akses per user.
- Secure Environment Variables (`envVars` di `convex.json`, bukan hardcoded).

---

# 📊 Dashboard Metrics

Dashboard harus menampilkan:

- Total Komunitas
- Total Relawan
- Total Event
- Total Kolaborasi (proyek)
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

- Tailwind CSS v4
- shadcn/ui
- Responsive Design
- Accessibility WCAG AA
- Dark Mode
- Light Mode

Seluruh implementasi harus mengikuti prinsip:

- Modular Feature-Based Structure
- Production Ready
- Type Safe
- Secure by Default
- Scalable
- Maintainable

---

# 🤖 AI Coding Guidelines

Saat mengembangkan aplikasi ini, AI wajib mengikuti aturan berikut:

- Gunakan **React + Vite + React Router v7** untuk frontend.
- Gunakan **Convex** sebagai satu-satunya backend & database — seluruh data query dan mutasi lewat `src/convex/*.ts`.
- Gunakan **Convex Auth** untuk autentikasi (Email OTP + Anonymous); jangan membuat backend terpisah.
- Setiap function yang mengakses data privat wajib memanggil `getAuthUserId(ctx)` dan memvalidasi akses.
- Validasi input server-side dengan validator `v.object`; gunakan Zod untuk form (React Hook Form).
- Gunakan `useQuery`/`useMutation` Convex untuk data real-time — tidak perlu TanStack Query.
- Gunakan TypeScript strict mode.
- Gunakan soft-delete (`deletedAt`) untuk seluruh data bisnis.
- Hindari over-engineering.
- Seluruh fitur harus mobile-first dan siap production.
