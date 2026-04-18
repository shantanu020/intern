import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "success" | "warning" | "danger";
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const baseStyles = "inline-flex items-center rounded-sm border px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-widest transition-colors focus:outline-none focus:ring-1 focus:ring-zinc-400";
    
    const variants = {
      default: "border-zinc-800 bg-zinc-900/50 text-white",
      secondary: "border-zinc-800 text-zinc-400 font-semibold",
      outline: "border-zinc-800 text-zinc-300",
      success: "border-emerald-900/40 bg-emerald-950/20 text-emerald-400",
      warning: "border-amber-900/40 bg-amber-950/20 text-amber-400",
      danger: "border-red-900/40 bg-red-950/20 text-red-400",
    };

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";

export { Badge };
