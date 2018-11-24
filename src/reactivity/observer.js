import Dep from "./dep";
import { extend } from "../utils";

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
    let object = Object.defineProperty(proto ? Object.getPrototypeOf(obj) : obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
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


export class Observer { 
    constructor(value, proto) {
        this.proto = proto;
        this.value = value;
        this.dep = new Dep();
        this.compCount = 0;
        this.walk(value);
    }
    walk(obj) {
        const keys = Object.keys(obj);
        for ( let i = 0; i < keys.length; i++ ) {
            defineReactive(obj, keys[i], this.proto)
        }
    }
}

export const observe = (value, proto) => {
    let ob = new Observer(value, proto);
    return ob;
}