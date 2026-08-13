import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  iconColor?: string;
  title: string;
  description: string;
  index?: number;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export function FeatureCard({
  icon: Icon,
  iconColor = "from-primary to-blue-400",
  title,
  description,
  index = 0,
}: FeatureCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
    >
      <div
        className={cn(
          "inline-flex size-11 items-center justify-center rounded-xl bg-gradient-to-br text-sm font-bold text-white shadow-md",
          iconColor,
        )}
      >
        <Icon className="size-5" />
      </div>
      <h3 className="mt-4 text-lg font-semibold tracking-tight text-slate-900 transition-colors group-hover:text-primary">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </motion.div>
  );
}