# Template: Enterprise TanStack Data Table Component

Boilerplate Komponen Data Table High-Performance menggunakan TanStack Table v8, shadcn/ui Table, Lucide Icons, Status Badges, dan Action Dropdown Menu.

---

```tsx
import React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState
} from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@my-starter-kit-gov/ui/table';
import { Button } from '@my-starter-kit-gov/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@my-starter-kit-gov/ui/dropdown-menu';
import { MoreHorizontal, ArrowUpDown, Eye, Edit, Trash2 } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

export interface EmployeeData {
  id: string;
  nip: string;
  name: string;
  email: string;
  departmentName: string;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
}

interface EmployeeTableProps {
  data: EmployeeData[];
  onRefresh: () => void;
}

export const EmployeeTable: React.FC<EmployeeTableProps> = ({ data, onRefresh }) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const columns: ColumnDef<EmployeeData>[] = [
    {
      accessorKey: 'nip',
      header: 'NIP',
      cell: ({ row }) => <span className="font-mono text-xs">{row.getValue('nip')}</span>
    },
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="p-0 hover:bg-transparent"
        >
          Nama Lengkap
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <span className="font-medium">{row.getValue('name')}</span>
    },
    {
      accessorKey: 'email',
      header: 'Email'
    },
    {
      accessorKey: 'departmentName',
      header: 'Unit Kerja'
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => <StatusBadge status={row.getValue('status')} />
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const item = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Aksi</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => console.log('View', item.id)}>
                <Eye className="mr-2 h-4 w-4 text-blue-500" /> Lihat Detail
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => console.log('Edit', item.id)}>
                <Edit className="mr-2 h-4 w-4 text-amber-500" /> Edit Data
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => console.log('Delete', item.id)}>
                <Trash2 className="mr-2 h-4 w-4 text-rose-500" /> Hapus Data
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }
    }
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: { sorting }
  });

  return (
    <div className="space-y-4">
      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Tidak ada data.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Sebelumnya
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Selanjutnya
        </Button>
      </div>
    </div>
  );
};
```
