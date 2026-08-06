# Template: Module Structure Blueprint

Gunakan template cetak biru ini untuk menginisialisasi struktur folder dan pengorganisasian modul bisnis enterprise baru.

---

## 📁 Backend Module Structure (`apps/api/src/features/[module_name]/`)

```text
[module_name]/
├── [sub_feature_1]/
│   ├── routes.ts
│   ├── service.ts
│   ├── schema.ts
│   └── types.ts
├── [sub_feature_2]/
│   ├── routes.ts
│   ├── service.ts
│   ├── schema.ts
│   └── types.ts
├── README.md
└── index.ts
```

### Example Backend Module Index (`apps/api/src/features/[module_name]/index.ts`)

```typescript
import { Hono } from 'hono';
import { subFeature1Routes } from './[sub_feature_1]/routes';
import { subFeature2Routes } from './[sub_feature_2]/routes';

const moduleRouter = new Hono();

// Mount Sub-Features
moduleRouter.route('/[sub-feature-1]', subFeature1Routes);
moduleRouter.route('/[sub-feature-2]', subFeature2Routes);

export { moduleRouter };
```

---

## 📁 Frontend Module Structure (`apps/web/src/features/[module_name]/`)

```text
[module_name]/
├── components/
│   ├── [Module]Header.tsx
│   └── [Module]NavTabs.tsx
├── pages/
│   ├── [SubFeature1]Page.tsx
│   └── [SubFeature2]Page.tsx
├── README.md
└── index.ts
```

### Example Frontend Module Index (`apps/web/src/features/[module_name]/index.ts`)

```typescript
export * from './pages/[SubFeature1]Page';
export * from './pages/[SubFeature2]Page';
```
