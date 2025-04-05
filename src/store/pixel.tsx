import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createJSONStorage, persist } from "zustand/middleware";

// 扩展请 & 类型
type State = {
  list: string[];
};

type Action = {};

export const usePixel = create<State & Action>()(
  persist(
    immer((set, get) => ({
      list: [],
    })),
    {
      name: "pixel-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const addPixelArt = (pixel: string) => {
  usePixel.setState((state) => {
    state.list.push(pixel);
  });
};
