import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "danger";
  size?: "default" | "sm" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-sm font-sans font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-30";
    
    const variants = {
      primary: "bg-white text-black hover:bg-zinc-200 active:scale-[0.98]",
      secondary: "bg-zinc-900 border border-zinc-800 text-zinc-100 hover:bg-zinc-800",
      ghost: "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/50",
      outline: "border border-zinc-800 text-zinc-200 hover:bg-zinc-900 hover:border-zinc-700",
      danger: "bg-red-950/30 border border-red-900/50 text-red-500 hover:bg-red-900/20",
    };
    
    const sizes = {
      default: "h-11 px-6 text-sm",
      sm: "h-9 px-4 text-xs",
      lg: "h-14 px-10 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
