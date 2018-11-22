import Dep from "./dep";

function defineReactive(cb, obj, key, val) {
    if ( val!==null && typeof val === 'object') {
        walk(val);
    }

    const dep = new Dep();
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
            console.log("accessed", key)
            if ( Dep.target ) {
                dep.depend();
            }
            return val;
        },
        set: function reactiveSetter(newVal) {
            val = newVal;
            cb(obj, key, newVal);
            dep.notify();
        }
    })
}

export function walk(obj, cb) {
    const keys = Object.keys(obj);
    for(let i = 0; i < keys.length; i++ ) {
        defineReactive(cb, obj, keys[i], obj[keys[i]])
    }
}

window.Dep = Dep;