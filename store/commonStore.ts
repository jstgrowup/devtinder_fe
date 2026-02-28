import { create } from "zustand";

interface ICommonStore {
  isSubscriptionModal: boolean;
  setIsSubscriptionModal: (user: boolean) => void;
}
export const useAuth = create<ICommonStore>((set) => ({
  isSubscriptionModal: false,
  setIsSubscriptionModal: (isOpen: boolean) =>
    set({ isSubscriptionModal: isOpen }),
}));
