# SatuData Kolaborasi — UI/UX Enhancement Design

## Overview

Enhance all pages of SatuData Kolaborasi (platform data collaboration for Indonesian government) with a **Modern-Inspiratif** visual direction. Unify the Landing page (currently dark/gradient) and Dashboard pages (currently neutral/enterprise) under one cohesive design system.

## Design Principles

- **Modern-Inspiratif** — professional but lively, with brand color accents and subtle micro-interactions
- **Consistent** — one design system across all pages (landing, auth, dashboard, 404)
- **Accessible** — WCAG AA+, keyboard nav, focus states, `prefers-reduced-motion`
- **Responsive** — 320px to 1536px
- **Dark mode** — every page supports both light and dark

## Design System

### Color Palette

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| Primary | `#2563EB` (blue-600) | `#60A5FA` (blue-400) | Buttons, links, active states |
| Accent | `#0D9488` (teal-600) | `#2DD4BF` (teal-400) | Highlights, badges, secondary CTAs |
| Warning/CTA | `#D97706` (amber-600) | `#FBBF24` (amber-400) | Warning badges, CTA emphasis |
| Background | `#F8FAFC` | `#0F172A` | Page background |
| Card | `#FFFFFF` | `#1E293B` | Card, dialog, popover surfaces |
| Border | `#E2E8F0` | `#334155` | Dividers, card borders |
| Muted | `#F1F5F9` | `#1E293B` | Muted backgrounds |
| Muted Foreground | `#64748B` | `#94A3B8` | Secondary text, placeholders |

CSS variables in `src/index.css` will use oklch values (existing infrastructure) but with adjusted hue/chroma for blue-primary and teal-accent.

### Typography

| Role | Font | Weights |
|------|------|---------|
| Headings | Outfit | 400, 500, 600, 700 |
| Body | Work Sans | 300, 400, 500, 600, 700 |
| Code/Numbers | Fira Code | 400, 500, 600 |

Tailwind config: `fontFamily: { heading: ['Outfit', 'sans-serif'], body: ['Work Sans', 'sans-serif'] }`

### Spacing

Consistent with existing Tailwind scale: `p-4`, `p-6`, `gap-4`, `gap-6`, `space-y-4`.

### Radius

Keep existing `--radius: 0.625rem` (shadcn new-york style).

## Animations (Framer Motion)

All animations respect `prefers-reduced-motion: reduce`.

| Use Case | Effect | Timing |
|----------|--------|--------|
| Page transition | Fade in | 200ms |
| Card mount | Fade-in-up + stagger | 300ms |
| Dialog open/close | Scale + opacity | 200ms |
| Sidebar collapse | Width transition | 200ms |
| Card hover | translateY(-2px) + shadow | 200ms |
| Toast | Slide from right | 250ms |
| Scroll sections | Fade-in-up via `useInView` | 400ms |

## Components

### New Components (reusable)

| Component | Props | Description |
|-----------|-------|-------------|
| `StatCard` | `title, value, icon, trend, description` | Summary stat with icon + trend indicator |
| `PageHeader` | `title, description, breadcrumbs, action` | Consistent page header with breadcrumb |
| `EmptyState` | `icon, title, description, action` | Standardized empty state with illustration |
| `StatusBadge` | `status, variant` | Soft-color badge for statuses |
| `SearchInput` | `placeholder, onSearch, filters` | Search bar with icon + keyboard hint |
| `SectionCard` | `title, action, children` | Card wrapper with header + action link |

### Refined Components

| Component | Enhancement |
|-----------|-------------|
| Card | Subtle shadow, hover lift effect |
| Table | Hover row highlight, sort indicator, pagination |
| Badge | Soft-tint background (`bg-*-500/10`) |
| Button | Loading spinner, consistent sizing |
| Dialog | Scale + opacity animation, backdrop blur |

## Page-by-Page Enhancement

### Landing Page (`/`)

**Style:** Dark-first (default dark), with refined brand-colored gradient hero.

- **Hero:** Grid background, subtle radial gradient (blue/teal/amber), gradient text, animated counters
- **Navbar:** Fixed, glass blur, border-bottom, brand logo + nav links + CTA button
- **How It Works:** 3-step section with icons
- **Statistics:** Animated counters (proyek, kegiatan, komunitas, pengguna)
- **Projects/Communities:** Card grid with hover lift effect
- **Events:** Timeline-style cards with date badges
- **Partners:** Logo grid of government institutions
- **Testimonials:** 2-column quote cards
- **CTA Band:** Gradient background with grid + blob decoration
- **Footer:** 4-column grid (brand, navigasi, sumber daya, kontak)

### Auth Page (`/auth`)

**Style:** Light, centered card with subtle gradient background.

- Brand logo centered above card
- Wider card with shadow
- OTP input with improved UX (auto-focus between fields, paste)
- Tab/name input for anonymous sign-in
- Background: subtle gradient or pattern from brand colors

### Dashboard (`/dashboard`)

**Style:** Light-first (default light), consistent card-based layout.

- **Summary cards:** StatCard with icon + trend indicator
- **Charts:** Recharts with brand color palette (blue, teal, amber)
- **Projects section:** Horizontal scroll or grid with status badges
- **Events section:** Timeline-style cards
- **Header:** PageHeader component with breadcrumb

### Proyek (`/proyek`)

- Table with improved hover states, sort indicators, pagination
- Status tabs (Semua, Aktif, Selesai, Arsip) with active underline
- Search bar + filter dropdown
- Empty state with icon + action

### Kegiatan (`/kegiatan`)

- Card grid with hover lift effect
- Date badge on each card
- Category tags
- Status indicators (Live, Upcoming, Completed)

### Komunitas (`/komunitas`)

- Card grid with avatar/gradient initials
- Member count, category badge
- Hover: translateY + shadow increase

### Pencarian (`/cari`)

- Prominent search bar with icon + keyboard shortcut hint
- Results grouped by tabs (Semua, Proyek, Kegiatan, Komunitas)
- Keyword highlighting in results
- Debounced search with loading state

### Notifikasi (`/notifikasi`)

- Grouped by date (Hari Ini, Kemarin, Minggu Ini)
- Icon per notification type
- Mark read/mark all read with transition
- Empty state

### Pengaturan (`/pengaturan`)

- Sectioned cards (Profil, Keahlian, Notifikasi preferences)
- 2-column layout on desktop (form + sidebar)
- Save with loading state, Cancel as ghost button
- Form validation with react-hook-form + zod

### Admin (`/admin`)

- Stats cards with trend indicators
- Quick actions grid
- Recent data table
- Role-gated content

### 404 (`*`)

- Simple illustration/icon
- Friendly copy in Bahasa Indonesia
- "Kembali ke Dashboard" button

## Implementation Order

1. **Phase 1:** Design System (index.css tokens, fonts, Tailwind config)
2. **Phase 2:** Reusable components (StatCard, PageHeader, EmptyState, StatusBadge, SearchInput, SectionCard)
3. **Phase 3:** Landing page refinement
4. **Phase 4:** Auth page enhancement
5. **Phase 5:** Dashboard page enhancement
6. **Phase 6:** Proyek, Kegiatan, Komunitas pages
7. **Phase 7:** Pencarian, Notifikasi, Pengaturan pages
8. **Phase 8:** Admin page
9. **Phase 9:** 404 page
10. **Phase 10:** Dark mode verification & polish

## Accessibility Checklist

- [ ] WCAG AA+ contrast ratio (4.5:1 text, 3:1 large text)
- [ ] Focus visible indicators (3px ring)
- [ ] Keyboard navigation (Tab, Enter, Escape, Arrow keys)
- [ ] `prefers-reduced-motion` respected
- [ ] ARIA labels on icon-only buttons
- [ ] Semantic HTML (nav, main, section, button, etc.)
- [ ] Form labels properly associated
- [ ] Color is not the only indicator (add icons/text)
- [ ] Touch targets 44x44px minimum

## Responsive Breakpoints

| Breakpoint | Width | Layout |
|-----------|-------|--------|
| Mobile | 320px+ | Single column, hamburger nav |
| Tablet | 768px+ | 2-column grid, sidebar visible |
| Desktop | 1024px+ | Full layout, sidebar expanded |
| Wide | 1280px+ | Max content width |