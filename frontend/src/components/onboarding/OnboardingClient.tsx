"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useProfileStore } from "@/store/useProfileStore";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: 1, path: "/onboarding/step-1", title: "About You" },
  { id: 2, path: "/onboarding/step-2", title: "Education" },
  { id: 3, path: "/onboarding/step-3", title: "Skills" },
  { id: 4, path: "/onboarding/step-4", title: "Projects" },
  { id: 5, path: "/onboarding/step-5", title: "Availability" },
  { id: 6, path: "/onboarding/step-6", title: "Preferences" },
];

export default function OnboardingClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const getCompletionPercentage = useProfileStore((state) => state.getCompletionPercentage);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentStepIndex = STEPS.findIndex(s => pathname === s.path);
  const currentStep = STEPS[currentStepIndex];
  
  // Prevent hydration mismatch for zustand persist store
  const completionPct = mounted ? getCompletionPercentage() : 0;

  const handleNext = () => {
    if (currentStepIndex < STEPS.length - 1) {
      router.push(STEPS[currentStepIndex + 1].path);
    } else {
      router.push("/dashboard"); // Finish profile routing
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      router.push(STEPS[currentStepIndex - 1].path);
    }
  };

  if (!mounted) return null; // Simple hydration fix

  return (
    <div className="flex flex-1 flex-col lg:flex-row pb-[80px]">
      {/* Left Rail */}
      <aside className="w-full lg:w-[320px] lg:border-r border-edge bg-background-secondary/30 p-8 flex flex-col justify-between hidden lg:flex">
        <div>
          <Link href="/" className="flex items-center gap-2 mb-16">
            <Sparkles className="w-5 h-5 text-accent" />
            <span className="font-display font-bold text-xl tracking-tight text-copy-primary">InternConnect</span>
          </Link>

          {/* Progress Ring */}
          <div className="flex flex-col items-center justify-center p-6 bg-white/5 rounded-xl border border-edge mb-12 relative overflow-hidden">
            <svg viewBox="0 0 100 100" className="w-32 h-32 -rotate-90">
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-edge" />
              <circle 
                cx="50" cy="50" r="40" 
                fill="transparent" 
                stroke="currentColor" 
                strokeWidth="8" 
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - completionPct / 100)}`}
                strokeLinecap="round"
                className="text-accent transition-all duration-1000 ease-in-out" 
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-6">
              <span className="text-2xl font-display font-bold text-copy-primary">{completionPct}%</span>
              <span className="text-xs text-copy-muted mt-1 uppercase tracking-widest font-semibold">Complete</span>
            </div>
          </div>

          {/* Step List */}
          <div className="space-y-6">
            {STEPS.map((step, idx) => {
              const isActive = idx === currentStepIndex;
              const isPast = idx < currentStepIndex;
              return (
                <div key={step.id} className="flex items-center gap-4">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors border",
                    isActive ? "bg-accent border-accent text-white shadow-glow" :
                    isPast ? "bg-white/10 border-edge-hover text-copy-primary" : 
                    "bg-transparent border-edge text-copy-muted"
                  )}>
                    {isPast ? "✓" : step.id}
                  </div>
                  <span className={cn(
                    "font-medium",
                    isActive ? "text-copy-primary" : "text-copy-secondary"
                  )}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        <div className="flex-1 max-w-3xl w-full mx-auto p-6 md:p-12 lg:py-16">
          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold text-copy-primary mb-2">
              {currentStep?.title || "Profile Builder"}
            </h1>
            <p className="text-copy-secondary">
              Step {currentStep?.id} of {STEPS.length}
            </p>
          </div>
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             {children}
          </div>
        </div>
      </main>

      {/* Bottom Nav Bar */}
      <div className="fixed bottom-0 left-0 right-0 h-[80px] bg-background/90 backdrop-blur-md border-t border-edge flex items-center z-50">
        <div className="flex-1 flex" />
        <div className="container mx-auto max-w-[1440px] px-6 lg:pl-[344px] flex items-center justify-between">
          <Button variant="ghost" onClick={handleBack} disabled={currentStepIndex === 0}>
            Back
          </Button>

          <div className="flex gap-2">
            {STEPS.map((step, idx) => (
              <button 
                key={step.id}
                onClick={() => router.push(step.path)}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all duration-300",
                  idx === currentStepIndex ? "bg-accent scale-125" : 
                  idx < currentStepIndex ? "bg-white/30" : "bg-white/10"
                )}
              />
            ))}
          </div>

          <Button variant="primary" onClick={handleNext}>
            {currentStepIndex === STEPS.length - 1 ? "Finish Profile" : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
}
