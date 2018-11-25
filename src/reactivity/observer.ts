import { isObject, isPlainObject } from "../utils";
import Dep from "./dep";

interface ObservedObject {
    __ob__?
}

export class Observer implements ObservedObject {
    __ob__: Observer = this
    value: ObjectConstructor = null
    dep: Dep = new Dep()
    constructor(value) {
        
        this.value = value;
        this.walk();
        Object.defineProperty(value, "__ob__", {
            enumerable: false,
            value: this
        })
    }
    walk() {
        const keys = Object.keys(this.value);
        for ( let i = 0; i < keys.length; i++ ) {
            defineReactive(this.value, keys[i]);
        }
    }
}

export function defineReactive(obj: object, key: string): object {
    let value = obj[key],
        stripValue = typeof value === "object" ? {...value} : value;
    const dep = new Dep();
    // const childOb
    const childOb = observe(value);
    return Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
            if (Dep.target) {
                dep.depend();
                if (childOb) {
                    childOb.dep.depend();
                }
            }
            return value;
        },
        set: function reactiveSetter(newValue:any) {
            value = newValue;
            dep.notify();
        }
    })
}

export function observe(value: any) : Observer {
    if ( value.hasOwnProperty("__ob__") || value instanceof Observer ) {
        return value.__ob__;
    } else if ( Array.isArray(value) || isPlainObject(value) ) {
        return new Observer(value);
    }
}



export function set(obj: ObservedObject, key: string, value: any): void {
    const ob = obj.__ob__;

    console.log(ob);
}