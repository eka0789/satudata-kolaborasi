# Template: Drizzle ORM Table Definition & Migration Schema

Boilerplate definisi tabel Drizzle ORM Supabase PostgreSQL dengan 5 Kolom Audit Wajib (`created_at`, `updated_at`, `deleted_at`, `created_by`, `updated_by`) dan Panduan RLS.

---

```typescript
import { pgTable, uuid, varchar, text, timestamp, index } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Audit Columns Helper
export const auditColumns = {
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
  createdBy: uuid('created_by'),
  updatedBy: uuid('updated_by'),
};

// 1. Table Schema: Employee Profiles
export const employeeProfiles = pgTable(
  'employee_profiles',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    nip: varchar('nip', { length: 18 }).notNull().unique(),
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    departmentId: uuid('department_id').notNull(),
    status: varchar('status', { length: 20 }).default('active').notNull(),
    ...auditColumns,
  },
  (table) => ({
    nipIdx: index('idx_employee_nip').on(table.nip),
    deptIdx: index('idx_employee_dept').on(table.departmentId),
    deletedIdx: index('idx_employee_deleted').on(table.deletedAt),
  })
);

// 2. Table Schema: Departments (Unit Kerja)
export const departments = pgTable(
  'departments',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    code: varchar('code', { length: 50 }).notNull().unique(),
    name: varchar('name', { length: 255 }).notNull(),
    parentId: uuid('parent_id'),
    ...auditColumns,
  }
);

// 3. Relational Mapping
export const employeeProfilesRelations = relations(employeeProfiles, ({ one }) => ({
  department: one(departments, {
    fields: [employeeProfiles.departmentId],
    references: [departments.id],
  }),
}));

/* 
  Supabase Row Level Security (RLS) SQL Migration Helper Guidance:

  -- Enable RLS
  ALTER TABLE employee_profiles ENABLE ROW LEVEL SECURITY;

  -- Policy: Only authenticated users can read non-deleted items
  CREATE POLICY "Read Active Employees"
    ON employee_profiles FOR SELECT
    TO authenticated
    USING (deleted_at IS NULL);
*/
```
