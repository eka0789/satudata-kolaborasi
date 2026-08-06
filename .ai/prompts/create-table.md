# AI Prompt: Create Enterprise Data Table

## Context & Purpose
Gunakan prompt ini untuk membuat Komponen Data Table High-Performance menggunakan shadcn/ui Table primitives, Lucide Icons, serta mendukung fitur pencarian, filter, pengurutan (sorting), paginasi, dan aksi menu per baris. Data berasal dari Convex (`useQuery`).

---

## 🤖 AI Instructions

Saat membuat Data Table enterprise, AI **WAJIB** menyertakan fitur-fitur berikut:

### Step 1: Fitur Wajib Komponen Tabel
1. **Searching / Debounced Filter Input**: Input teks pencarian global dengan penundaan (*debounce 300ms*) untuk meminimalkan query.
2. **Column Sorting**: Tombol pengurutan asc/desc pada header kolom utama (contoh: Tanggal, Nama, Judul).
3. **Status Badges**: Format visual khusus untuk kolom status menggunakan `cva` (contoh: `DRAFT` = Gray, `PENDING` = Amber, `APPROVED` = Green, `REJECTED` = Red).
4. **Row Selection (Checkbox)**: Opsi centang baris untuk aksi masal (*bulk actions*) seperti Hapus Masal atau Cetak Masal.
5. **Row Actions Menu**: Dropdown menu pada setiap baris (`DropdownMenu` shadcn) yang berisi:
   - 👁️ `Lihat Detail`
   - ✏️ `Edit Data`
   - 🗑️ `Hapus Data` (Soft Delete dengan dialog konfirmasi — panggil mutation `remove` yang melakukan `patch({ deletedAt })`)
6. **Pagination Controls**:
   - Info total data dan halaman aktif.
   - Select option `Rows per page` (10, 25, 50, 100).
   - Tombol Navigasi `First`, `Previous`, `Next`, `Last`.

### Step 2: Dukungan State UI
- **Loading State**: Render `Skeleton` baris tabel sebanyak 5-10 baris saat `useQuery` mengembalikan `undefined`.
- **Error State**: Alert + tombol Retry saat `useQuery` mengembalikan `null`.
- **Empty State**: Render baris tabel khusus yang menampilkan pesan "Tidak ada data yang ditemukan" jika array data kosong.

### Step 3: Integrasi Data Convex
```typescript
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";

const rows = useQuery(api.projects.list, { status: filter ?? undefined });
const remove = useMutation(api.projects.remove);
```

### Step 4: Implementasi Kode Complete
Tulis komponen `.tsx` reusable yang menerima props data, pagination, dan handler callback secara eksplisit dan type-safe. Gunakan tipe hasil dari `api` (Convex generasi tipe otomatis).
