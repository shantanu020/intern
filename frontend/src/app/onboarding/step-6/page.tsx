"use client";

import React from "react";
import { useProfileStore } from "@/store/useProfileStore";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Target, Banknote, Building2 } from "lucide-react";

const DOMAINS = [
  "Engineering & Development", "Design (UI/UX)", "Product Management",
  "Data Science & AI", "Growth & Marketing", "Content & Copywriting",
  "Operations", "Finance"
];

const COMPANY_TYPES = ["B2B SaaS", "Consumer Tech", "Deep Tech", "Fintech", "Agency", "Any Company Type"];

export default function Step6() {
  const { preferences, updateNestedField } = useProfileStore();

  const toggleDomain = (domain: string) => {
    const current = preferences.domains;
    if (current.includes(domain)) {
      updateNestedField('preferences', 'domains', current.filter(d => d !== domain));
    } else {
      updateNestedField('preferences', 'domains', [...current, domain]);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in">
      
      {/* Domains Selection */}
      <section>
        <h3 className="text-sm font-semibold text-copy-primary mb-1 flex items-center gap-2">
          <Target className="w-4 h-4 text-accent" /> Professional Domains
        </h3>
        <p className="text-sm text-copy-muted mb-4">Select domains you want to work in.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {DOMAINS.map(domain => {
            const isSelected = preferences.domains.includes(domain);
            return (
              <label 
                key={domain} 
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg border border-edge cursor-pointer transition-colors",
                  isSelected ? "bg-accent/10 border-accent/50" : "bg-white/5 hover:border-edge-hover"
                )}
              >
                <input 
                  type="checkbox" 
                  checked={isSelected}
                  onChange={() => toggleDomain(domain)}
                  className="rounded border-edge bg-white/5 accent-accent w-4 h-4" 
                /> 
                <span className={cn("text-sm", isSelected ? "text-copy-primary font-medium" : "text-copy-secondary")}>
                  {domain}
                </span>
              </label>
            )
          })}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Company Types */}
        <section>
          <h3 className="text-sm font-semibold text-copy-primary mb-4 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-accent" /> Preferred Company
          </h3>
          <select 
            className="flex h-11 w-full rounded-md border border-edge-hover bg-white/5 px-3 py-2 text-[0.9rem] text-copy-primary focus:outline-none focus:border-accent appearance-none disabled:cursor-not-allowed disabled:opacity-50"
            value={preferences.companyType}
            onChange={(e) => updateNestedField('preferences', 'companyType', e.target.value)}
          >
            <option value="" disabled className="text-copy-muted">Select Company Type</option>
            {COMPANY_TYPES.map(type => (
              <option key={type} value={type} className="bg-background-secondary text-copy-primary">{type}</option>
            ))}
          </select>
        </section>

        {/* Stipend Expectation */}
        <section className="bg-background-secondary/50 p-6 rounded-xl border border-edge">
          <h3 className="text-sm font-semibold text-copy-primary mb-4 flex items-center gap-2">
            <Banknote className="w-4 h-4 text-status-amber" /> Minimum Target Stipend
          </h3>
          <Slider 
            min={0}
            max={5000}
            step={100}
            value={preferences.stipendExpectation}
            onChange={(e) => updateNestedField('preferences', 'stipendExpectation', parseInt(e.target.value))}
            valuePrefix="$"
            valueSuffix="/mo"
          />
          <div className="flex justify-between text-xs text-copy-muted mt-2">
            <span>$0 (Unpaid fine)</span>
            <span>$5000+</span>
          </div>
        </section>
      </div>

    </div>
  );
}
