import { create } from "zustand";
import type { IUser } from "../types";
interface IAuthStore {
  user: IUser | null;
  setUser: (user: IUser) => void;
}
export const useAuth = create<IAuthStore>((set) => ({
  user: null,
  setUser: (newUser) => set({ user: newUser }),
  logout: () => set({ user: null }),
}));
