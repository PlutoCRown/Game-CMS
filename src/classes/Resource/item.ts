import { Item, ItemResource } from "../Loader/item"
import { RecipeResource } from "../Loader/recipt"

const wood = new ItemResource({
    id: 'r1',
    name: 'Wood',
    textIcon: '🪵',
    quality: 'normal',
    description: 'test item',
    image: '',
})
const stone = new ItemResource({
    id: 'r6',
    name: 'Stone',
    textIcon: '🪨',
    quality: 'normal',
    description: 'test item',
    image: '',
})
const craftingTable = new ItemResource({
    id: 'r7',
    name: 'Crafting Table',
    textIcon: '🏭',
    quality: 'legendary',
    description: 'Test Machine',
    image: '',
})
const apple = new ItemResource({
    id: 'r4',
    name: 'Apple',
    textIcon: '🍎',
    quality: 'normal',
    description: 'test item',
    image: '',
})
const grass = new ItemResource({
    id: 'r2',
    name: 'Grass',
    textIcon: '草',
    quality: 'dross',
    description: 'test item',
    image: '',
})
const iron = new ItemResource({
    id: 'r10',
    name: 'Iron',
    textIcon: '铁',
    quality: 'normal',
    description: 'test item',
    image: '',
})
const gear = new ItemResource({
    id: 'r3',
    name: 'Gear',
    textIcon: '⚙️',
    description: 'Make by Iron in hand',
    image: '',
    quality: 'rare',
})
const brick = new ItemResource({
    id: 'r5',
    name: 'Brick',
    textIcon: '🧱',
    description: 'Make by Stone in hand',
    image: '',
    quality: 'rare',
})
const machine = new ItemResource({
    id: 'r7',
    name: 'Machine',
    textIcon: '🏭',
    quality: 'legendary',
    description: 'Test Machine',
    image: '',
})

export const testItem = [wood, stone, craftingTable, apple, grass, iron, gear, brick, machine]

const craftingTableRecipe = new RecipeResource('15', 'Crafting Table Recipe')
craftingTableRecipe.setRecipe([new Item(wood, 4)], [new Item(craftingTable, 1)])

// console.log(craftingTableRecipe.toJSON())

console.log(JSON.stringify([stone, wood, craftingTableRecipe]))
console.log(JSON.stringify([]))