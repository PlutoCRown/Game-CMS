import { IMachine, Machine } from "@/types/Machine";
import { ActionSet, ActionGet } from "@/types/store";

export const MachineAsset = {
  machine: {
    placeable: [
      {
        id: "m1",
        name: "Machine",
        item: "r7",
        image: "",
        textIcon: "",
        fuelType: "N",
        fuelValue: 0,
        slotType: "free",
      },
    ] as IMachine[],
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
