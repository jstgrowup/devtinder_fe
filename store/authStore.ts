import { IUser } from "@/module/auth/types";
import { create } from "zustand";

interface IAuthStore {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}
export const useAuth = create<IAuthStore>((set) => ({
  user: null,
  setUser: (newUser) => set({ user: newUser }),
  logout: () => set({ user: null }),
}));
