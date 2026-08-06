# Database Rules & Schema Standards

## Database Platform & ORM
- **Engine**: `Supabase PostgreSQL`
- **ORM**: `Drizzle ORM`
- **Migration Tool**: `drizzle-kit`

---

## 🏛️ Schema Naming & Data Type Standards

1. **Naming Convention**:
   - Nama Tabel: `snake_case`, plural (contoh: `users`, `employee_profiles`, `incoming_mails`).
   - Nama Kolom: `snake_case`, singular (contoh: `first_name`, `employee_id`, `created_at`).
   - Primary Key: Selalu gunakan `id` bertipe `uuid` (`defaultRandom()`). Dilarang menggunakan auto-increment integer ID.

2. **Mandatory Audit Columns (5 Kolom Audit Wajib)**:
   Setiap tabel transaksi bisnis WAJIB menyertakan 5 kolom berikut:
   ```typescript
   id: uuid("id").primaryKey().defaultRandom(),
   created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
   updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
   deleted_at: timestamp("deleted_at", { withTimezone: true }),
   created_by: uuid("created_by"),
   updated_by: uuid("updated_by")
   ```

3. **Foreign Keys & Indexing**:
   - Selalu deklarasikan `foreignKey` secara eksplisit dengan relasi `ON DELETE RESTRICT` atau `ON DELETE CASCADE` yang sesuai.
   - Buat `index` pada kolom yang sering dijadikan kriteria pencarian atau join (contoh: `nip`, `email`, `unit_kerja_id`, `created_at`).

4. **Soft Delete Policy**:
   - Dilarang melakukan eksekusi `DELETE FROM table`.
   - Lakukan soft delete dengan memperbarui `deleted_at = now()` dan `deleted_by = user_id`.

5. **Migrations**:
   - Setiap perubahan skema WAJIB dibuatkan file migrasi resmi via `pnpm drizzle-kit generate:pg`.
   - File migrasi disimpan di `packages/database/migrations/`.