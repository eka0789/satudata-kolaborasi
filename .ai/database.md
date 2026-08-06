# Database Rules & Schema Standards

## Database Platform
- **Engine**: `Convex Database` (document store, diakses via `ctx.db`)
- **Schema**: Didefinisikan di `src/convex/schema.ts` menggunakan validator `v`
- **Migration**: Tidak ada file migrasi SQL — perubahan schema diterapkan otomatis saat `convex dev` / `convex deploy` (Convex menangani evolusi schema)

---

## 🏛️ Schema Naming & Data Type Standards

1. **Naming Convention**:
   - Nama Table: `camelCase`, plural (contoh: `users`, `communityMembers`, `projects`).
   - Nama Kolom: `camelCase`, singular (contoh: `firstName`, `provinceId`, `createdBy`).
   - ID: selalu `v.id("table")` (Convex `Id`). Dilarang menggunakan auto-increment integer ID.

2. **Kolom Sistem Convex (Otomatis)**:
   - `_id: Id<T>` — primary key unik.
   - `_creationTime: number` — timestamp pembuatan (setara `created_at`, epoch ms).

3. **Mandatory Audit Fields (Kolom Audit Wajib)**:
   Setiap tabel transaksi bisnis WAJIB menyertakan kolom berikut:
   ```typescript
   createdBy: v.id("users"),
   deletedAt: v.optional(v.number()) // soft-delete timestamp (epoch ms)
   ```

4. **Indexing**:
   - Deklarasikan `index("by_<field>")` pada kolom yang sering dijadikan kriteria pencarian/join (contoh: `by_slug`, `by_createdBy`, `by_provinceId`).
   - Gunakan `searchIndex(...)` untuk pencarian teks bila diperlukan (contoh: `search_name` pada `communities`).

5. **Soft Delete Policy**:
   - Dilarang menghapus permanen data bisnis tanpa persetujuan eksplisit.
   - Lakukan soft delete dengan `ctx.db.patch(id, { deletedAt: Date.now() })`.
   - Semua query list/detail WAJIB mengecualikan dokumen yang memiliki `deletedAt`.

6. **Relasi**:
   - Gunakan `v.id("table")` sebagai foreign key; resolusi data terkait dilakukan dengan `ctx.db.get(...)` dalam fungsi Convex.
