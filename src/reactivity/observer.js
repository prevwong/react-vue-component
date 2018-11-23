import Dep from "./dep";
import { extend } from "../utils";

const sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: () => {},
    set: () => {}
}

export function proxy(target, sourceKey, key) {
    sharedPropertyDefinition.get = function proxyGetter() {
        return this[sourceKey][key]
    }
    sharedPropertyDefinition.set = function proxySetter(val) {
        this[sourceKey][key] = val
    }
    Object.defineProperty(target, key, sharedPropertyDefinition)
}

function defineReactive(comp, cb, obj, key, val) {
    if (val !== null && typeof val === 'object') {
        walk(val);
    }
    proxy(comp, 'state', key);
    let object = Object.defineProperty(comp.state, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
            return val;
        },
        set: function reactiveSetter(newVal) {
            if (comp.watch[key]) comp.watch[key].call(comp, newVal, val);
            val = newVal;
            cb(object, key, newVal);
            
        }
    });


    return object;
}

export function walk(comp, cb) {
    let obj = comp.state;
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
        defineReactive(comp, cb, obj, keys[i], obj[keys[i]]);
    }
}
