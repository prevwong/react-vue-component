
export const sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: () => { },
    set: () => { }
}

export function proxy(target, key, ...args) {
    let get, set;
    if (args.length === 2) {
        get = args[0];
        set = args[1];
    } else if (args.length === 1 && typeof args[0] === "string") {
        get = function proxyGetter() {
            return this[args[0]][key]
        }
        set = function proxySetter(val) {
            this[args[0]][key] = val
        }
    }
    sharedPropertyDefinition.get = get;
    sharedPropertyDefinition.set = set;
    Object.defineProperty(target, key, sharedPropertyDefinition)
}

