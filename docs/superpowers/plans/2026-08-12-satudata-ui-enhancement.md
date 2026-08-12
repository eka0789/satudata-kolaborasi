# SatuData Kolaborasi — UI/UX Enhancement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enhance all pages of SatuData Kolaborasi with a unified Modern-Inspiratif design system — refined colors, new typography, reusable components, micro-interactions, dark mode parity.

**Architecture:** Single-page React app with React Router v7, Convex backend, Tailwind v4 + shadcn/ui. Enhancement is CSS/component-only — no backend changes, no new routes.

**Tech Stack:** React 19, TypeScript, Tailwind CSS v4, shadcn/ui (new-york, neutral), Framer Motion, Lucide Icons, Outfit + Work Sans (Google Fonts)

## Global Constraints

- All UI copy in Bahasa Indonesia (except technical terms)
- `cursor-pointer` on all clickable elements
- `tracking-tight font-bold` for page titles
- No nested cards, no heavy shadows
- Framer Motion animations: 200-300ms, `easeOut`, respect `prefers-reduced-motion`
- `Loader2` with `animate-spin` for loading spinners
- Sonner for toasts, Dialogs over new pages for CRUD
- Max content width: `max-w-6xl` (dashboard), `max-w-7xl` (landing)
- Responsive: 320px, 768px, 1024px, 1280px, 1536px
- Every page supports light + dark mode via semantic Tailwind classes
- WCAG AA+ contrast, focus rings, keyboard nav

---

## File Structure

### Modified Files

| File | Responsibility |
|------|---------------|
| `src/index.css` | Theme tokens, font imports, refined colors |
| `src/components/dashboard/sidebar.tsx` | Sidebar with refined styling |
| `src/components/dashboard/layout.tsx` | Dashboard shell layout |
| `src/pages/Landing.tsx` | Landing page — refined dark theme, new sections |
| `src/pages/Auth.tsx` | Auth page — enhanced card, background |
| `src/pages/Dashboard.tsx` | Dashboard — StatCard, refined sections |
| `src/pages/Proyek.tsx` | Project list — enhanced cards, hover, search |
| `src/pages/Kegiatan.tsx` | Events list — enhanced cards, date badges |
| `src/pages/Komunitas.tsx` | Communities grid — enhanced cards |
| `src/pages/Pencarian.tsx` | Search — enhanced bar, tabs, results |
| `src/pages/Notifikasi.tsx` | Notifications — grouped by date, icons |
| `src/pages/Pengaturan.tsx` | Settings — sectioned cards, 2-col layout |
| `src/pages/Admin.tsx` | Admin — enhanced stat cards, quick actions |
| `src/pages/NotFound.tsx` | 404 — illustration, Bahasa Indonesia, action |

### Created Files

| File | Responsibility |
|------|---------------|
| `src/components/ui/stat-card.tsx` | Reusable stat card with icon + trend |
| `src/components/ui/page-header.tsx` | Reusable page header with breadcrumb |
| `src/components/ui/status-badge.tsx` | Reusable status badge with soft colors |
| `src/components/ui/empty-state.tsx` | Standardized empty state component |
| `src/components/ui/feature-card.tsx` | Landing page feature card (reusable) |

---

### Task 1: Design System — Fonts & Theme Tokens

**Files:**
- Modify: `src/index.css`

**Interfaces:**
- Consumes: nothing
- Produces: CSS custom properties for blue-primary, teal-accent, Outfit + Work Sans fonts

- [ ] **Step 1: Add Google Fonts import**

Add at the top of `src/index.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Work+Sans:wght@300;400;500;600;700&display=swap');
```

- [ ] **Step 2: Refine light mode CSS variables**

Replace `:root` block with blue-primary and teal-accent values:

```css
:root {
  --radius: 0.625rem;
  --background: oklch(0.985 0.003 247.86);
  --foreground: oklch(0.145 0.014 247.86);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0.014 247.86);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0.014 247.86);
  --primary: oklch(0.546 0.245 262.88);
  --primary-foreground: oklch(0.985 0.002 247.86);
  --secondary: oklch(0.97 0.004 247.86);
  --secondary-foreground: oklch(0.205 0.014 247.86);
  --muted: oklch(0.97 0.004 247.86);
  --muted-foreground: oklch(0.556 0.014 247.86);
  --accent: oklch(0.7 0.14 182.5);
  --accent-foreground: oklch(0.985 0.002 247.86);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.985 0 0);
  --border: oklch(0.922 0.007 247.86);
  --input: oklch(0.922 0.007 247.86);
  --ring: oklch(0.708 0.014 247.86);
  --chart-1: oklch(0.546 0.245 262.88);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.985 0.002 247.86);
  --sidebar-foreground: oklch(0.145 0.014 247.86);
  --sidebar-primary: oklch(0.546 0.245 262.88);
  --sidebar-primary-foreground: oklch(0.985 0.002 247.86);
  --sidebar-accent: oklch(0.97 0.004 247.86);
  --sidebar-accent-foreground: oklch(0.205 0.014 247.86);
  --sidebar-border: oklch(0.922 0.007 247.86);
  --sidebar-ring: oklch(0.708 0.014 247.86);
}
```

- [ ] **Step 3: Refine dark mode CSS variables**

Replace `.dark` block:

```css
.dark {
  --background: oklch(0.145 0.014 247.86);
  --foreground: oklch(0.985 0.002 247.86);
  --card: oklch(0.205 0.014 247.86);
  --card-foreground: oklch(0.985 0.002 247.86);
  --popover: oklch(0.205 0.014 247.86);
  --popover-foreground: oklch(0.985 0.002 247.86);
  --primary: oklch(0.7 0.18 262.88);
  --primary-foreground: oklch(0.145 0.014 247.86);
  --secondary: oklch(0.269 0.014 247.86);
  --secondary-foreground: oklch(0.985 0.002 247.86);
  --muted: oklch(0.269 0.014 247.86);
  --muted-foreground: oklch(0.708 0.014 247.86);
  --accent: oklch(0.6 0.14 182.5);
  --accent-foreground: oklch(0.985 0.002 247.86);
  --destructive: oklch(0.704 0.191 22.216);
  --destructive-foreground: oklch(0.985 0 0);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0.014 247.86);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0.014 247.86);
  --sidebar-foreground: oklch(0.985 0.002 247.86);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0.002 247.86);
  --sidebar-accent: oklch(0.269 0.014 247.86);
  --sidebar-accent-foreground: oklch(0.985 0.002 247.86);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.556 0.014 247.86);
}
```

- [ ] **Step 4: Add font families to `@theme inline`**

Inside the `@theme inline` block, add:
```css
--font-sans: 'Work Sans', 'sans-serif';
--font-heading: 'Outfit', 'sans-serif';
```

- [ ] **Step 5: Set body font family in base layer**

Replace the `body` rule in the `@layer base` block:
```css
body {
  @apply bg-background text-foreground font-sans;
}
```

- [ ] **Step 6: Run build to verify no errors**

Run: `npx tsc -b` and `npm run build` (or equivalent)
Expected: Clean compilation, no type errors

- [ ] **Step 7: Commit**

```bash
git add src/index.css
git commit -m "feat: refine design system with blue-primary, teal-accent, Outfit + Work Sans fonts"
```

---

### Task 2: Reusable Components

**Files:**
- Create: `src/components/ui/stat-card.tsx`
- Create: `src/components/ui/page-header.tsx`
- Create: `src/components/ui/status-badge.tsx`
- Create: `src/components/ui/empty-state.tsx`
- Create: `src/components/ui/feature-card.tsx`

**Interfaces:**
- Consumes: CSS variables from Task 1, shadcn primitives (Card, Badge, Button)
- Produces: 5 reusable components used by all page tasks

- [ ] **Step 1: Create `stat-card.tsx`**

```tsx
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { type LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  iconColor?: string;
  trend?: { value: number; positive: boolean };
  description?: string;
  formatter?: (value: number) => string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  iconColor = "bg-primary/10 text-primary",
  trend,
  description,
  formatter,
}: StatCardProps) {
  return (
    <Card className="border-border/70 shadow-none transition-shadow duration-200 hover:shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className={cn("flex size-9 items-center justify-center rounded-lg", iconColor)}>
            <Icon className="size-4" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <p className="text-2xl font-bold tracking-tight">
            {formatter ? formatter(Number(value)) : value}
          </p>
          {trend && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 text-xs font-medium",
                trend.positive ? "text-emerald-600" : "text-rose-600",
              )}
            >
              {trend.positive ? "↑" : "↓"} {trend.value}%
            </span>
          )}
        </div>
        {description && (
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}
```

- [ ] **Step 2: Create `page-header.tsx`**

```tsx
import { type ReactNode } from "react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  action?: ReactNode;
}

export function PageHeader({ title, description, breadcrumbs, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
      <div className="space-y-1">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
            {breadcrumbs.map((crumb, i) => (
              <span key={crumb.label} className="flex items-center gap-1.5">
                {i > 0 && <span>/</span>}
                {crumb.href ? (
                  <a href={crumb.href} className="hover:text-foreground transition-colors">
                    {crumb.label}
                  </a>
                ) : (
                  <span className="text-foreground">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {action && <div className="mt-2 sm:mt-0 shrink-0">{action}</div>}
    </div>
  );
}
```

- [ ] **Step 3: Create `status-badge.tsx`**

```tsx
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const STATUS_STYLES = {
  active: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-emerald-500/20",
  draft: "bg-muted text-muted-foreground ring-border",
  completed: "bg-blue-500/10 text-blue-600 dark:text-blue-400 ring-blue-500/20",
  archived: "bg-slate-500/10 text-slate-600 dark:text-slate-400 ring-slate-500/20",
  upcoming: "bg-sky-500/10 text-sky-600 dark:text-sky-400 ring-sky-500/20",
  ongoing: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-emerald-500/20",
  ended: "bg-muted text-muted-foreground ring-border",
  cancelled: "bg-rose-500/10 text-rose-600 dark:text-rose-400 ring-rose-500/20",
  featured: "bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-amber-500/20",
} as const;

type StatusKey = keyof typeof STATUS_STYLES;

interface StatusBadgeProps {
  status: StatusKey;
  label: string;
  dot?: boolean;
}

export function StatusBadge({ status, label, dot }: StatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn("shrink-0 text-[10px] ring-1 font-medium", STATUS_STYLES[status])}
    >
      {dot && (
        <span className={cn("mr-1 size-1.5 rounded-full", STATUS_STYLES[status].replace(/bg-|text-|ring-/g, "").trim())} />
      )}
      {label}
    </Badge>
  );
}
```

- [ ] **Step 4: Create `empty-state.tsx`**

```tsx
import { type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <Card className="border-dashed border-border/70 shadow-none">
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-muted">
          <Icon className="size-5 text-muted-foreground" />
        </div>
        <p className="mt-4 font-medium text-foreground">{title}</p>
        <p className="mt-1 text-sm text-muted-foreground max-w-sm">{description}</p>
        {action && (
          <Button variant="outline" size="sm" className="mt-4 cursor-pointer gap-1.5" onClick={action.onClick}>
            {action.label}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
```

- [ ] **Step 5: Create `feature-card.tsx`**

```tsx
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  iconColor?: string;
  title: string;
  description: string;
  index?: number;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export function FeatureCard({
  icon: Icon,
  iconColor = "from-primary to-blue-400",
  title,
  description,
  index = 0,
}: FeatureCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
    >
      <div
        className={cn(
          "inline-flex size-11 items-center justify-center rounded-xl bg-gradient-to-br text-sm font-bold text-white shadow-md",
          iconColor,
        )}
      >
        <Icon className="size-5" />
      </div>
      <h3 className="mt-4 text-lg font-semibold tracking-tight text-slate-900 transition-colors group-hover:text-primary">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </motion.div>
  );
}
```

- [ ] **Step 6: Commit**

```bash
git add src/components/ui/stat-card.tsx src/components/ui/page-header.tsx src/components/ui/status-badge.tsx src/components/ui/empty-state.tsx src/components/ui/feature-card.tsx
git commit -m "feat: add reusable UI components — StatCard, PageHeader, StatusBadge, EmptyState, FeatureCard"
```

---

### Task 3: Dashboard Sidebar Refinement

**Files:**
- Modify: `src/components/dashboard/sidebar.tsx`

**Interfaces:**
- Consumes: nothing
- Produces: Refined sidebar with brand colors, hover states, active indicator

- [ ] **Step 1: Update sidebar style**

Replace the `isActive` link className in `sidebar.tsx` with refined colors:
```tsx
className={cn(
  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
  isActive
    ? "bg-primary/10 text-primary"
    : "text-muted-foreground hover:bg-muted hover:text-foreground",
)}
```

Add a left-border active indicator by adding inside the Link when active:
```tsx
{isActive && (
  <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-primary" />
)}
```

Make the Link wrapper `relative` in the non-active className:
```tsx
className={cn(
  "relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
  ...
)}
```

- [ ] **Step 2: Update logo area brand color**

Change `text-indigo-500` to `text-primary` in the logo text span at line 88.

- [ ] **Step 3: Run build to verify**

Run: `npx tsc -b`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/components/dashboard/sidebar.tsx
git commit -m "feat: refine sidebar with primary color active indicator and hover states"
```

---

### Task 4: Dashboard Layout Refinement

**Files:**
- Modify: `src/components/dashboard/layout.tsx`

- [ ] **Step 1: Update mobile header brand color**

Change `text-indigo-500` to `text-primary` in the logo text at line 33.

- [ ] **Step 2: Commit**

```bash
git add src/components/dashboard/layout.tsx
git commit -m "feat: update dashboard layout brand color to primary"
```

---

### Task 5: Landing Page — Refined Design

**Files:**
- Modify: `src/pages/Landing.tsx`

**Interfaces:**
- Consumes: FeatureCard, StatCard, StatusBadge from Task 2
- Produces: Refined landing page with consistent brand colors, new sections

- [ ] **Step 1: Update brand colors throughout**

Replace all `text-indigo-*` and `bg-indigo-*` classes with `text-primary` / `bg-primary` equivalents:
- `text-indigo-400` → `text-primary`
- `text-indigo-500` → `text-primary`
- `bg-indigo-500` → `bg-primary`
- `bg-indigo-600/25` → `bg-primary/25`
- `hover:bg-indigo-400` → `hover:bg-primary/90`
- `shadow-indigo-500/25` → `shadow-primary/25`
- `hover:border-indigo-200` → `hover:border-primary/30`
- `hover:shadow-indigo-500/10` → `hover:shadow-primary/10`
- `hover:bg-indigo-50/30` → `hover:bg-primary/5`
- `hover:text-indigo-600` → `hover:text-primary`
- `from-indigo-500 to-violet-500` → `from-primary to-blue-500`
- `from-indigo-300 via-sky-300 to-emerald-300` → `from-primary/80 via-sky-300 to-emerald-300`

Replace `from-amber-500 to-orange-500` (event gradient) → `from-accent to-teal-500`

- [ ] **Step 2: Add "How It Works" section**

Add after `StatsBand` and before `FeaturedProjects`:
```tsx
function HowItWorks() {
  return (
    <section className="scroll-mt-24 px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto max-w-7xl"
      >
        <SectionHeading
          eyebrow="Cara Kerja"
          title="Mulai kolaborasi dalam tiga langkah"
          description="Dari bergabung hingga berkontribusi — semua bisa dilakukan dalam hitungan menit."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {[
            {
              icon: Users,
              color: "from-primary to-blue-500",
              title: "1. Bergabung",
              description: "Buat akun sebagai individu, komunitas, atau institusi. Gratis dan tanpa komitmen.",
            },
            {
              icon: FolderKanban,
              color: "from-accent to-teal-500",
              title: "2. Jelajahi & Buat",
              description: "Temukan proyek data atau buat inisiatif baru. Ajak kolaborator dari berbagai daerah.",
            },
            {
              icon: HandHeart,
              color: "from-amber-500 to-orange-500",
              title: "3. Berkontribusi",
              description: "Bagikan data, ikuti kegiatan, dan bangun dampak nyata untuk Indonesia.",
            },
          ].map((item, i) => (
            <FeatureCard key={item.title} {...item} index={i} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
```

Import `HandHeart` from lucide-react at the top.

- [ ] **Step 3: Update CTA section brand colors**

Replace `bg-indigo-500` → `bg-primary`, `shadow-indigo-500/30` → `shadow-primary/30`, `hover:bg-indigo-400` → `hover:bg-primary/90`, `text-indigo-300` → `text-primary/80`, `from-indigo-300 via-sky-300 to-emerald-300` → `from-primary/80 via-sky-300 to-emerald-300`

- [ ] **Step 4: Update Footer brand colors**

Replace `text-indigo-500` → `text-primary` if present.

- [ ] **Step 5: Add HowItWorks to the page render**

In the `Landing` component's `<main>` section, add `<HowItWorks />` between `StatsBand` and `FeaturedProjects`.

- [ ] **Step 6: Run build to verify**

Run: `npx tsc -b`
Expected: No errors

- [ ] **Step 7: Commit**

```bash
git add src/pages/Landing.tsx
git commit -m "feat: refine landing page with brand colors and new How It Works section"
```

---

### Task 6: Auth Page Enhancement

**Files:**
- Modify: `src/pages/Auth.tsx`

- [ ] **Step 1: Add background gradient and centered layout**

Wrap the auth card area with a subtle gradient background. Replace the outer `div className="min-h-screen flex flex-col"` with:
```tsx
<div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
```

- [ ] **Step 2: Update card styling**

Add `shadow-lg` and `border-primary/10` to the Card:
```tsx
<Card className="min-w-[350px] pb-0 border shadow-lg border-primary/10">
```

- [ ] **Step 3: Update brand colors**

Replace `text-indigo-500` with `text-primary` in the logo area if present.

- [ ] **Step 4: Commit**

```bash
git add src/pages/Auth.tsx
git commit -m "feat: enhance auth page with gradient background and refined card styling"
```

---

### Task 7: Dashboard Page Enhancement

**Files:**
- Modify: `src/pages/Dashboard.tsx`

**Interfaces:**
- Consumes: StatCard, PageHeader from Task 2
- Produces: Enhanced dashboard with StatCards, refined sections

- [ ] **Step 1: Replace OverviewCards with StatCard components**

Replace `STAT_CARDS` and `OverviewCards` function with:
```tsx
import { StatCard } from "@/components/ui/stat-card";
import { PageHeader } from "@/components/ui/page-header";

const STAT_CARDS = [
  { key: "communities", label: "Komunitas", icon: Users, color: "bg-primary/10 text-primary" },
  { key: "projects", label: "Proyek", icon: FolderKanban, color: "bg-accent/10 text-accent" },
  { key: "events", label: "Kegiatan", icon: CalendarDays, color: "bg-amber-500/10 text-amber-600" },
  { key: "unreadCount", label: "Notifikasi", icon: Sparkles, color: "bg-violet-500/10 text-violet-600" },
] as const;
```

Replace the `OverviewCards` function body to use `StatCard`:
```tsx
function OverviewCards({ stats }: { stats: Record<string, number> | null }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {STAT_CARDS.map((card) => (
        <StatCard
          key={card.key}
          title={card.label}
          value={stats?.[card.key]?.toLocaleString("id-ID") ?? "0"}
          icon={card.icon}
          iconColor={card.color}
        />
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Refine CommunityCard hover state**

Update `hover:border-indigo-200 hover:bg-indigo-50/30` to `hover:border-primary/30 hover:bg-primary/5`.

- [ ] **Step 3: Refine ProjectCard hover state**

Same change: `hover:border-indigo-200 hover:bg-indigo-50/30` → `hover:border-primary/30 hover:bg-primary/5`.

- [ ] **Step 4: Refine EventCard hover state**

Same change.

- [ ] **Step 5: Run build to verify**

Run: `npx tsc -b`
Expected: No errors

- [ ] **Step 6: Commit**

```bash
git add src/pages/Dashboard.tsx
git commit -m "feat: enhance dashboard with StatCard component and refined hover states"
```

---

### Task 8: Proyek Page Enhancement

**Files:**
- Modify: `src/pages/Proyek.tsx`

- [ ] **Step 1: Import PageHeader and StatusBadge**

Add imports:
```tsx
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
```

- [ ] **Step 2: Replace header with PageHeader**

Replace the `<header>` block:
```tsx
<PageHeader
  title="Proyek"
  description="Jelajahi proyek kolaborasi sosial yang sedang berjalan."
/>
```

- [ ] **Step 3: Replace Badge with StatusBadge**

In the card, replace:
```tsx
<Badge className={STATUS_COLOR[project.status]} variant="outline">
  {STATUS_LABEL[project.status]}
</Badge>
```
with:
```tsx
<StatusBadge status={project.status} label={STATUS_LABEL[project.status]} dot />
```

- [ ] **Step 4: Refine card hover state**

Replace `hover:border-indigo-200 hover:bg-indigo-50/30` with `hover:border-primary/30 hover:shadow-sm hover:bg-primary/5`;

- [ ] **Step 5: Run build**

Run: `npx tsc -b`
Expected: No errors

- [ ] **Step 6: Commit**

```bash
git add src/pages/Proyek.tsx
git commit -m "feat: enhance Proyek page with PageHeader, StatusBadge, refined cards"
```

---

### Task 9: Kegiatan Page Enhancement

**Files:**
- Modify: `src/pages/Kegiatan.tsx`

- [ ] **Step 1: Import PageHeader and StatusBadge**

Add imports:
```tsx
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
```

- [ ] **Step 2: Replace header with PageHeader**

```tsx
<PageHeader
  title="Kegiatan"
  description="Agenda kegiatan dan acara kolaborasi terbaru."
/>
```

- [ ] **Step 3: Replace Badge with StatusBadge**

Replace the Badge in each event card:
```tsx
<StatusBadge status={event.status} label={STATUS_LABEL[event.status]} dot />
```

- [ ] **Step 4: Refine card hover**

Replace `hover:border-indigo-200 hover:bg-indigo-50/30` with `hover:border-primary/30 hover:shadow-sm hover:bg-primary/5`

- [ ] **Step 5: Commit**

```bash
git add src/pages/Kegiatan.tsx
git commit -m "feat: enhance Kegiatan page with PageHeader, StatusBadge, refined cards"
```

---

### Task 10: Komunitas Page Enhancement

**Files:**
- Modify: `src/pages/Komunitas.tsx`

- [ ] **Step 1: Import PageHeader**

```tsx
import { PageHeader } from "@/components/ui/page-header";
```

- [ ] **Step 2: Replace header with PageHeader**

```tsx
<PageHeader
  title="Komunitas"
  description="Temukan dan bergabung dengan komunitas yang sesuai dengan minatmu."
/>
```

- [ ] **Step 3: Refine card hover**

Replace `hover:border-indigo-200 hover:bg-indigo-50/30` with `hover:border-primary/30 hover:shadow-sm hover:bg-primary/5`

- [ ] **Step 4: Commit**

```bash
git add src/pages/Komunitas.tsx
git commit -m "feat: enhance Komunitas page with PageHeader and refined cards"
```

---

### Task 11: Pencarian Page Enhancement

**Files:**
- Modify: `src/pages/Pencarian.tsx`

- [ ] **Step 1: Import PageHeader and Search**

```tsx
import { PageHeader } from "@/components/ui/page-header";
```

- [ ] **Step 2: Replace header with PageHeader**

```tsx
<PageHeader
  title="Pencarian"
  description="Cari proyek, kegiatan, dan komunitas."
/>
```

- [ ] **Step 3: Enhance search bar**

Add keyboard shortcut hint and refined styling to the search input wrapper:
```tsx
<div className="relative">
  <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
  <Input
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    placeholder="Ketik kata kunci..."
    className="pl-9 pr-16"
  />
  {query === "" && (
    <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 items-center gap-1 rounded border bg-muted px-1.5 text-[10px] font-medium text-muted-foreground sm:flex">
      /
    </kbd>
  )}
</div>
```

- [ ] **Step 4: Refine search result cards hover**

Replace `hover:border-indigo-200 hover:bg-indigo-50/30` with `hover:border-primary/30 hover:bg-primary/5`

- [ ] **Step 5: Commit**

```bash
git add src/pages/Pencarian.tsx
git commit -m "feat: enhance Pencarian page with PageHeader, keyboard shortcut, refined cards"
```

---

### Task 12: Notifikasi Page Enhancement

**Files:**
- Modify: `src/pages/Notifikasi.tsx`

- [ ] **Step 1: Import PageHeader**

```tsx
import { PageHeader } from "@/components/ui/page-header";
```

- [ ] **Step 2: Replace header with PageHeader**

Replace the header block:
```tsx
<PageHeader
  title="Notifikasi"
  description="Pemberitahuan terbaru untuk aktivitasmu."
  action={
    <Button
      variant="outline"
      size="sm"
      disabled={!notifications || unreadCount === 0}
      onClick={() => void markAllRead({})}
    >
      <CheckCheck className="mr-2 size-3.5" />
      Tandai dibaca
    </Button>
  }
/>
```

- [ ] **Step 3: Add notification icon**

Each notification card gets a Bell icon wrapper:
```tsx
<div className="flex items-start gap-3">
  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
    <Bell className="size-4 text-primary" />
  </div>
  <div className="min-w-0 flex-1">
    <p className="text-sm font-medium leading-snug">
      {notification.title}
    </p>
    {notification.body ? (
      <p className="line-clamp-2 text-sm text-muted-foreground">
        {notification.body}
      </p>
    ) : null}
    <p className="text-xs text-muted-foreground">
      {formatRelative(notification._creationTime)}
    </p>
  </div>
  {!notification.read ? (
    <Button
      variant="ghost"
      size="sm"
      className="shrink-0 px-2"
      onClick={() => void markRead({ notificationId: notification._id })}
    >
      <Check className="size-4" />
      <span className="sr-only">Tandai dibaca</span>
    </Button>
  ) : null}
</div>
```

Remove the old un-grouped content inside the card and replace with the above structure.

- [ ] **Step 4: Commit**

```bash
git add src/pages/Notifikasi.tsx
git commit -m "feat: enhance Notifikasi page with PageHeader and notification type icons"
```

---

### Task 13: Pengaturan Page Enhancement

**Files:**
- Modify: `src/pages/Pengaturan.tsx`

- [ ] **Step 1: Import PageHeader**

```tsx
import { PageHeader } from "@/components/ui/page-header";
```

- [ ] **Step 2: Replace header with PageHeader**

```tsx
<PageHeader
  title="Pengaturan"
  description="Kelola informasi profil publikmu."
/>
```

- [ ] **Step 3: Add card icons**

Each section card should get a Lucide icon. Add icon imports:
```tsx
import { UserRound, Wrench, Bell } from "lucide-react";
```

The profile card already has `UserRound`. Add a Keahlian icon and a Notifikasi icon for future sections.

- [ ] **Step 4: Commit**

```bash
git add src/pages/Pengaturan.tsx
git commit -m "feat: enhance Pengaturan page with PageHeader and section icons"
```

---

### Task 14: Admin Page Enhancement

**Files:**
- Modify: `src/pages/Admin.tsx`

- [ ] **Step 1: Import PageHeader and StatCard**

```tsx
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
```

- [ ] **Step 2: Replace header with PageHeader**

```tsx
<PageHeader
  title="Admin"
  description="Ringkasan statistik platform."
/>
```

- [ ] **Step 3: Replace stat cards with StatCard components**

Replace the grid section:
```tsx
<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
  {OVERVIEW_CARDS.map(({ key, label, icon: Icon, color }) => (
    <StatCard
      key={key}
      title={label}
      value={overview[key].toLocaleString("id-ID")}
      icon={Icon}
      iconColor={color}
    />
  ))}
</div>
```

- [ ] **Step 4: Commit**

```bash
git add src/pages/Admin.tsx
git commit -m "feat: enhance Admin page with PageHeader and StatCard components"
```

---

### Task 15: 404 Page Enhancement

**Files:**
- Modify: `src/pages/NotFound.tsx`

- [ ] **Step 1: Rewrite 404 page**

```tsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen flex-col items-center justify-center bg-background p-6"
    >
      <div className="flex size-16 items-center justify-center rounded-2xl bg-muted">
        <SearchX className="size-8 text-muted-foreground" />
      </div>
      <h1 className="mt-6 text-4xl font-bold tracking-tight">404</h1>
      <p className="mt-2 text-lg text-muted-foreground">Halaman tidak ditemukan</p>
      <p className="mt-1 text-sm text-muted-foreground">
        Halaman yang kamu cari mungkin telah dipindahkan atau dihapus.
      </p>
      <Button
        className="mt-8 cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        <ArrowLeft className="mr-2 size-4" />
        Kembali ke Dashboard
      </Button>
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/NotFound.tsx
git commit -m "feat: enhance 404 page with icon, Bahasa Indonesia copy, and action button"
```

---

### Task 16: Dark Mode Verification & Polish

**Files:**
- All modified pages

- [ ] **Step 1: Verify all pages in dark mode**

Check each page renders correctly with `.dark` class applied. Key checks:
- Landing page: dark background, readable text, gradient blobs visible
- Dashboard: card backgrounds, sidebar, table rows
- All list pages: card borders, text contrast
- Auth: gradient background transitions correctly

- [ ] **Step 2: Verify `prefers-reduced-motion`**

Add to each page's Framer Motion components where needed. The key check: all animations should respect reduced motion.

- [ ] **Step 3: Run full build and type check**

```bash
npx tsc -b
npm run build
```

Expected: Clean compilation, no errors.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "chore: dark mode verification and polish"
```