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
        <span className="mr-1 size-1.5 inline-block rounded-full bg-current" />
      )}
      {label}
    </Badge>
  );
}