export function defineReactive(obj, key, val) {
    const property = Object.getOwnPropertyDescriptor(obj, key)
    if (property && property.configurable === false) {
        return
    }
    const setter = property && property.set

    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter(){
            console.log("getting...")
            return value;
        },
        set: function reactiveSetter(newVal){
            console.log("setting new val", newVal);
            // obj[key] = val;
            if (setter) {
                setter.call(obj, newVal)
            } else {
                val = newVal
            }
        }
    })
}

export class Observer {
    value;
    dep;
    vmCount; // number of vms that has this object as root $data

    constructor(value) {
        this.value = value
        this.dep = new Dep()
        this.vmCount = 0
        def(value, '__ob__', this)
        this.walk(value)
    }

    /**
     * Walk through each property and convert them into
     * getter/setters. This method should only be called when
     * value type is Object.
     */
    walk(obj) {
        const keys = Object.keys(obj)
        for (let i = 0; i < keys.length; i++) {
            defineReactive(obj, keys[i])
        }
    }

}
/**
 * Define a property.
 */
export function def(obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
    })
}


export function observe(value, asRootData) {
    if (!isObject(value) || value instanceof VNode) {
        return
    }
    let ob;
    if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
        ob = value.__ob__
    } else if (
        shouldObserve &&
        !isServerRendering() &&
        (Array.isArray(value) || isPlainObject(value)) &&
        Object.isExtensible(value)
    ) {
        ob = new Observer(value)
    }
    return ob
}

export function set(target, key, val) {
    const ob = target.__ob__;
    console.log("ob", ob)
    if (!ob) {
        target[key] = val;
        return val;
    }

    defineReactive(ob.value, key, val);
    return val;
}
