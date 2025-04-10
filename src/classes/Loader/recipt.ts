import { Resource } from "./base";
import { Item } from "./item";


export class RecipeResource extends Resource {
    name: string = 'Default Recipe'
    resourceType = 'recipe'
    inputs: Item[] = []
    outputs: Item[] = []
    prototype: string[] = []

    constructor(id: string, name: string) {
        super(id)
        this.name = name
    }

    setRecipe(inputs: Item[], outputs: Item[]) {
        this.inputs = inputs
        this.outputs = outputs
    }
}

export class Recipe {
    resource: RecipeResource
    num: number = 1
    countdown: number = 0
    constructor(item: RecipeResource, num: number = 1) {
        this.resource = item
        this.num = num
    }
}