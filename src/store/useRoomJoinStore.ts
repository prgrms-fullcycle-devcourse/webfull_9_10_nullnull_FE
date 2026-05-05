import { create } from "zustand";

interface RoomJoinState {
  name: string;
  uuid: string;
  set: (name: string, uuid: string) => void;
  clear: () => void;
}

export const useRoomJoinStore = create<RoomJoinState>()((set) => ({
  name: "",
  uuid: "",
  set: (name, uuid) => set({ name, uuid }),
  clear: () => set({ name: "", uuid: "" }),
}));
