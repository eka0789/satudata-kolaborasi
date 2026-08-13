import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Empty } from "@/components/ui/empty";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import {
  ShieldAlert,
  Users,
  UsersRound,
  FolderKanban,
  CalendarDays,
  PackageOpen,
} from "lucide-react";

const OVERVIEW_CARDS = [
  { key: "userCount", label: "Pengguna", icon: Users, color: "bg-primary/10 text-primary" },
  { key: "communityCount", label: "Komunitas", icon: UsersRound, color: "bg-accent/10 text-accent" },
  { key: "projectCount", label: "Proyek", icon: FolderKanban, color: "bg-amber-500/10 text-amber-600" },
  { key: "eventCount", label: "Kegiatan", icon: CalendarDays, color: "bg-violet-500/10 text-violet-600" },
  { key: "needCount", label: "Kebutuhan", icon: PackageOpen, color: "bg-rose-500/10 text-rose-600" },
] as const;

export default function Admin() {
  const { user, isLoading } = useAuth();
  const overview = useQuery(api.admin.getOverview, {});

  if (isLoading) {
    return <div className="space-y-6"><Skeleton className="h-8 w-48" /></div>;
  }

  if (user?.role !== "admin") {
    return (
      <Empty
        icon={ShieldAlert}
        title="Akses ditolak"
        description="Halaman ini hanya dapat diakses oleh administrator platform."
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin"
        description="Ringkasan statistik platform."
      />

      {overview === undefined ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="space-y-2 p-5">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
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
      )}
    </div>
  );
}
