# AI Prompt: Create Enterprise React Page

## Context & Purpose
Gunakan prompt ini untuk membuat Halaman Utama (Page Component) React enterprise yang konsisten, berstruktur jelas, ramah pengguna, responsif, dan mendukung mode gelap.

---

## 🤖 AI Instructions

Setiap Halaman UI enterprise yang dihasilkan WAJIB mengikuti tata letak standar berikut:

### Step 1: Struktur Tata Letak (Page Layout Hierarchy)
Setiap halaman wajib memuat 5 bagian utama:

1. **Header Halaman (Page Header & Breadcrumb)**:
   - Component `Breadcrumb` yang menunjukkan lokasi hirarki (contoh: `Beranda > Naskah Dinas > Surat Masuk`).
   - `Page Title` (Heading 1) yang jelas.
   - `Page Description` ringkas mengenai fungsi halaman.
   - `Primary Action Button` (contoh: `+ Buat Surat Baru`).

2. **Bilah Filter & Pencarian (Filter Bar)**:
   - Input Search (dengan icon `Search`).
   - Select Filter Status, Filter Tanggal, atau Filter Unit Kerja.
   - Tombol Reset Filter.

3. **Area Konten Utama (Main Content Area)**:
   - Komponen Data Table / Grid Card / Dashboard Cards.

4. **Pagination Controls**:
   - Informasi jumlah total data (contoh: `Menampilkan 1-10 dari 150 data`).
   - Control Tombol `Previous`, `Next`, dan Pemilih Halaman.

### Step 2: Penanganan 5 State UI Wajib
1. ⏳ **Loading State**: Render Skeleton Loader (`<Skeleton className="h-12 w-full" />`) saat `isLoading === true`.
2. ❌ **Error State**: Render komponen Alert Error dengan tombol `Retry` jika `isError === true`.
3. 📭 **Empty State**: Render Ilustrasi/Icon kosong, judul "Belum ada data", deskripsi penjelas, dan tombol aksi "Buat Data Pertama".
4. 📱 **Responsive View**: Gunakan grid/flex Tailwind (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`) agar fleksibel dari HP hingga Layar Lebar.
5. 🌙 **Dark Mode**: Gunakan utility Tailwind `bg-background text-foreground border-border dark:...`.

### Step 3: Implementasi Kode React Production Ready
Tulis berkas `.tsx` lengkap dengan import Lucide Icons, komponen shadcn, dan TanStack Query Hook.
