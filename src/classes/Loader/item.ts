import { IItem, ItemQuality } from "@/types/Item"
import { Resource } from "./base";

export class ItemResource extends Resource {
    name: string = 'Default Item'
    resourceType = 'item'

    description: string = 'Default Item';
    image: string = '';
    textIcon: string = '🆕';
    // 灰 白 绿 蓝 紫 红
    quality: ItemQuality = 'dross';
    prototype: string[]

    constructor(item: IItem) {
        super(item.id);
        this.prototype = []
            ; (Object.keys(item) as (keyof IItem)[]).forEach((key) => this[key] = item[key] as any)
    }
}

export class Item {
    resource: ItemResource
    num: number = 1
    constructor(item: ItemResource, num: number = 1) {
        this.resource = item
        this.num = num
    }
}

