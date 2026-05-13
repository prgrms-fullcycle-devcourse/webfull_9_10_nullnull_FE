import { create } from "zustand";
import type { BlockedSlot } from "@/features/room/types/room";

interface RoomJoinState {
  name: string;
  uuid: string;
  blockedSlots: BlockedSlot[];
  fromSchedule: boolean;
  set: (name: string, uuid: string) => void;
  setBlockedSlots: (slots: BlockedSlot[]) => void;
  clear: () => void;
}

export const useRoomJoinStore = create<RoomJoinState>()((set) => ({
  name: "",
  uuid: "",
  blockedSlots: [],
  fromSchedule: false,
  set: (name, uuid) => set({ name, uuid }),
  setBlockedSlots: (blockedSlots) => set({ blockedSlots, fromSchedule: true }),
  clear: () =>
    set({ name: "", uuid: "", blockedSlots: [], fromSchedule: false }),
}));
