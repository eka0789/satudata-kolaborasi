# Template: TanStack Query Custom Hooks

Boilerplate Custom React Hook menggunakan TanStack Query v5 (`useQuery` & `useMutation`) lengkap dengan toast notifications dan cache invalidation.

---

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@my-starter-kit-gov/ui/use-toast';
import { fetchEmployees, createEmployee, updateEmployee, deleteEmployee } from '../services/employee-api';
import type { QueryEmployeeDTO, CreateEmployeeDTO, UpdateEmployeeDTO } from '../types';

export const EMPLOYEE_QUERY_KEY = ['employees'];

// Hook: Fetch Employee List
export const useEmployeeList = (params: QueryEmployeeDTO) => {
  return useQuery({
    queryKey: [...EMPLOYEE_QUERY_KEY, params],
    queryFn: () => fetchEmployees(params),
    staleTime: 1000 * 60 * 5, // Cache valid for 5 minutes
  });
};

// Hook: Create Employee Mutation
export const useCreateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateEmployeeDTO) => createEmployee(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: EMPLOYEE_QUERY_KEY });
      toast({
        title: 'Berhasil',
        description: `Pegawai ${data.name} berhasil ditambahkan.`
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Gagal Menambah Pegawai',
        description: error.message || 'Terjadi kesalahan sistem.'
      });
    }
  });
};

// Hook: Soft Delete Employee Mutation
export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteEmployee(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EMPLOYEE_QUERY_KEY });
      toast({
        title: 'Penghapusan Berhasil',
        description: 'Data pegawai telah di-soft delete.'
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Gagal Menghapus Data',
        description: error.message
      });
    }
  });
};
```
