import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
  cgpa: string;
}

export interface Skill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  link: string;
}

export interface ProfileState {
  // Step 1
  name: string;
  headline: string;
  bio: string;
  location: string;
  
  // Step 2
  education: Education[];
  
  // Step 3
  skills: Skill[];
  
  // Step 4
  projects: Project[];
  
  // Step 5
  availability: {
    duration: string; // Micro, Short-term, Full-term
    hoursPerWeek: number;
    startDate: string;
    workMode: string;
  };
  
  // Step 6
  preferences: {
    domains: string[];
    companyType: string;
    stipendExpectation: number;
  };

  // Actions
  updateField: (field: string, value: any) => void;
  updateNestedField: (section: 'availability' | 'preferences', field: string, value: any) => void;
  addEducation: (edu: Education) => void;
  removeEducation: (id: string) => void;
  addSkill: (skill: Skill) => void;
  removeSkill: (name: string) => void;
  addProject: (project: Project) => void;
  removeProject: (id: string) => void;
  getCompletionPercentage: () => number;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set, get) => ({
      name: '',
      headline: '',
      bio: '',
      location: '',
      education: [],
      skills: [],
      projects: [],
      availability: {
        duration: '',
        hoursPerWeek: 20,
        startDate: '',
        workMode: 'Remote',
      },
      preferences: {
        domains: [],
        companyType: '',
        stipendExpectation: 0,
      },

      updateField: (field, value) => set({ [field]: value }),
      
      updateNestedField: (section, field, value) => set((state) => ({
        [section]: {
          // @ts-ignore
          ...state[section],
          [field]: value
        }
      })),

      addEducation: (edu) => set((state) => ({ education: [...state.education, edu] })),
      removeEducation: (id) => set((state) => ({ education: state.education.filter(e => e.id !== id) })),
      
      addSkill: (skill) => set((state) => {
        if (state.skills.find(s => s.name === skill.name)) return state;
        return { skills: [...state.skills, skill] };
      }),
      removeSkill: (name) => set((state) => ({ skills: state.skills.filter(s => s.name !== name) })),
      
      addProject: (proj) => set((state) => ({ projects: [...state.projects, proj] })),
      removeProject: (id) => set((state) => ({ projects: state.projects.filter(p => p.id !== id) })),

      getCompletionPercentage: () => {
        const state = get();
        let filled = 0;
        let total = 6; // 6 Key indicators from PRD

        if (state.name && state.headline && state.bio && state.location) filled++;
        if (state.education.length > 0) filled++;
        if (state.skills.length >= 3) filled++;
        if (state.projects.length >= 1) filled++;
        if (state.availability.duration && state.availability.hoursPerWeek) filled++;
        if (state.preferences.domains.length > 0) filled++;

        return Math.round((filled / total) * 100);
      }
    }),
    {
      name: 'internconnect-profile-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
