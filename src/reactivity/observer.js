import Dep from "./dep";
import { extend } from "../utils";

export const sharedPropertyDefinition = {
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
            // if (comp.watch[key]) comp.watch[key].call(comp, newVal, val);
            // val = newVal;
            // cb(object, key, newVal);
            val = newVal;
            dep.notify();
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