# AI Prompt: Create REST API Endpoint

## Context & Purpose
Gunakan prompt ini untuk membuat REST API endpoint baru menggunakan Hono, Zod Validation, Drizzle ORM, Supabase Auth, dan standar JSON Response Enterprise.

---

## 🤖 AI Instructions

Saat membuat REST API baru, jalankan urutan langkah berikut:

### Step 1: Definisikan Kontrak Endpoint (API Contract)
Jelaskan terlebih dahulu:
- **HTTP Method & URL Path**: contoh: `GET /api/v1/employees`, `POST /api/v1/employees`.
- **Persyaratan Otorisasi**: Peran & Permission yang dibutuhkan (contoh: `pegawai.read`, `pegawai.create`).
- **Skema Input**: Query String, Path Params, dan JSON Body.
- **Skema Output**: Struktur respons JSON sukses dan error.

### Step 2: Hasilkan Skema Zod (`schema.ts`)
Tulis skema validasi Zod presisi tinggi dengan pesan kesalahan ber-bahasa Indonesia:
```typescript
import { z } from 'zod';

export const createEmployeeSchema = z.object({
  nip: z.string().length(18, 'NIP harus persis 18 digit angka'),
  name: z.string().min(3, 'Nama pegawai minimal 3 karakter'),
  email: z.string().email('Format email tidak valid'),
  unit_kerja_id: z.string().uuid('ID Unit Kerja tidak valid')
});
```

### Step 3: Hasilkan Service Layer (`service.ts`)
Gunakan Drizzle ORM untuk eksekusi query ke Supabase PostgreSQL:
- Selalu filter `isNull(table.deletedAt)`.
- Selalu sertakan pencatatan audit trail (`created_by`, `updated_by`).
- Tangani pagination (`page`, `pageSize`) dan filter pencarian (`q`).

### Step 4: Hasilkan Hono Route Handler (`routes.ts`)
- Terapkan `authMiddleware` untuk validasi JWT.
- Terapkan middleware `requirePermission('pegawai.create')`.
- Jalankan validasi input Zod via `@hono/zod-validator`.
- Kembalikan respons terstruktur:
```json
{
  "success": true,
  "message": "Data pegawai berhasil dibuat.",
  "data": { ... },
  "meta": { ... }
}
```

### Step 5: Tuliskan Dokumentasi OpenAPI / Usage Example
Tulis contoh eksekusi API menggunakan `curl` atau JavaScript `fetch`.
