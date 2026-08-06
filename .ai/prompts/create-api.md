# AI Prompt: Create Convex API (Query & Mutation)

## Context & Purpose
Gunakan prompt ini untuk membuat API backend Convex — seluruh operasi data (CRUD) melalui Convex `query`, `mutation`, dan (jika perlu) `action`. Semua akses data melewati Convex, bukan REST.

---

## 🤖 AI Instructions

Saat membuat API backend Convex, ikuti pola berikut:

### Step 1: Query (Baca Data)
```typescript
import { query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {
    categoryId: v.optional(v.id("categories")),
    status: v.optional(v.union(v.literal("draft"), v.literal("active"))),
  },
  handler: async (ctx, args) => {
    // Filter soft-delete
    let base = ctx.db
      .query("projects")
      .filter((q) => q.eq(q.field("deletedAt"), undefined));

    // Jika ada index yang relevan, gunakan .withIndex(); sisanya filter in-memory
    if (args.categoryId) base = base.filter((q) => q.eq(q.field("categoryId"), args.categoryId));
    if (args.status) base = base.filter((q) => q.eq(q.field("status"), args.status));

    return await base.collect();
  },
});
```

### Step 2: Mutation (Tulis Data)
```typescript
import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const create = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    categoryId: v.optional(v.id("categories")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) throw new Error("Not authenticated");

    return await ctx.db.insert("communities", { ...args, createdBy: userId });
  },
});
```

### Step 3: Pola Wajib
1. **Autentikasi**: Selalu panggil `getAuthUserId(ctx)`; `throw new Error("Not authenticated")` bila `null`.
2. **RBAC**: Untuk aksi yang dibatasi peran, cek field peran user (mis. `user.role`) sebelum mutasi; jangan pernah hanya mengandalkan client.
3. **Soft Delete**: Mutation `remove` → `ctx.db.patch(id, { deletedAt: Date.now() })`, jangan `ctx.db.delete`.
4. **Validasi**: Gunakan `v.object`, `v.optional`, `v.union(v.literal(...))`; semua argumen wajib memiliki validator.
5. **Query ke data hasil insert**: `ctx.db.insert` mengembalikan id (`v.id`); gunakan `v.id("tableName")` sebagai tipe.

### Step 4: Output
Hasilkan API lengkap per entitas: `list`, `get`, `getBySlug`, `create`, `update` (gunakan `patch` dengan field optional), `remove` (soft delete).
