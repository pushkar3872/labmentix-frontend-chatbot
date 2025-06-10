import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,
      setAuthenticated: (value) => set({ isAuthenticated: value }),
      setToken: (token) => set({ token }),
      clearAuth: () => set({ isAuthenticated: false, token: null }),
    }),
    {
      name: 'auth-storage', // key in localStorage
    }
  )
);