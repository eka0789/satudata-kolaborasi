import { motion } from "framer-motion";
import {
  CalendarDays,
  FolderKanban,
  Plus,
  Sparkles,
  Users,
} from "lucide-react";
import { useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Skeleton } from "@/components/ui/skeleton";
import { StatCard } from "@/components/ui/stat-card";

const STAT_CARDS = [
  { key: "communities", label: "Komunitas", icon: Users, color: "bg-primary/10 text-primary" },
  { key: "projects", label: "Proyek", icon: FolderKanban, color: "bg-accent/10 text-accent" },
  { key: "events", label: "Kegiatan", icon: CalendarDays, color: "bg-amber-500/10 text-amber-600" },
  { key: "unreadCount", label: "Notifikasi", icon: Sparkles, color: "bg-violet-500/10 text-violet-600" },
] as const;

/* ---------------------------------------------------------------------------
 * Overview stats
 * ------------------------------------------------------------------------- */

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

/* ---------------------------------------------------------------------------
 * Section list: communities / projects / events
 * ------------------------------------------------------------------------- */

function SectionHeader({
  title,
  count,
  emptyLabel,
}: {
  title: string;
  count: number;
  emptyLabel: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        <p className="text-sm text-muted-foreground">
          {count} {emptyLabel}
        </p>
      </div>
      <Button variant="outline" size="sm" className="cursor-pointer gap-1.5">
        <Plus className="size-3.5" />
        <span className="hidden sm:inline">Buat Baru</span>
      </Button>
    </div>
  );
}

function EmptySection({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <Card className="border-dashed border-border/70 shadow-none">
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-muted">
          <Icon className="size-5 text-muted-foreground" />
        </div>
        <p className="mt-4 font-medium text-foreground">{title}</p>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        <Button variant="outline" size="sm" className="mt-4 cursor-pointer gap-1.5">
          <Plus className="size-3.5" />
          Mulai Sekarang
        </Button>
      </CardContent>
    </Card>
  );
}

function CommunityCard({
  name,
  description,
  isFeatured,
}: {
  name: string;
  description?: string;
  isFeatured?: boolean;
}) {
  const initials = (s: string) =>
    s
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() ?? "")
      .join("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group flex items-start gap-4 rounded-xl border border-border/70 p-4 transition-colors hover:border-primary/30 hover:bg-primary/5"
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 text-xs font-bold text-white">
        {initials(name)}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-semibold">{name}</p>
          {isFeatured && (
            <Badge variant="secondary" className="shrink-0 text-[10px]">
              Unggulan
            </Badge>
          )}
        </div>
        {description && (
          <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </motion.div>
  );
}

function ProjectCard({
  title,
  status,
  description,
  tags,
}: {
  title: string;
  status: string;
  description?: string;
  tags?: string[];
}) {
  const statusConfig: Record<string, { label: string; className: string }> = {
    active: { label: "Aktif", className: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
    draft: { label: "Draft", className: "bg-slate-50 text-slate-600 ring-slate-200" },
    completed: { label: "Selesai", className: "bg-blue-50 text-blue-700 ring-blue-200" },
    archived: { label: "Arsip", className: "bg-amber-50 text-amber-700 ring-amber-200" },
  };
  const statusInfo = statusConfig[status] ?? statusConfig.draft;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group flex flex-col gap-3 rounded-xl border border-border/70 p-4 transition-colors hover:border-primary/30 hover:bg-primary/5"
    >
      <div className="flex items-center justify-between gap-2">
        <p className="truncate text-sm font-semibold">{title}</p>
        <Badge
          variant="secondary"
          className={cn("shrink-0 text-[10px] ring-1", statusInfo.className)}
        >
          {statusInfo.label}
        </Badge>
      </div>
      {description && (
        <p className="line-clamp-2 text-xs text-muted-foreground">{description}</p>
      )}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

function EventCard({
  title,
  startTime,
  location,
  status,
}: {
  title: string;
  startTime: number;
  location?: string;
  status: string;
}) {
  const formatDate = (ts: number) =>
    new Intl.DateTimeFormat("id-ID", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(ts));

  const statusConfig: Record<string, { label: string; className: string }> = {
    upcoming: { label: "Mendatang", className: "bg-sky-50 text-sky-700 ring-sky-200" },
    ongoing: { label: "Berlangsung", className: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
    ended: { label: "Selesai", className: "bg-slate-50 text-slate-600 ring-slate-200" },
    cancelled: { label: "Dibatalkan", className: "bg-red-50 text-red-700 ring-red-200" },
  };
  const statusInfo = statusConfig[status] ?? statusConfig.upcoming;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group flex items-center gap-4 rounded-xl border border-border/70 p-4 transition-colors hover:border-primary/30 hover:bg-primary/5"
    >
      <div className="flex size-10 shrink-0 flex-col items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 text-white">
        <CalendarDays className="size-4" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-semibold">{title}</p>
          <Badge
            variant="secondary"
            className={cn("shrink-0 text-[10px] ring-1", statusInfo.className)}
          >
            {statusInfo.label}
          </Badge>
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {formatDate(startTime)}
          {location ? ` · ${location}` : ""}
        </p>
      </div>
    </motion.div>
  );
}

/* ---------------------------------------------------------------------------
 * Main Dashboard
 * ------------------------------------------------------------------------- */

export default function Dashboard() {
  const { user } = useAuth();

  const dashboard = useQuery(api.dashboard.getDashboard);

  const communities = dashboard?.communities ?? null;
  const projects = dashboard?.projects ?? null;
  const events = dashboard?.events ?? null;

  const stats =
    communities && projects && events
      ? {
          communities: communities.length,
          projects: projects.length,
          events: events.length,
          unreadCount: dashboard?.unreadCount ?? 0,
        }
      : null;

  return (
    <>
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Selamat datang{user?.name ? `, ${user.name}` : ""}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Kelola proyek, komunitas, dan kegiatan data Anda di sini.
        </p>
      </motion.div>

      {/* Stats */}
      <OverviewCards stats={stats} />

      {/* Two columns: Communities + Projects on left, Events on right */}
      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Left column */}
        <div className="space-y-8 lg:col-span-2">
          {/* Communities */}
          <section>
            <SectionHeader
              title="Komunitas Saya"
              count={communities?.length ?? 0}
              emptyLabel="komunitas"
            />
            <div className="mt-4 space-y-3">
              {!communities ? (
                Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="flex items-start gap-4 rounded-xl border border-border/70 p-4">
                    <Skeleton className="size-10 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-3 w-3/4" />
                    </div>
                  </div>
                ))
              ) : communities.length === 0 ? (
                <EmptySection
                  icon={Users}
                  title="Belum bergabung dengan komunitas"
                  description="Temukan komunitas data di daerahmu atau buat komunitas baru."
                />
              ) : (
                communities.slice(0, 4).map((c) => (
                  <CommunityCard
                    key={c._id}
                    name={c.name}
                    description={c.description}
                    isFeatured={c.isFeatured}
                  />
                ))
              )}
            </div>
          </section>

          {/* Projects */}
          <section>
            <SectionHeader
              title="Proyek Saya"
              count={projects?.length ?? 0}
              emptyLabel="proyek"
            />
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {!projects ? (
                Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="space-y-3 rounded-xl border border-border/70 p-4">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))
              ) : projects.length === 0 ? (
                <div className="sm:col-span-2">
                  <EmptySection
                    icon={FolderKanban}
                    title="Belum ada proyek"
                    description="Mulai proyek kolaborasi data pertamamu atau bergabung dengan proyek yang ada."
                  />
                </div>
              ) : (
                projects.slice(0, 4).map((p) => (
                  <ProjectCard
                    key={p._id}
                    title={p.title}
                    status={p.status}
                    description={p.description}
                    tags={p.tags}
                  />
                ))
              )}
            </div>
          </section>
        </div>

        {/* Right column — Events */}
        <aside className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold tracking-tight">Kegiatan</h3>
            <Badge variant="secondary" className="text-[10px]">
              {events?.length ?? 0}
            </Badge>
          </div>

          <div className="space-y-3">
            {!events ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 rounded-xl border border-border/70 p-4">
                  <Skeleton className="size-10 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-2/3" />
                  </div>
                </div>
              ))
            ) : events.length === 0 ? (
              <Card className="border-dashed border-border/70 shadow-none">
                <CardContent className="flex flex-col items-center py-8 text-center">
                  <CalendarDays className="size-8 text-muted-foreground" />
                  <p className="mt-3 text-sm font-medium">Belum ada kegiatan</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Ikuti kegiatan komunitas terdekat.
                  </p>
                </CardContent>
              </Card>
            ) : (
              events.slice(0, 5).map((e) => (
                <EventCard
                  key={e._id}
                  title={e.title}
                  startTime={e.startTime}
                  location={e.location}
                  status={e.status}
                />
              ))
            )}
          </div>

          {/* Platform stats summary */}
          <Card className="border-border/70 shadow-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Statistik Platform</CardTitle>
              <CardDescription className="text-xs">
                Total data publik di Satu Data Kolaborasi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PlatformStats />
            </CardContent>
          </Card>
        </aside>
      </div>
    </>
  );
}

/* ---------------------------------------------------------------------------
 * Platform stats mini widget
 * ------------------------------------------------------------------------- */

function PlatformStats() {
  const platformStats = useQuery(api.stats.getPlatformStats);

  if (!platformStats) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </div>
    );
  }

  const items = [
    { label: "Provinsi", value: platformStats.provinces },
    { label: "Komunitas", value: platformStats.communities },
    { label: "Proyek Aktif", value: platformStats.projects },
    { label: "Relawan", value: platformStats.volunteers },
  ];

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.label} className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{item.label}</span>
          <span className="text-sm font-semibold tabular-nums">
            {item.value.toLocaleString("id-ID")}
          </span>
        </div>
      ))}
    </div>
  );
}
