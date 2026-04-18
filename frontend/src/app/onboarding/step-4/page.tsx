"use client";

import React, { useState } from "react";
import { useProfileStore } from "@/store/useProfileStore";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, X, FolderGit2, Link as LinkIcon } from "lucide-react";

export default function Step4() {
  const { projects, addProject, removeProject } = useProfileStore();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

  const handleAdd = () => {
    if (!title || !description || projects.length >= 4) return;
    addProject({
      id: Date.now().toString(),
      title,
      description,
      link
    });
    setTitle(""); setDescription(""); setLink("");
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      
      <p className="text-copy-secondary">
        Add up to 4 significant projects. Live links to GitHub, Figma, or deployed apps carry the most weight.
      </p>

      {/* Existing Projects List */}
      {projects.length > 0 && (
        <div className="space-y-4">
          {projects.map(proj => (
            <div key={proj.id} className="relative bg-white/5 border border-edge p-5 rounded-xl hover:border-edge-hover transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent-light/10 flex items-center justify-center flex-shrink-0">
                  <FolderGit2 className="w-6 h-6 text-accent-light" />
                </div>
                <div className="flex-1 pr-8">
                  <h3 className="font-semibold text-copy-primary text-lg">{proj.title}</h3>
                  <p className="text-sm text-copy-secondary mt-1">{proj.description}</p>
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 mt-3 text-xs font-medium text-accent hover:text-accent-light transition-colors">
                      <LinkIcon className="w-3.5 h-3.5" /> View Project
                    </a>
                  )}
                </div>
              </div>
              <button 
                onClick={() => removeProject(proj.id)}
                className="absolute top-4 right-4 text-copy-muted hover:text-status-red transition-colors"
                aria-label="Remove project"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add New Project Form */}
      {projects.length < 4 && (
        <div className="bg-background-secondary/50 border border-edge rounded-xl p-6 space-y-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-copy-primary">Add Project</h3>
            <span className="text-xs text-copy-muted">{projects.length} / 4 Added</span>
          </div>
          
          <Input 
            required
            label="Project Title" 
            placeholder="e.g. InternConnect Frontend" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          
          <Input 
            label="Project Link (Optional)" 
            placeholder="https://github.com/..." 
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />

          <Textarea 
            required
            label="Description" 
            placeholder="Describe the problem you solved, your role, and the tech stack used."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={300}
          />

          <Button 
            variant="outline" 
            className="w-full mt-2 border-dashed"
            onClick={handleAdd}
          >
            <Plus className="w-4 h-4 mr-2" />
            Save Project
          </Button>
        </div>
      )}

      {projects.length >= 4 && (
        <div className="text-center p-6 border border-edge border-dashed rounded-xl bg-white/5">
          <p className="text-sm text-copy-secondary">You have added the maximum of 4 projects.</p>
        </div>
      )}

    </div>
  );
}
