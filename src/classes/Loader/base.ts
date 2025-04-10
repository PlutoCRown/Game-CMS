
type ForageKey = { __Resource: true, __type: string, id: string }
const ResourceMap = new Map<string, Resource>()

export abstract class Resource {
    id: string
    abstract resourceType: string
    constructor(id: string) {
        this.id = id
        ResourceMap.set(id, this)
    }
    get #R(): ForageKey {
        return { __Resource: true, __type: this.resourceType, id: this.id }
    }

    serialze() {
        return this.#serialze(this)
    }

    #serialze(value: any): any {
        if (typeof value === "object" && value !== null) {
            if (value instanceof Resource) return value.#R
            if (Array.isArray(value)) return value.map(this.#serialze)
            const result: any = {};
            for (const [k, v] of Object.entries(value)) {
                result[k] = this.#serialze(v)
            }
            return result;
        }
        return value;
    }

    deserialze() {
        return this.#deserialze(this)
    }
    #deserialze(value: any): any {
        if (typeof value === "object" && value !== null) {
            if ("__Resource" in value) {
                const key = (value as ForageKey).id
                if (!ResourceMap.has(key)) throw new Error(`关联资源时遇到未初始化资源 ${JSON.stringify(value)}`)
                return ResourceMap.get(key)
            }
            if (Array.isArray(value)) return value.map(this.#deserialze)
            const result: any = {};
            for (const [k, v] of Object.entries(value)) {
                result[k] = this.#deserialze(v)
            }
            return result;
        }
        return value;
    }


    toJSON() {
        return this.serialze()
    }
}
