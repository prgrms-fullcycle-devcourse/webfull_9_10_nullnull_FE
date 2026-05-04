import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type User } from "@/features/auth/types/auth.types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
    }),
    {
      name: "auth-storage", // 로컬 스토리지에 저장될 키 이름
    },
  ),
);
