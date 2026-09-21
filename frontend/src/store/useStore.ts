import { create } from 'zustand';
import type { User, Submission } from '../types';
import apiClient, { mockUser } from '../api/client';

interface Store {
  user: User | null;
  lastSubmission: Submission | null;
  loadUser: () => Promise<void>;
  runCode: (taskId: string, code: string) => Promise<void>;
}

export const useStore = create<Store>((set) => ({
  user: null,
  lastSubmission: null,
  loadUser: async () => {
    const u = await apiClient.getUser();
    set({ user: u ?? mockUser });
  },
  runCode: async (taskId, code) => {
    const sub = await apiClient.submitCode(taskId, code);
    set({ lastSubmission: sub });
  },
}));
