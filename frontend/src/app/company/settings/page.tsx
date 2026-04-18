"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Building, 
  User, 
  CreditCard, 
  Shield, 
  Settings,
  Globe,
  Mail,
  Users,
  Briefcase,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function CompanySettingsPage() {
  const [activeSubTab, setActiveSubTab] = useState("Profile");

  return (
    <div className="space-y-8 animate-in fade-in pb-20">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-copy-primary">Workspace Settings</h1>
        <p className="text-copy-secondary mt-1">Manage your company profile, multi-user access, and billing preferences.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Navigation Rail */}
        <aside className="w-full lg:w-48 shrink-0">
          <nav className="flex lg:flex-col gap-1 overflow-x-auto pb-2 scrollbar-hide">
            {[
              { id: "Profile", icon: Building },
              { id: "Team", icon: Users },
              { id: "Billing", icon: CreditCard },
              { id: "Security", icon: Shield },
              { id: "API", icon: Settings },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap",
                  activeSubTab === tab.id 
                    ? "bg-accent/10 text-accent font-semibold" 
                    : "text-copy-secondary hover:bg-white/5 hover:text-copy-primary"
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.id}
              </button>
            ))}
          </nav>
        </aside>

        {/* Form Stage */}
        <div className="flex-1 space-y-6">
          
          {activeSubTab === "Profile" && (
            <div className="space-y-6">
              <Card className="bg-background border-edge">
                <CardContent className="p-6">
                  <h3 className="font-display font-bold text-lg mb-6 flex items-center gap-2">
                    <Building className="w-5 h-5 text-copy-muted" /> Company Profile
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 rounded-xl bg-white/5 border border-edge border-dashed flex flex-col items-center justify-center text-copy-muted hover:bg-white/10 hover:border-accent transition-all cursor-pointer group">
                         <span className="text-[10px] font-bold uppercase tracking-wider group-hover:text-accent transition-colors">Logo</span>
                      </div>
                      <div className="flex-1 space-y-1">
                        <h4 className="font-semibold text-copy-primary text-sm">Workspace Identity</h4>
                        <p className="text-xs text-copy-muted">This logo will be displayed on all your job listings and intern interactions.</p>
                        <div className="flex gap-2 mt-2">
                          <Button variant="outline" size="sm" className="h-8">Change Logo</Button>
                          <Button variant="ghost" size="sm" className="h-8 text-status-red">Remove</Button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
                      <Input label="Company Name" value="Draftly HQ" />
                      <Input label="Workspace URL" value="draftly.internconnect.io" />
                      <Input label="Website Link" value="https://draftly.design" />
                      <Input label="Industry" value="Product Design & Development" />
                    </div>

                    <div className="pt-4">
                      <label className="text-sm font-medium text-copy-primary block mb-2">Company Description</label>
                      <textarea 
                        className="w-full bg-white/5 border border-edge rounded-md p-3 text-sm text-copy-primary focus:outline-none focus:border-accent min-h-[120px]"
                        defaultValue="Draftly is a YC-backed startup focused on making design systems accessible for high-growth engineering teams."
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end pt-4">
                <Button variant="primary">Save Changes</Button>
              </div>
            </div>
          )}

          {activeSubTab === "Billing" && (
            <div className="space-y-6">
               <Card className="bg-background border-edge">
                 <CardContent className="p-6">
                   <h3 className="font-display font-bold text-lg mb-6">Subscription Plan</h3>
                   <div className="bg-gradient-to-r from-accent/20 to-accent-2/10 border border-accent/30 rounded-xl p-5 flex items-center justify-between">
                     <div>
                       <Badge variant="success" className="mb-2">Scale Plan</Badge>
                       <div className="text-2xl font-display font-bold text-copy-primary">$199<span className="text-sm font-sans font-normal text-copy-secondary">/month</span></div>
                       <p className="text-xs text-copy-muted mt-2">Your next bill is for $199.00 on Nov 12, 2025.</p>
                     </div>
                     <Button variant="outline" className="bg-white/10 hover:bg-white/20 border-accent/20">Manage Plan</Button>
                   </div>
                 </CardContent>
               </Card>

               <Card className="bg-background border-edge">
                 <CardContent className="p-6">
                   <h3 className="font-display font-bold text-lg mb-2">Payment Methods</h3>
                   <div className="divide-y divide-edge">
                      <div className="py-4 flex items-center justify-between">
                        <div className="flex items-center gap-4 font-medium text-sm text-copy-primary">
                          <div className="w-10 h-10 rounded border border-edge bg-white/5 flex items-center justify-center">
                             <CreditCard className="w-5 h-5 text-copy-muted" />
                          </div>
                          Visa ending in 4242
                        </div>
                        <Badge variant="outline">Default</Badge>
                      </div>
                   </div>
                   <Button variant="ghost" size="sm" className="mt-4 text-accent hover:text-accent-light px-0">Add new method</Button>
                 </CardContent>
               </Card>
            </div>
          )}

          {activeSubTab !== "Profile" && activeSubTab !== "Billing" && (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-background/50 rounded-2xl border border-edge border-dashed">
               <Settings className="w-8 h-8 text-copy-muted opacity-20 mb-4" />
               <p className="text-copy-secondary">These settings are restricted to Workspace Admins.</p>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
