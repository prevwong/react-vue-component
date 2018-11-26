import { isPlainObject } from "../utils";
import Dep from "./dep";
import InspectedObject from "../types/InspectedObject";
import { arrayMethods } from "./array";

interface ArrObject {
    __proto__? : any
}

export class Observer  {
    __ob__: Observer = this
    value: object = null
    dep: Dep = new Dep()
    constructor(value: any) {
        this.value = value;
        if ( Array.isArray(value) ) {
            (value as ArrObject).__proto__ = arrayMethods;
            this.observeArray(value);
        } else if ( typeof value == "object" ) {
            this.walk();
        }
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
    observeArray(arr: Array<any>){
        arr.forEach(item => {
            observe(item);
        })
    }
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
                    dependArray(value);
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



export function set(obj: InspectedObject, key: string, value: any): void {
    const ob = obj.__ob__;

    console.log(ob);
}