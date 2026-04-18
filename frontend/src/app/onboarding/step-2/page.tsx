"use client";

import React, { useState } from "react";
import { useProfileStore } from "@/store/useProfileStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X, GraduationCap } from "lucide-react";

export default function Step2() {
  const { education, addEducation, removeEducation } = useProfileStore();
  
  const [inst, setInst] = useState("");
  const [degree, setDegree] = useState("");
  const [field, setField] = useState("");
  const [sy, setSy] = useState("");
  const [ey, setEy] = useState("");
  const [cgpa, setCgpa] = useState("");

  const handleAdd = () => {
    if (!inst || !degree || !field) return;
    addEducation({
      id: Date.now().toString(),
      institution: inst,
      degree,
      field,
      startYear: sy,
      endYear: ey,
      cgpa
    });
    setInst(""); setDegree(""); setField(""); setSy(""); setEy(""); setCgpa("");
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      
      {/* Existing Education List */}
      {education.length > 0 && (
        <div className="space-y-4">
          {education.map(edu => (
            <div key={edu.id} className="relative bg-white/5 border border-edge p-5 rounded-xl flex items-start gap-4 hover:border-edge-hover transition-colors">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-5 h-5 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-copy-primary">{edu.degree} in {edu.field}</h3>
                <p className="text-sm text-copy-secondary">{edu.institution}</p>
                <div className="flex gap-4 mt-2 text-xs text-copy-muted font-medium">
                  {edu.startYear && edu.endYear && <span>{edu.startYear} - {edu.endYear}</span>}
                  {edu.cgpa && <span>CGPA: {edu.cgpa}</span>}
                </div>
              </div>
              <button 
                onClick={() => removeEducation(edu.id)}
                className="absolute top-4 right-4 text-copy-muted hover:text-status-red transition-colors"
                aria-label="Remove education"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add New Education Form */}
      <div className="bg-background-secondary/50 border border-edge rounded-xl p-6 space-y-5">
        <h3 className="font-semibold text-copy-primary mb-2">Add Education</h3>
        
        <Input 
          required
          label="Institution" 
          placeholder="e.g. Indian Institute of Technology Bombay" 
          value={inst}
          onChange={(e) => setInst(e.target.value)}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input 
            required
            label="Degree" 
            placeholder="e.g. Bachelor of Technology"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
          />
          <Input 
            required
            label="Field of Study" 
            placeholder="e.g. Computer Science"
            value={field}
            onChange={(e) => setField(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-3 gap-5">
          <Input 
            label="Start Year" 
            placeholder="YYYY"
            value={sy}
            onChange={(e) => setSy(e.target.value)}
          />
          <Input 
            label="End Year" 
            placeholder="YYYY"
            value={ey}
            onChange={(e) => setEy(e.target.value)}
          />
          <Input 
            label="CGPA / Grade" 
            placeholder="e.g. 9.2"
            value={cgpa}
            onChange={(e) => setCgpa(e.target.value)}
          />
        </div>

        <Button 
          variant="outline" 
          className="w-full mt-2 border-dashed"
          onClick={handleAdd}
        >
          <Plus className="w-4 h-4 mr-2" />
          Save Education
        </Button>
      </div>
    </div>
  );
}
