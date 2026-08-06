import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Empty } from "@/components/ui/empty";
import {
  ShieldAlert,
  Users,
  UsersRound,
  FolderKanban,
  CalendarDays,
  PackageOpen,
} from "lucide-react";

const OVERVIEW_CARDS = [
  { key: "userCount", label: "Pengguna", icon: Users, color: "bg-indigo-500/10 text-indigo-500" },
  { key: "communityCount", label: "Komunitas", icon: UsersRound, color: "bg-emerald-500/10 text-emerald-500" },
  { key: "projectCount", label: "Proyek", icon: FolderKanban, color: "bg-amber-500/10 text-amber-500" },
  { key: "eventCount", label: "Kegiatan", icon: CalendarDays, color: "bg-violet-500/10 text-violet-500" },
  { key: "needCount", label: "Kebutuhan", icon: PackageOpen, color: "bg-rose-500/10 text-rose-500" },
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
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Admin</h1>
        <p className="text-sm text-muted-foreground">
          Ringkasan statistik platform.
        </p>
      </header>

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
            <Card key={key}>
              <CardContent className="flex flex-col gap-3 p-5">
                <span
                  className={`inline-flex size-10 items-center justify-center rounded-[10px] ${color}`}
                >
                  <Icon className="size-5" />
                </span>
                <div>
                  <p className="text-sm text-muted-foreground">{label}</p>
                  <p className="text-2xl font-bold">
                    {overview[key].toLocaleString("id-ID")}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
