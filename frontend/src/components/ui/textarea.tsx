import React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  maxLength?: number;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, required, maxLength, value, ...props }, ref) => {
    
    // Calculate current length for character counter
    const currentLength = typeof value === 'string' ? value.length : 0;
    const isNearMax = maxLength ? currentLength >= (maxLength * 0.9) : false;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <div className="flex justify-between items-end">
            <label className="text-sm font-medium text-copy-primary block">
              {label} {required && <span className="text-copy-muted ml-0.5">*</span>}
            </label>
            {maxLength && (
              <span className={cn("text-xs", isNearMax ? "text-status-amber" : "text-copy-muted")}>
                {currentLength} / {maxLength}
              </span>
            )}
          </div>
        )}
        <textarea
          ref={ref}
          required={required}
          maxLength={maxLength}
          value={value}
          className={cn(
            "flex min-h-[100px] w-full rounded-md border border-edge-hover bg-white/5 px-[14px] py-3 text-[0.9rem] text-copy-primary transition-colors placeholder:text-copy-muted focus-visible:outline-none focus:border-accent disabled:cursor-not-allowed disabled:opacity-50 resize-y",
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
Textarea.displayName = "Textarea";

export { Textarea };
