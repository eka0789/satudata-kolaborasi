import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Empty } from "@/components/ui/empty";
import { FolderKanban, CalendarDays, MapPin } from "lucide-react";

const STATUS_OPTIONS = [
  { value: "all", label: "Semua" },
  { value: "active", label: "Aktif" },
  { value: "completed", label: "Selesai" },
  { value: "archived", label: "Arsip" },
] as const;

type ProjectStatus = "active" | "completed" | "archived" | "draft";

const STATUS_LABEL: Record<ProjectStatus, string> = {
  draft: "Draf",
  active: "Aktif",
  completed: "Selesai",
  archived: "Arsip",
};

const STATUS_COLOR: Record<ProjectStatus, string> = {
  draft: "bg-muted text-muted-foreground",
  active: "bg-indigo-500/10 text-indigo-500",
  completed: "bg-emerald-500/10 text-emerald-500",
  archived: "bg-muted text-muted-foreground",
};

export default function Proyek() {
  const [tab, setTab] = useState<(typeof STATUS_OPTIONS)[number]["value"]>(
    "all",
  );
  const projects = useQuery(
    api.projects.list,
    tab === "all" ? {} : { status: tab },
  );

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Proyek</h1>
        <p className="text-sm text-muted-foreground">
          Jelajahi proyek kolaborasi sosial yang sedang berjalan.
        </p>
      </header>

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

      {projects === undefined ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="space-y-3 p-5">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : projects.length === 0 ? (
        <Empty
          icon={FolderKanban}
          title="Belum ada proyek"
          description="Proyek pada kategori ini akan tampil di sini."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card
              key={project._id}
              className="transition-colors hover:border-indigo-200 hover:bg-indigo-50/30"
            >
              <CardContent className="flex h-full flex-col gap-3 p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold leading-snug">{project.title}</h3>
                  <Badge
                    className={STATUS_COLOR[project.status]}
                    variant="outline"
                  >
                    {STATUS_LABEL[project.status]}
                  </Badge>
                </div>
                {project.description ? (
                  <p className="line-clamp-3 text-sm text-muted-foreground">
                    {project.description}
                  </p>
                ) : null}
                <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-2 text-xs text-muted-foreground">
                  {project.startDate ? (
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="size-3.5" />
                      {new Date(project.startDate).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  ) : null}
                  {project.tags?.length ? (
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="size-3.5" />
                      {project.tags.slice(0, 2).join(", ")}
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
