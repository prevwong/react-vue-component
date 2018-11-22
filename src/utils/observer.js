import Dep from "./dep";

function defineReactive(obj, key, val) {
    if ( val!==null && typeof val === 'object') {
        walk(val);
    }

    const dep = new Dep();
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
            dep.depend();
        },
        set: function reactiveSetter(newVal) {
            val = newVal;
            dep.notify();
        }
    })
}

export function walk(obj) {
    const keys = Object.keys(obj);
    for(let i = 0; i < keys.length; i++ ) {
        defineReactive(obj, keys[i], obj[keys[i]])
    }
}