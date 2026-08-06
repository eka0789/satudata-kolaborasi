# Template: React Hook Form + Zod Form Component

Boilerplate Komponen Modal Form menggunakan React Hook Form, Zod validation resolver, shadcn/ui Form primitives, dan Toast feedback.

---

```tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@my-starter-kit-gov/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@my-starter-kit-gov/ui/form';
import { Input } from '@my-starter-kit-gov/ui/input';
import { Button } from '@my-starter-kit-gov/ui/button';
import { Loader2 } from 'lucide-react';
import { useCreateEmployee } from '../hooks/use-employee';

const formSchema = z.object({
  nip: z.string().length(18, 'NIP harus persis 18 digit angka'),
  name: z.string().min(3, 'Nama minimal 3 karakter'),
  email: z.string().email('Format email tidak valid'),
  department_id: z.string().min(1, 'Pilih unit kerja')
});

type FormValues = z.infer<typeof formSchema>;

interface EmployeeFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const EmployeeFormModal: React.FC<EmployeeFormModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const createMutation = useCreateEmployee();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nip: '',
      name: '',
      email: '',
      department_id: ''
    }
  });

  const onSubmit = async (values: FormValues) => {
    try {
      await createMutation.mutateAsync(values);
      form.reset();
      onSuccess();
    } catch (error) {
      console.error('Submit error:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Tambah Data Pegawai</DialogTitle>
          <DialogDescription>
            Isikan formulir di bawah ini untuk menambahkan data pegawai ASN/Non-ASN baru.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NIP (18 Digit)</FormLabel>
                  <FormControl>
                    <Input placeholder="199001012015011001" maxLength={18} {...field} />
                  </FormControl>
                  <FormDescription>Format NIP tanpa spasi.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input placeholder="Nama Pegawai beserta Gelar" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Instansi</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="pegawai@instansi.go.id" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Batal
              </Button>
              <Button type="submit" disabled={createMutation.isPending}>
                {createMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Simpan Pegawai
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
```
