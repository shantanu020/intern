import React from "react";
import { cn } from "@/lib/utils";

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  helperText?: string;
  valuePrefix?: string;
  valueSuffix?: string;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, label, helperText, valuePrefix = "", valueSuffix = "", ...props }, ref) => {
    return (
      <div className="w-full space-y-3">
        {label && (
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-copy-primary">{label}</label>
            <span className="font-mono text-accent text-sm font-semibold">
              {valuePrefix}{props.value || props.defaultValue || props.min || 0}{valueSuffix}
            </span>
          </div>
        )}
        <input
          type="range"
          ref={ref}
          className={cn(
            "w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent hover:accent-accent-light focus:outline-none focus:ring-2 focus:ring-accent/50",
            className
          )}
          {...props}
        />
        {helperText && <p className="text-xs text-copy-muted">{helperText}</p>}
      </div>
    );
  }
);
Slider.displayName = "Slider";

export { Slider };
