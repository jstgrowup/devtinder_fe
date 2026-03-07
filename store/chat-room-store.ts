import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface IChatRoomStore {
  token: string | null;
  setToken: (newToken: string) => void;
  roomId: string | null;
  setRoomId: (roomId: string) => void;
  toUserId: string | null;
  setToUserId: (userId: string) => void;
  userName: string | null;
  setUserName: (firstName: string) => void;
  resetChatRoom: () => void;
}

export const useChatRoomStore = create<IChatRoomStore>()(
  persist(
    (set) => ({
      token: null,
      setToken: (newToken: string | null) => set({ token: newToken }),
      roomId: null,
      setRoomId: (newRoomId: string | null) => set({ roomId: newRoomId }),
      toUserId: null,
      setToUserId: (newToUserId: string | null) =>
        set({ toUserId: newToUserId }),
      userName: null,
      setUserName: (newUserName: string | null) =>
        set({ userName: newUserName }),
      resetChatRoom: () =>
        set({ token: null, roomId: null, toUserId: null, userName: null }),
    }),
    {
      name: "chat-room-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
