import React from "react";
import OnboardingClient from "@/components/onboarding/OnboardingClient";

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <OnboardingClient>
        {children}
      </OnboardingClient>
    </div>
  );
}
