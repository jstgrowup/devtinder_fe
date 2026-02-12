import { IUser } from "@/module/auth/types";
import { create } from "zustand";

interface IAuthStore {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  userIsLoading: boolean;
  setUserLoading: (isLoading: boolean) => void;
  storeLogout: () => void;
}
export const useAuth = create<IAuthStore>((set) => ({
  user: null,
  userIsLoading: true,
  setUser: (newUser) => set({ user: newUser }),
  setUserLoading: (loadingState: boolean) =>
    set({ userIsLoading: loadingState }),
  storeLogout: () => set({ user: null }),
}));
