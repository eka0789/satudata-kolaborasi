# AI Prompt: Create Enterprise Data Table

## Context & Purpose
Gunakan prompt ini untuk membuat Komponen Data Table High-Performance menggunakan TanStack Table v8, shadcn/ui Table primitives, Lucide Icons, serta mendukung fitur pencarian, filter, pengurutan (sorting), paginasi, dan aksi menu per baris.

---

## 🤖 AI Instructions

Saat membuat Data Table enterprise, AI **WAJIB** menyertakan fitur-fitur berikut:

### Step 1: Fitur Wajib Komponen Tabel
1. **Searching / Debounced Filter Input**: Input teks pencarian global dengan penundaan (*debounce 300ms*) agar tidak membebani server API.
2. **Column Sorting**: Tombol pengurutan asc/desc pada header kolom utama (contoh: Tanggal, Nama, NIP).
3. **Status Badges**: Format visual khusus untuk kolom status (contoh: `DRAFT` = Gray, `PENDING` = Amber, `APPROVED` = Green, `REJECTED` = Red).
4. **Row Selection (Checkbox)**: Opsi centang baris untuk aksi masal (*bulk actions*) seperti Hapus Masal atau Cetak Masal.
5. **Row Actions Menu**: Dropdown menu pada setiap baris (`DropdownMenu` shadcn) yang berisi:
   - 👁️ `Lihat Detail`
   - ✏️ `Edit Data`
   - 🗑️ `Hapus Data` (Soft Delete dengan dialog konfirmasi)
6. **Server-Side Pagination Controls**:
   - Info total data dan halaman aktif.
   - Select option `Rows per page` (10, 25, 50, 100).
   - Tombol Navigasi `First`, `Previous`, `Next`, `Last`.

### Step 2: Dukungan State UI
- **Loading State**: Render `Skeleton` baris tabel sebanyak 5-10 baris saat data sedang dimuat.
- **Empty State**: Render baris tabel khusus yang menampilkan pesan "Tidak ada data yang ditemukan" jika array data kosong.

### Step 3: Implementasi Kode Complete
Tulis komponen `.tsx` reusable yang menerima props data, pagination, dan handler callback secara eksplisit dan type-safe.
