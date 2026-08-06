# AI Prompt: Create Feature (Vertical Slice)

## Context & Purpose
Gunakan prompt ini untuk membuat Fitur (Vertical Slice) baru dalam satu domain modul — mencakup backend Convex (schema + query/mutation), validasi `v.object`, dan frontend React (pages/components/hooks).

---

## 🤖 AI Instructions

Saat membuat fitur baru, ikuti pola Vertical Slice berikut:

### Step 1: Definisikan Data Model di `src/convex/schema.ts`
Tambah/ubah table di schema Convex dengan validator `v`:
```typescript
export const myFeature = defineTable({
  name: v.string(),
  description: v.optional(v.string()),
  ownerId: v.optional(v.id("users")),
  createdBy: v.id("users"),
  deletedAt: v.optional(v.number()),
})
  .index("by_ownerId", ["ownerId"])
  .index("by_createdAt", ["_creationTime"]),
```
- Wajib: `createdBy: v.id("users")` + `deletedAt: v.optional(v.number())`.
- Gunakan `v.union(v.literal(...))` untuk enum status (contoh: `"draft" | "active" | "completed"`).
- Jangan gunakan kolom `created_at`/`updated_at` — Convex sudah menyediakan `_creationTime`.

### Step 2: Buat Backend `src/convex/[feature].ts`
```typescript
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

// Semua query/mutation wajib: v.object validator + getAuthUserId
export const create = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) throw new Error("Not authenticated");
    return await ctx.db.insert("myFeature", { ...args, createdBy: userId });
  },
});
```
- Gunakan `v.optional()` pada argumen yang tidak wajib.
- Filter soft-delete di semua `list`/`get`/`getBySlug` (`.filter(q => q.eq(q.field("deletedAt"), undefined))`).

### Step 3: Buat Frontend Fitur di `src/features/[feature]/`
1. **`pages/`**: Halaman List & Halaman Detail/Form.
2. **`components/`:**
   - Data table / card grid.
   - Form (React Hook Form + Zod) untuk create/update.
3. **`hooks/`:** Custom hook pembungkus `useQuery(api.[feature].list)` / `useMutation(api.[feature].create)`.
4. **Import client**: `import { api } from "@/convex/_generated/api";`

### Step 4: Penanganan 5 State UI Wajib
1. ⏳ **Loading State**: Skeleton loader.
2. ❌ **Error State**: Alert + tombol Retry.
3. 📭 **Empty State**: Ilustrasi/icon + "Belum ada data" + tombol aksi.
4. 📱 **Responsive**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`.
5. 🌙 **Dark Mode**: `bg-background text-foreground border-border`.

### Step 5: Verifikasi
- Jalankan `npm run typecheck`, `npm run lint`, `npm run build`.
- Pastikan `npx convex dev` berjalan tanpa error schema.
