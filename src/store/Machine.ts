import { IMachine } from "@/types/Biz";
import { ActionSet, ActionGet } from "@/types/store";

export const MachineAsset = {
  machine: [] as IMachine[],
};

export const MachineAction = (
  set: ActionSet<typeof MachineAsset>,
  get: ActionGet<typeof MachineAsset>
) => ({
  machineAction: {
    addItemAsset: (machine: IMachine) =>
      set((state) => {
        state.machine.push(machine);
      }),
    getItem: () => get().machine,
  },
});
