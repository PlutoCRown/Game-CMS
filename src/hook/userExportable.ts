import { useGlobalStore } from "@/store"

export default () => {
    const store = useGlobalStore()
   return {
      version: 'v0.0.0',
      items:store.item,
      recipes:store.recipe,
      techs:store.technology,
      machines:store.machine.placeable,
      structure:store.machine.structure
    }
  
}