import { create } from "zustand";

type FeedbackResult = "waiting" | "absent";

interface FeedbackState {
  result: FeedbackResult | null;
  set: (result: FeedbackResult) => void;
  clear: () => void;
}

export const useFeedbackStore = create<FeedbackState>()((set) => ({
  result: null,
  set: (result) => set({ result }),
  clear: () => set({ result: null }),
}));
