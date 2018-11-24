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

function defineReactive(obj, key, proto) {
    if (val !== null && typeof val === 'object') {
        walk(val);
    }
    const dep = new Dep();
    let val = obj[key];
    // proxy(comp, 'state', key);
    let childOb = observe(val);
    let object = Object.defineProperty(proto ? Object.getPrototypeOf(obj) : obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
            if ( Dep.target ) {
                dep.depend();
                if (childOb) {
                    childOb.dep.depend()
                    if (Array.isArray(val)) {
                        dependArray(val)
                    }
                }
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
    console.log("target", target);
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



export class Observer { 
    constructor(value, proto) {
        this.proto = proto;
        this.value = value;
        this.dep = new Dep();
        this.compCount = 0;
        this.__ob__ = this;
        console.log("array is ara", value, Array.isArray(value))
        if (Array.isArray(value) ) {
            if (hasProto) {
                protoAugment(this, value, arrayMethods)
            } else {
                copyAugment(value, arrayMethods, arrayKeys)
            }
            this.observeArray(value)
        } else {
            this.walk(value);
        }
        
    }
    walk(obj) {
        const keys = Object.keys(obj);
        for ( let i = 0; i < keys.length; i++ ) {
            defineReactive(obj, keys[i], this.proto)
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

export const observe = (value, asRootData) => {
    let ob;
    if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
        ob = value.__ob__
    } else if ((Array.isArray(value) || isPlainObject(value))) {
        ob = new Observer(value);
    }

    if (asRootData && ob) {
        ob.vmCount++
    }
    return ob
}