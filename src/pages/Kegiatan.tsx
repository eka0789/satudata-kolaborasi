import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Empty } from "@/components/ui/empty";
import { CalendarDays, MapPin, Users } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";

const STATUS_OPTIONS = [
  { value: "all", label: "Semua" },
  { value: "upcoming", label: "Akan Datang" },
  { value: "ongoing", label: "Berlangsung" },
  { value: "ended", label: "Selesai" },
] as const;

type EventStatus = "upcoming" | "ongoing" | "ended" | "cancelled";

const STATUS_LABEL: Record<EventStatus, string> = {
  upcoming: "Akan Datang",
  ongoing: "Berlangsung",
  ended: "Selesai",
  cancelled: "Dibatalkan",
};

function formatDateTime(timestamp: number) {
  return new Date(timestamp).toLocaleString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function Kegiatan() {
  const [tab, setTab] = useState<(typeof STATUS_OPTIONS)[number]["value"]>(
    "all",
  );
  const events = useQuery(
    api.events.list,
    tab === "all" ? {} : { status: tab },
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Kegiatan"
        description="Agenda kegiatan dan acara kolaborasi terbaru."
      />

      <Tabs
        value={tab}
        onValueChange={(value) =>
          setTab(value as (typeof STATUS_OPTIONS)[number]["value"])
        }
        className="w-full"
      >
        <TabsList>
          {STATUS_OPTIONS.map((option) => (
            <TabsTrigger key={option.value} value={option.value}>
              {option.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {events === undefined ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="space-y-3 p-5">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : events.length === 0 ? (
        <Empty
          icon={CalendarDays}
          title="Belum ada kegiatan"
          description="Kegiatan pada kategori ini akan tampil di sini."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Card
              key={event._id}
              className="transition-colors hover:border-primary/30 hover:shadow-sm hover:bg-primary/5"
            >
              <CardContent className="flex h-full flex-col gap-3 p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold leading-snug">{event.title}</h3>
                  <StatusBadge status={event.status} label={STATUS_LABEL[event.status]} dot />
                </div>
                {event.description ? (
                  <p className="line-clamp-3 text-sm text-muted-foreground">
                    {event.description}
                  </p>
                ) : null}
                <div className="mt-auto space-y-1.5 pt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <CalendarDays className="size-3.5" />
                    {formatDateTime(event.startTime)}
                  </span>
                  {event.location ? (
                    <span className="flex items-center gap-1.5">
                      <MapPin className="size-3.5" />
                      {event.location}
                    </span>
                  ) : null}
                  {event.capacity ? (
                    <span className="flex items-center gap-1.5">
                      <Users className="size-3.5" />
                      {event.capacity} peserta
                    </span>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
