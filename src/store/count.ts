import { ActionGet, ActionSet } from "../types/store";

export const state = {
  count: 0,
};

export const action = (
  set: ActionSet<typeof state>,
  get: ActionGet<typeof state>
) =>
  ({
    setCount: (value: number) =>
      set((state) => {
        state.count += value; // 用了immer，直接改
      }),
    getCount: () => get().count,
  } as const);
