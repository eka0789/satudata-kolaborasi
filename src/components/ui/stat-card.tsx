import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { type LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  iconColor?: string;
  trend?: { value: number; positive: boolean };
  description?: string;
  formatter?: (value: number) => string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  iconColor = "bg-primary/10 text-primary",
  trend,
  description,
  formatter,
}: StatCardProps) {
  return (
    <Card className="border-border/70 shadow-none transition-shadow duration-200 hover:shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className={cn("flex size-9 items-center justify-center rounded-lg", iconColor)}>
            <Icon className="size-4" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <p className="text-2xl font-bold tracking-tight">
            {formatter ? formatter(Number(value)) : value}
          </p>
          {trend && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 text-xs font-medium",
                trend.positive ? "text-emerald-600" : "text-rose-600",
              )}
            >
              {trend.positive ? "↑" : "↓"} {trend.value}%
            </span>
          )}
        </div>
        {description && (
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}