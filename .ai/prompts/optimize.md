# AI Prompt: Optimize Performance

## Context & Purpose
Gunakan prompt ini untuk menganalisis dan meningkatkan performa aplikasi pada lapisan database/query Convex maupun frontend UI rendering (React re-render & asset loading).

---

## 🤖 AI Instructions

Saat mengeksekusi optimasi performa, ikuti panduan berikut:

### 1. Database & Query Convex Optimization
- **Gunakan Index**: Pastikan query memakai `withIndex("by_x")` pada index yang sesuai (contoh: `by_categoryId`, `by_slug`), bukan melakukan full scan.
- **Eliminasi N+1 Queries**: Jangan panggil query per item dalam loop di client. Buat query Convex agregat (mis. `getByCommunityId` yang mengembalikan banyak baris sekaligus) atau gabungkan data.
- **Batasi Data**: Gunakan `.take(n)` pada query yang hanya butuh sebagian data (mis. preview/recent).
- **Filter Soft-Delete**: Selalu sertakan filter `deletedAt === undefined` untuk menghindari query menampilkan data terhapus.
- **Hindari Argumen yang Tidak Perlu**: Jangan mengirim objek besar; kirim id/filter minimum yang dibutuhkan.

### 2. Frontend React Optimization
- **Pencegahan Re-render**: Gunakan `useMemo` dan `useCallback` pada perhitungan berat atau callback prop yang diteruskan ke komponen anak.
- **Memoize Component**: Gunakan `React.memo` untuk daftar/baris tabel besar.
- **Code Splitting & Lazy Loading**: Terapkan `React.lazy()` + `Suspense` pada halaman-halaman route utama.
- **Debounce Search Input**: Gunakan debounce (300ms) pada input pencarian agar tidak memicu query berulang.
- **Skeleton vs Spinner**: Gunakan Skeleton saat `useQuery` loading agar tidak terjadi layout shift.

### 3. Realtime Convex
- Manfaatkan reaktivitas Convex: `useQuery` otomatis meng-update saat data berubah — hindari polling manual (`setInterval`) atau tombol "refresh manual" yang tidak perlu.
- Jika ada perhitungan berat di client, pindahkan ke Convex `query`/`action` agar tidak membebani browser.

### 4. Output Analysis & Benchmark Report
Tulis laporan perbandingan sebelum & sesudah optimasi (contoh: Jumlah query berkurang dari 50 ke 2 query, waktu render turun dari 450ms ke 60ms).
