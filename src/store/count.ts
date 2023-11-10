import { Action } from "../types/store";

export const state = {
  count: 0,
};

export const action: Action<typeof state> = (set, get) => ({
  setCount: (value: number) =>
    set((state) => {
      state.count += value; // 用了immer，直接改
    }),
  getCount: () => get().count,
});
