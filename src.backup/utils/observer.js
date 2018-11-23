import Dep from "./dep";

function defineReactive(comp, cb, obj, key, val) {
    if ( val!==null && typeof val === 'object') {
        walk(val);
    }

    const dep = new Dep(comp, key);
    let object = Object.defineProperty(comp.state, key, {
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
            cb(object, key, newVal);
            dep.notify();
        }
    });

    return object;
}

export function walk(comp, cb) {
    let obj = comp.state;
    const keys = Object.keys(obj);
    for(let i = 0; i < keys.length; i++ ) {
        defineReactive(comp, cb, obj, keys[i], obj[keys[i]]);
    }
}

window.Dep = Dep;