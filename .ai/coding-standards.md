# Coding Standards & Guidelines

## 🌟 Quality Principles

- Tulis kode yang bersih, mudah dibaca, dan mudah dipahami.
- Hindari optimasi dini (*No premature optimization*).
- Utamakan kejelasan dibanding trik pemrograman yang rumit.

---

## 🚫 Absolute Prohibition Rules (Larangan Mutlak)

1. **Dilarang menggunakan `any`**: Selalu tentukan tipe data yang presisi atau gunakan `unknown` dengan type-guard.
2. **Dilarang menggunakan Magic Strings/Numbers**: Gunakan `const` object bertipe union (mis. `status` union pada validator).
3. **Dilarang ada kode duplikat (DRY)**: Abstraksi kode yang dipakai berulang ke dalam utility function.
4. **Dilarang menyisakan Dead Code / Unused Imports**: Bersihkan variabel dan berkas yang tidak lagi digunakan.
5. **Dilarang menyisakan kode yang di-comment**: Hapus kode mati; gunakan riwayat Git jika butuh mereferensi.
6. **Dilarang menyisakan komentar `TODO` / `FIXME`**: Selesaikan seluruh logika sebelum menyatakan pekerjaan tuntas.

---

## ✅ Mandatory Coding Practices (Praktik Wajib)

1. **Type Safety**: Manfaatkan TypeScript strict mode sepenuhnya. Dilarang menonaktifkan ts-check (`// @ts-ignore` dilarang).
2. **Fungsi Kecil & Fokus**: Setiap fungsi maksimal 50 baris kode dan hanya memiliki satu tanggung jawab (Single Responsibility Principle).
3. **Komponen UI Ringkas**: Komponen React maksimal 300 baris kode. Pecah komponen besar menjadi sub-komponen.
4. **Early Return Pattern**: Gunakan pola early return untuk mengurangi pencabangan bertingkat (*nested IF*).
5. **Validation dengan Zod / `v`**: Validasi seluruh input data di batas sistem. Di sisi backend Convex gunakan `v.object` (validator Convex); di sisi form gunakan schema Zod.
6. **Async/Await**: Selalu gunakan `async/await` alih-alih raw Promise `.then().catch()`.
7. **Error Handling**: Gunakan `try-catch` dengan penanganan spesifik. Pada Convex, lempar `ConvexError` (liat `convexError` helper) agar pesan error sampai ke klien tanpa membocorkan detail internal.
8. **Dokumentasi Kode Komposisi Bisnis**: Jelaskan aturan bisnis yang kompleks menggunakan komentar bahasa Indonesia yang jelas.

---

## 📐 Naming Conventions

- **File & Folder**: `kebab-case` (contoh: `community-members.ts`, `use-auth.ts`)
- **React Components**: `PascalCase` (contoh: `CommunityCard.tsx`)
- **TypeScript Interfaces & Types**: `PascalCase` (contoh: `CommunityProfile`, `CreateProjectInput`)
- **Functions & Variables**: `camelCase` (contoh: `calculateWorkingDays()`, `isPending`)
- **Table Convex & Kolom**: `camelCase` (contoh: `communityMembers`, `createdBy`, `deletedAt`)
- **Constants / Enums**: `UPPER_SNAKE_CASE` (contoh: `MAX_FILE_SIZE_MB`, `PROJECT_STATUS`)

> Catatan: Convex menggunakan penamaan dokumen `camelCase` (bukan `snake_case` seperti SQL). Kolom audit berupa `_creationTime` (bawaan Convex), `createdBy`, `updatedBy`, dan `deletedAt` (untuk soft-delete).
