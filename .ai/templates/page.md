# Template: Enterprise React Page Component

Template halaman React enterprise lengkap dengan Header, Breadcrumb, Search Bar, Filter, Button Tambah, Loading Skeleton, Error Alert, Empty State, & Dark Mode support.

---

```tsx
import React, { useState } from 'react';
import { Plus, Search, RefreshCw, AlertCircle, Inbox } from 'lucide-react';
import { Button } from '@my-starter-kit-gov/ui/button';
import { Input } from '@my-starter-kit-gov/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@my-starter-kit-gov/ui/card';
import { Skeleton } from '@my-starter-kit-gov/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@my-starter-kit-gov/ui/alert';
import { useEmployeeList } from '../hooks/use-employee';
import { EmployeeTable } from '../components/EmployeeTable';
import { EmployeeFormModal } from '../components/EmployeeFormModal';

export const EmployeePage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError, error, refetch } = useEmployeeList({
    page,
    pageSize: 10,
    q: search
  });

  return (
    <div className="space-y-6 p-6">
      {/* 1. Page Header & Breadcrumb */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <nav className="text-xs text-muted-foreground mb-1">
            <span>Beranda</span> &gt; <span>Kepegawaian</span> &gt; <span className="text-foreground font-medium">Daftar Pegawai</span>
          </nav>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Daftar Pegawai (SIMPEG)</h1>
          <p className="text-sm text-muted-foreground">Kelola master data pegawai ASN dan Non-ASN instansi.</p>
        </div>

        <Button onClick={() => setIsModalOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" /> Tambah Pegawai
        </Button>
      </div>

      {/* 2. Search & Filter Bar */}
      <Card>
        <CardContent className="p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari NIP atau Nama Pegawai..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          <Button variant="outline" onClick={() => refetch()} className="gap-2 w-full md:w-auto">
            <RefreshCw className="h-4 w-4" /> Segarkan
          </Button>
        </CardContent>
      </Card>

      {/* 3. State Handlers */}
      {isLoading ? (
        <Card className="p-6 space-y-4">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </Card>
      ) : isError ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Gagal Memuat Data</AlertTitle>
          <AlertDescription className="mt-2 flex items-center gap-4">
            <span>{error?.message || 'Terjadi kesalahan saat menghubungi server.'}</span>
            <Button variant="outline" size="sm" onClick={() => refetch()}>Coba Lagi</Button>
          </AlertDescription>
        </Alert>
      ) : !data || data.length === 0 ? (
        <Card className="p-12 text-center flex flex-col items-center justify-center">
          <Inbox className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold">Belum Ada Data Pegawai</h3>
          <p className="text-sm text-muted-foreground max-w-sm mt-1 mb-4">
            Tidak ada pegawai yang sesuai dengan pencarian Anda. Silakan tambah data baru.
          </p>
          <Button onClick={() => setIsModalOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" /> Tambah Pegawai Pertama
          </Button>
        </Card>
      ) : (
        /* 4. Main Table Content */
        <EmployeeTable data={data} onRefresh={refetch} />
      )}

      {/* 5. Form Modal */}
      <EmployeeFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          setIsModalOpen(false);
          refetch();
        }}
      />
    </div>
  );
};
```
