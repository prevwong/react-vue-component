import Dep from "./dep";
import { extend, def, hasOwn, isPlainObject, hasProto } from "../utils";
import { arrayMethods } from "./array";

export const sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: () => {},
    set: () => {}
}

export function proxy(target, key, ...args) {
    let get, set;
    if ( args.length === 2 ) {
        get = args[0];
        set = args[1];
    } else if ( args.length === 1 && typeof args[0] === "string" ) {
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


export class Observer {
    constructor(value) {
        console.log("Crested observer", value);
        this.value = value;
        this.dep = new Dep();
        this.compCount = 0;
        this.__ob__ = this;
        if (Array.isArray(value)) {
            if (hasProto) {
                protoAugment(this, value, arrayMethods)
            } else {
                copyAugment(value, arrayMethods, arrayKeys)
            }
            this.observeArray(value)
        } else {
            console.log("gonna walk")
            this.walk(value);
        }

    }
    walk(obj) {
        const keys = Object.keys(obj);
        for (let i = 0; i < keys.length; i++) {
            console.log("walk index", i, obj);
            defineReactive(obj, keys[i])
        }
    }
    /**
   * Observe a list of Array items.
   */
    observeArray(items) {
        for (let i = 0, l = items.length; i < l; i++) {
            observe(items[i])
        }
    }
}

export const observe = (value) => {
    let ob;
    if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
        ob = value.__ob__
    } else if ((Array.isArray(value) || isPlainObject(value))) {
        ob = new Observer(value);
    }
    return ob
}

function defineReactive(obj, key, proto) {
    if (val !== null && typeof val === 'object') walk(val);
    
    const dep = new Dep();
    console.log("made dep", obj);
    let val = obj[key];
    let object = Object.defineProperty(proto ? Object.getPrototypeOf(obj) : obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
            console.log("getting", obj, key, Dep.target);
            if ( Dep.target ) {
                dep.depend();
            }
            return val;
        },
        set: function reactiveSetter(newVal) {
            val = newVal;
            dep.notify();
        }
    });


    return object;
}


function dependArray(value) {
    for (let e, i = 0, l = value.length; i < l; i++) {
        e = value[i]
        e && e.__ob__ && e.__ob__.dep.depend()
        if (Array.isArray(e)) {
            
            dependArray(e)
        }
    }
}

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment(comp, target, src) {
    /* eslint-disable no-proto */
    src.__ob__ = comp;
    target.__proto__ = src
    /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment(target, src, keys) {
    for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i]
        def(target, key, src[key])
    }
}

export function set(target, key, val) {
    if (Array.isArray(target) && isValidArrayIndex(key)) {
        target.length = Math.max(target.length, key)
        target.splice(key, 1, val)
        return val
    }
    if (key in target && !(key in Object.prototype)) {
        target[key] = val
        return val
    }
    const ob = (target).__ob__
    if (!ob) {
        target[key] = val
        return val
    }
    defineReactive(ob.value, key, val)
    ob.dep.notify()
    return val
}