import { useEffect, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Empty } from "@/components/ui/empty";
import { Search, FolderKanban, CalendarDays, Users } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";

function useDebouncedValue(value: string, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

export default function Pencarian() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query);
  const results = useQuery(api.search.searchAll, { query: debouncedQuery });

  const hasResults =
    results !== undefined &&
    (results.communities.length > 0 ||
      results.projects.length > 0 ||
      results.events.length > 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Pencarian"
        description="Cari proyek, kegiatan, dan komunitas."
      />

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

      {debouncedQuery.trim() === "" ? (
        <Empty
          icon={Search}
          title="Mulai pencarian"
          description="Masukkan kata kunci untuk mencari proyek, kegiatan, dan komunitas."
        />
      ) : results === undefined ? (
        <Card>
          <CardContent className="space-y-3 p-5">
            <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
            <div className="h-3 w-full animate-pulse rounded bg-muted" />
            <div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
          </CardContent>
        </Card>
      ) : !hasResults ? (
        <Empty
          icon={Search}
          title="Tidak ada hasil"
          description={`Tidak ditemukan hasil untuk “${debouncedQuery.trim()}”.`}
        />
      ) : (
        <div className="space-y-6">
          {results.projects.length > 0 ? (
            <ResultSection
              icon={FolderKanban}
              title="Proyek"
              results={results.projects.map((p) => p.title)}
            />
          ) : null}
          {results.events.length > 0 ? (
            <ResultSection
              icon={CalendarDays}
              title="Kegiatan"
              results={results.events.map((e) => e.title)}
            />
          ) : null}
          {results.communities.length > 0 ? (
            <ResultSection
              icon={Users}
              title="Komunitas"
              results={results.communities.map((c) => c.name)}
            />
          ) : null}
        </div>
      )}
    </div>
  );
}

function ResultSection({
  icon: Icon,
  title,
  results,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  results: string[];
}) {
  return (
    <section className="space-y-3">
      <h2 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
        <Icon className="size-4" />
        {title}
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((name, i) => (
          <Card
            key={i}
            className="transition-colors hover:border-primary/30 hover:bg-primary/5"
          >
            <CardContent className="p-4">
              <p className="line-clamp-2 text-sm font-medium">{name}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
