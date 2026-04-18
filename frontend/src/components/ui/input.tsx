import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, required, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="text-sm font-medium text-copy-primary block">
            {label} {required && <span className="text-copy-muted ml-0.5">*</span>}
          </label>
        )}
        <input
          ref={ref}
          required={required}
          className={cn(
            "flex h-11 w-full rounded-md border border-edge-hover bg-white/5 px-[14px] py-2 text-[0.9rem] text-copy-primary transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-copy-muted focus-visible:outline-none focus:border-accent disabled:cursor-not-allowed disabled:opacity-50",
            error ? "border-status-red focus:border-status-red" : "",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-status-red mt-1">{error}</p>}
        {helperText && !error && <p className="text-xs text-copy-muted mt-1">{helperText}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
