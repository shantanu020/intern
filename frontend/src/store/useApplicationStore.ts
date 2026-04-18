import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface ApplicationState {
  startDate: string;
  hoursPerWeek: number;
  phone: string;
  portfolioUrl: string;
  caseStudies: string[];
  coverLetter: string;
  relevantExp: string;
  agreedToToS: boolean;
  agreedToCommitment: boolean;
  agreedToAccuracy: boolean;
}

interface ApplicationStore {
  data: ApplicationState;
  updateData: (updates: Partial<ApplicationState>) => void;
  resetDoc: () => void;
}

const initialState: ApplicationState = {
  startDate: 'Immediate',
  hoursPerWeek: 20,
  phone: '',
  portfolioUrl: '',
  caseStudies: [],
  coverLetter: '',
  relevantExp: '',
  agreedToToS: false,
  agreedToCommitment: false,
  agreedToAccuracy: false,
};

export const useApplicationStore = create<ApplicationStore>()(
  persist(
    (set) => ({
      data: initialState,
      updateData: (updates) => set((state) => ({ data: { ...state.data, ...updates } })),
      resetDoc: () => set({ data: initialState })
    }),
    {
      name: 'internconnect-apply-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
