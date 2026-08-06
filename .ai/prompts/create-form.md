# AI Prompt: Create Complex Form Component

## Context & Purpose
Gunakan prompt ini untuk membuat Komponen Form Enterprise menggunakan React Hook Form, validasi Zod schema, shadcn/ui Form controls, serta penanganan feedback error dan loading state penyerahan data (*submitting*).

---

## 🤖 AI Instructions

Saat membuat Komponen Form, jalankan panduan berikut:

### Step 1: Definisikan Skema Zod
Buat skema validasi Zod di berkas `schema.ts` yang menangani aturan validasi instansi pemerintah:
- Validasi wajib diisi (`.min(1, 'Wajib diisi')`).
- Validasi format khusus (Email, NIP 18 digit, NIK 16 digit, Nomor HP, URL).
- Validasi berkas lampiran (Maksimal ukuran MB, tipe MIME PDF/JPG/PNG).

### Step 2: Gunakan `useForm` dari React Hook Form
Hubungkan skema Zod ke `useForm` via `@hookform/resolvers/zod`:
```typescript
const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: { ... }
});
```

### Step 3: Implementasi Komponen Input UI shadcn
Gunakan `<Form>`, `<FormField>`, `<FormItem>`, `<FormLabel>`, `<FormControl>`, `<FormDescription>`, `<FormMessage>` untuk setiap input:
- Input Teks / Email / Angka.
- Select Dropdown (dengan data dinamis).
- Date Picker (Calendar Popover).
- Textarea untuk deskripsi/catatan.
- Input File / File Upload Dropzone.

### Step 4: Penanganan Feedback & Submitting
- Nonaktifkan tombol Submit dan tampilkan Spinner Loader saat `form.formState.isSubmitting === true`.
- Tampilkan Toast Notification Sukses saat penyerahan data berhasil.
- Tampilkan Error Message inline pada input yang bermasalah.
- Sediakan Tombol Batal / Reset.
