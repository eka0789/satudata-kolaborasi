import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Empty } from "@/components/ui/empty";
import { Bell, Check, CheckCheck } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";

function formatRelative(timestamp: number) {
  const seconds = Math.round((timestamp - Date.now()) / 1000);
  const abs = Math.abs(seconds);
  if (abs < 60) return "baru saja";
  if (abs < 3600) return `${Math.round(abs / 60)} menit lalu`;
  if (abs < 86400) return `${Math.round(abs / 3600)} jam lalu`;
  return new Date(timestamp).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function Notifikasi() {
  const notifications = useQuery(api.notifications.list, {});
  const markRead = useMutation(api.notifications.markRead);
  const markAllRead = useMutation(api.notifications.markAllRead);

  const unreadCount =
    notifications?.filter((notification) => !notification.read).length ?? 0;

  return (
    <div className="space-y-6">
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

      {notifications === undefined ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="space-y-2 p-4">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-3 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : notifications.length === 0 ? (
        <Empty
          icon={Bell}
          title="Tidak ada notifikasi"
          description="Kamu akan menerima pemberitahuan saat ada aktivitas baru."
        />
      ) : (
        <div className="space-y-3">
          {notifications.map((notification) => (
            <Card
              key={notification._id}
              className={
                notification.read
                  ? "opacity-70"
                  : "border-primary/30 bg-primary/5"
              }
            >
              <CardContent className="flex items-start justify-between gap-4 p-4">
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
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
