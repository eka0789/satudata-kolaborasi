# AI Prompt: Create Executive Government Dashboard

## Context & Purpose
Gunakan prompt ini untuk membuat Halaman Eksekutif Dashboard e-Gov (Dashboard Pimpinan / Admin) yang menyajikan metrik statistik utama, grafik analitis, log aktivitas terbaru, serta akses cepat (*quick actions*).

---

## 🤖 AI Instructions

Saat membuat Dashboard Eksekutif Pemerintah, ikuti panduan berikut:

### Step 1: Susun Metrik Ringkasan Utama (KPI Summary Cards)
Sediakan 4 Top Stats Cards di bagian paling atas:
1. **Total Proyek / Kolaborasi** (dengan persentase kenaikan dibanding bulan lalu).
2. **Proyek Menunggu Verifikasi / Sedang Berjalan** (Highlight warna Warning/Orange jika ada antrean).
3. **Proyek Selesai / Terproses** (Highlight warna Success/Green).
4. **Kebutuhan / Insiden Aktif** (Highlight warna Info/Blue).

Setiap Card wajib menyertakan Icon Lucide, Angka Utama (Large Font), Label, dan Trend Indicator.

### Step 2: Sediakan Visualisasi Grafik Analitis (Charts Section)
Gunakan Recharts / Chart Components yang dibungkus Card shadcn:
- **Bar Chart / Line Chart**: Tren Data per Bulan (mis. proyek/kolaborasi masuk & selesai).
- **Pie Chart / Donut Chart**: Distribusi Kategori / Status.

### Step 3: Area Log Aktivitas & Quick Actions
- **Recent Activities List**: Tabel/List ringkas 5 aktivitas terakhir lengkap dengan Timestamp dan Avatar Pengguna.
- **Quick Action Panel**: Tombol pintas untuk aksi yang paling sering dilakukan (contoh: "Buat Proyek Baru", "Cari Komunitas", "Unduh Laporan Bulanan").

### Step 4: Integrasi Data Convex (Realtime)
Gunakan query Convex agregat (mis. `api.dashboard.stats`) dengan `useQuery`:
```typescript
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const stats = useQuery(api.dashboard.stats);
```
- Data diperbarui otomatis (realtime) setiap kali query dependent berubah — tidak perlu refetch manual.
- Sediakan Skeleton loader untuk setiap Card dan Chart saat `stats === undefined`.

### Step 5: Penanganan State
- **Error**: Alert + tombol Retry.
- **Empty**: Tampilkan nilai default `0` pada KPI Card dan grafik kosong dengan pesan "Belum ada data".
- **Responsive**: Grid KPI `grid-cols-1 sm:grid-cols-2 xl:grid-cols-4`.
- **Dark Mode**: `bg-card text-card-foreground border-border`.
