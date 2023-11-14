import { IMachine, Machine } from "@/types/Biz";
import { ActionSet, ActionGet } from "@/types/store";

export const MachineAsset = {
  machine: {
    placeable: [] as IMachine[],
    structure: [] as Machine[],
    NONE: "Hand",
  },
};

export const MachineAction = (
  set: ActionSet<typeof MachineAsset>,
  get: ActionGet<typeof MachineAsset>
) => ({
  machineAction: {
    addPlaceable: (machine: IMachine) =>
      set((state) => {
        state.machine.placeable.push(machine);
      }),
    getItem: () => get().machine,
  },
});
