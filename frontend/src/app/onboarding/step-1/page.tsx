"use client";

import React, { useState } from "react";
import { useProfileStore } from "@/store/useProfileStore";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles, Upload } from "lucide-react";

export default function Step1() {
  const { name, headline, bio, location, updateField } = useProfileStore();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateBio = () => {
    setIsGenerating(true);
    setTimeout(() => {
      updateField('bio', `Ambitious ${headline || 'student'} based in ${location || 'the world'}, passionate about building scalable user experiences and deeply interested in pushing the boundaries of web development. Eager to bring fresh perspectives to a dynamic startup environment.`);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in relative">
      <div className="flex flex-col sm:flex-row gap-8">
        
        {/* Photo Upload Mock */}
        <div className="flex flex-col items-center space-y-4">
          <div className="w-32 h-32 rounded-2xl bg-white/5 border border-edge border-dashed flex flex-col items-center justify-center text-copy-muted cursor-pointer hover:bg-white/10 hover:border-accent transition-colors group">
            <Upload className="w-6 h-6 mb-2 group-hover:text-accent transition-colors" />
            <span className="text-xs font-medium">Upload Photo</span>
          </div>
          <span className="text-xs text-copy-muted text-center max-w-[120px]">JPG, PNG or GIF. Max size of 5MB.</span>
        </div>

        {/* Form Fields */}
        <div className="flex-1 space-y-5">
          <Input 
            required
            label="Full Name" 
            placeholder="Aryan Sharma" 
            value={name}
            onChange={(e) => updateField('name', e.target.value)}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input 
              required
              label="Professional Headline" 
              placeholder="e.g. B.Tech CSE, IIT Bombay"
              value={headline}
              onChange={(e) => updateField('headline', e.target.value)}
            />
            <Input 
              required
              label="Location" 
              placeholder="Mumbai, India"
              value={location}
              onChange={(e) => updateField('location', e.target.value)}
            />
          </div>

          <div className="relative">
            <Textarea 
              required
              label="About You" 
              placeholder="Write a short summary about your goals and interests..."
              value={bio}
              onChange={(e) => updateField('bio', e.target.value)}
              maxLength={400}
            />
            <Button 
              variant="secondary" 
              size="sm" 
              className="absolute right-2 bottom-3"
              onClick={handleGenerateBio}
              disabled={isGenerating}
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-accent" />
              {isGenerating ? "Generating..." : "AI Writer"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
