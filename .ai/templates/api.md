# Template: Hono REST API Route & Handler

Boilerplate kode REST API Hono lengkap dengan Autentikasi JWT, RBAC Permission, Zod Validator, dan Drizzle Query Service.

---

```typescript
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { authMiddleware } from '@/middleware/auth';
import { requirePermission } from '@/middleware/rbac';
import { z } from 'zod';
import { db } from '@my-starter-kit-gov/database';
import { employeeProfiles } from '@my-starter-kit-gov/database/schema';
import { eq, isNull, like, or, count } from 'drizzle-orm';

// 1. Zod Validation Schemas
const createEmployeeSchema = z.object({
  nip: z.string().length(18, 'NIP harus persis 18 digit angka'),
  name: z.string().min(3, 'Nama minimal 3 karakter'),
  email: z.string().email('Format email tidak valid'),
  department_id: z.string().uuid('ID Departemen tidak valid')
});

const queryEmployeeSchema = z.object({
  page: z.coerce.number().default(1),
  pageSize: z.coerce.number().default(10),
  q: z.string().optional()
});

// 2. Hono Router Setup
const employeeRoutes = new Hono();

// Secure all routes with Auth Middleware
employeeRoutes.use('*', authMiddleware);

// GET /api/v1/employees (List with Pagination & Search)
employeeRoutes.get(
  '/',
  requirePermission('employee.read'),
  zValidator('query', queryEmployeeSchema),
  async (c) => {
    const { page, pageSize, q } = c.req.valid('query');
    const offset = (page - 1) * pageSize;

    const whereConditions = isNull(employeeProfiles.deletedAt);
    
    // Add search condition if query exists
    const finalWhere = q
      ? or(
          like(employeeProfiles.nip, `%${q}%`),
          like(employeeProfiles.name, `%${q}%`)
        )
      : whereConditions;

    const [items, totalResult] = await Promise.all([
      db.select()
        .from(employeeProfiles)
        .where(finalWhere)
        .limit(pageSize)
        .offset(offset),
      db.select({ total: count() })
        .from(employeeProfiles)
        .where(finalWhere)
    ]);

    const total = totalResult[0]?.total || 0;

    return c.json({
      success: true,
      message: 'Daftar pegawai berhasil diambil',
      data: items,
      meta: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize)
      }
    });
  }
);

// POST /api/v1/employees (Create Item)
employeeRoutes.post(
  '/',
  requirePermission('employee.create'),
  zValidator('json', createEmployeeSchema),
  async (c) => {
    const body = c.req.valid('json');
    const currentUser = c.get('user');

    const [newItem] = await db.insert(employeeProfiles).values({
      ...body,
      createdBy: currentUser.id,
      updatedBy: currentUser.id
    }).returning();

    return c.json({
      success: true,
      message: 'Pegawai berhasil ditambahkan',
      data: newItem
    }, 201);
  }
);

export { employeeRoutes };
```
