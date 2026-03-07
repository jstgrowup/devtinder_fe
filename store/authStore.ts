import { IUser } from "@/module/auth/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface IAuthStore {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  userIsLoading: boolean;
  setUserLoading: (isLoading: boolean) => void;
  storeLogout: () => void;
}
export const useAuth = create<IAuthStore>()(
  persist(
    (set) => ({
      user: null,
      userIsLoading: true,
      setUser: (newUser) => set({ user: newUser }),
      setUserLoading: (loadingState: boolean) =>
        set({ userIsLoading: loadingState }),
      storeLogout: () => set({ user: null }),
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
