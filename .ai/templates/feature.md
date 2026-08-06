# Template: Feature Vertical Slice Blueprint

Template struktur lengkap untuk pembuatan fitur vertikal otonom (Vertical Slice Feature).

---

## 📁 File Structure

```text
features/[feature_name]/
├── components/
│   ├── [Feature]Table.tsx
│   └── [Feature]FormModal.tsx
├── hooks/
│   └── use-[feature].ts
├── pages/
│   └── [Feature]Page.tsx
├── schemas/
│   └── [feature].schema.ts
├── services/
│   └── [feature].service.ts
├── routes.ts
└── types.ts
```

---

## 💻 Sample Code Blueprints

### 1. `schemas/[feature].schema.ts`
```typescript
import { z } from 'zod';

export const createFeatureSchema = z.object({
  title: z.string().min(3, 'Judul minimal 3 karakter'),
  code: z.string().min(2, 'Kode minimal 2 karakter'),
  description: z.string().optional()
});

export const updateFeatureSchema = createFeatureSchema.partial();

export const queryFeatureSchema = z.object({
  page: z.coerce.number().default(1),
  pageSize: z.coerce.number().default(10),
  q: z.string().optional()
});
```

### 2. `types.ts`
```typescript
import { z } from 'zod';
import { createFeatureSchema, queryFeatureSchema } from './schemas/[feature].schema';

export type CreateFeatureDTO = z.infer<typeof createFeatureSchema>;
export type QueryFeatureDTO = z.infer<typeof queryFeatureSchema>;

export interface FeatureEntity {
  id: string;
  title: string;
  code: string;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
}
```

### 3. `routes.ts` (Hono API Route)
```typescript
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { createFeatureSchema, queryFeatureSchema } from './schemas/[feature].schema';
import { getFeatureList, createFeature } from './services/[feature].service';

const featureRoutes = new Hono();

featureRoutes.get('/', zValidator('query', queryFeatureSchema), async (c) => {
  const query = c.req.valid('query');
  const result = await getFeatureList(query);
  return c.json({
    success: true,
    message: 'Data berhasil diambil',
    data: result.items,
    meta: result.meta
  });
});

featureRoutes.post('/', zValidator('json', createFeatureSchema), async (c) => {
  const body = c.req.valid('json');
  const newItem = await createFeature(body);
  return c.json({
    success: true,
    message: 'Data berhasil dibuat',
    data: newItem
  }, 201);
});

export { featureRoutes };
```
