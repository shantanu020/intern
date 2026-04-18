import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Candidate = {
  id: string;
  name: string;
  role: string;
  score: number;
  uni: string;
};

export type ColumnState = {
  applied: Candidate[];
  screened: Candidate[];
  shortlisted: Candidate[];
  interviewing: Candidate[];
  offer: Candidate[];
};

export interface PipelineStore extends ColumnState {
  moveCandidate: (sourceCol: keyof ColumnState, destCol: keyof ColumnState, sourceIndex: number, destIndex: number) => void;
}

const INITIAL_MOCK_DATA: ColumnState = {
  applied: [
    { id: 'c1', name: "Anil Kumar", role: "Frontend Dev", score: 62, uni: "VIT Vellore" },
    { id: 'c2', name: "Sneha Reddy", role: "Frontend Dev", score: 88, uni: "BITS Pilani" }
  ],
  screened: [
    { id: 'c3', name: "Priya Patel", role: "Product Design", score: 92, uni: "NID" },
  ],
  shortlisted: [
    { id: 'c4', name: "Aryan Sharma", role: "Frontend Dev", score: 96, uni: "IIT Bombay" },
  ],
  interviewing: [
    { id: 'c5', name: "Rahul Singh", role: "Growth Marketing", score: 89, uni: "IIM Ahmedabad" }
  ],
  offer: []
};

export const usePipelineStore = create<PipelineStore>()(
  persist(
    (set) => ({
      ...INITIAL_MOCK_DATA,

      moveCandidate: (sourceCol, destCol, sourceIdx, destIdx) => set((state) => {
        const sourceClone = Array.from(state[sourceCol]);
        const destClone = sourceCol === destCol ? sourceClone : Array.from(state[destCol]);
        
        const [removed] = sourceClone.splice(sourceIdx, 1);
        destClone.splice(destIdx, 0, removed);

        return {
          ...state,
          [sourceCol]: sourceClone,
          [destCol]: destClone
        };
      })
    }),
    {
      name: 'internconnect-pipeline-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
