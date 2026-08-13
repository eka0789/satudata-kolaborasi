import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Empty } from "@/components/ui/empty";
import { Users, Star } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";

export default function Komunitas() {
  const communities = useQuery(api.communities.list, {});

  return (
    <div className="space-y-6">
      <PageHeader
        title="Komunitas"
        description="Temukan dan bergabung dengan komunitas yang sesuai dengan minatmu."
      />

      {communities === undefined ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="space-y-3 p-5">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-3/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : communities.length === 0 ? (
        <Empty
          icon={Users}
          title="Belum ada komunitas"
          description="Komunitas akan tampil di sini setelah dibuat."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {communities.map((community) => (
            <Card
              key={community._id}
              className="transition-colors hover:border-primary/30 hover:shadow-sm hover:bg-primary/5"
            >
              <CardContent className="flex h-full flex-col gap-3 p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold leading-snug">
                    {community.name}
                  </h3>
                  {community.isFeatured ? (
                    <Badge
                      variant="outline"
                      className="bg-amber-500/10 text-amber-500"
                    >
                      <Star className="mr-1 size-3 fill-current" />
                      Unggulan
                    </Badge>
                  ) : null}
                </div>
                {community.description ? (
                  <p className="line-clamp-3 text-sm text-muted-foreground">
                    {community.description}
                  </p>
                ) : null}
                <div className="mt-auto flex items-center gap-1.5 pt-2 text-xs text-muted-foreground">
                  <Users className="size-3.5" />
                  Komunitas
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
