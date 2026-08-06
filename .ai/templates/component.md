# Template: React Reusable UI Component

Boilerplate komponen React reusable menggunakan Tailwind CSS, shadcn/ui primitives, dan Lucide Icons.

---

```tsx
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { ShieldAlert, CheckCircle2, Clock } from 'lucide-react';

const statusBadgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      status: {
        draft: 'bg-muted text-muted-foreground hover:bg-muted/80',
        pending: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
        approved: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
        rejected: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400',
      },
    },
    defaultVariants: {
      status: 'draft',
    },
  }
);

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBadgeVariants> {
  label?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  className,
  status,
  label,
  ...props
}) => {
  const getIcon = () => {
    switch (status) {
      case 'pending':
        return <Clock className="h-3 w-3" />;
      case 'approved':
        return <CheckCircle2 className="h-3 w-3" />;
      case 'rejected':
        return <ShieldAlert className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const defaultLabel = status ? status.toUpperCase() : 'DRAFT';

  return (
    <div className={cn(statusBadgeVariants({ status }), className)} {...props}>
      {getIcon()}
      <span>{label || defaultLabel}</span>
    </div>
  );
};
```
