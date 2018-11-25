export function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key)
}



export const sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: () => { },
    set: () => { }
}

export function proxy(target, key, ...args) {
    let get, set;
    if (args.length === 2) {
        get = args[0];
        set = args[1];
    } else if (args.length === 1 && typeof args[0] === "string") {
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



/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
export function isPlainObject(obj) {
    return toString.call(obj) === '[object Object]'
}


export function isObject(obj) {
    return obj !== null && typeof obj === 'object'
}



export function extend(to, _from) {
    for (const key in _from) {
        to[key] = _from[key]
    }
    return to
}

/**
 * Parse simple path.
 */
const bailRE = /[^\w.$]/
export function parsePath(path) {
    if (bailRE.test(path)) {
        return
    }
    const segments = path.split('.')

    return function (obj) {
        for (let i = 0; i < segments.length; i++) {
            if (!obj) return
            obj = obj[segments[i]]
        }
        return obj
    }
}

export function remove(arr, item){
    if (arr.length) {
        const index = arr.indexOf(item)
        if (index > -1) {
            return arr.splice(index, 1)
        }
    }
}

export function uniqueObjectKeys(ob, target, ...args) {  
    const targetKeys = Object.keys(ob[target]);
    const destination = args.slice(0, args.length - 1);
    const cb = args[args.length - 1];

    for ( let i = 0; i < targetKeys.length; i++ ) {
        let existsIn = false;
        const key = targetKeys[i];
        for (let j = 0; j < destination.length; j++) {
            if (ob[destination[j]][key]) {
                existsIn = destination[j];
                break;
            }
        }
        if (!existsIn) cb(key);
        else warn(`(${target} - '${key}') is already defined in ${existsIn}`);
    }    
}

export function warn(msg) {
    console.error(`[v-react warn]: ${msg}`);
}

export function def(obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
    })
}

export const hasProto = '__proto__' in {}

/* istanbul ignore next */
export function isNative(Ctor) {
    return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}


let _Set
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
    // use native Set when available.
    _Set = Set
} else {
    // a non-standard Set polyfill that only works with primitive keys.
    _Set = class Set  {
        set;
        constructor() {
            this.set = Object.create(null)
        }
        has(key) {
            return this.set[key] === true
        }
        add(key) {
            this.set[key] = true
        }
        clear() {
            this.set = Object.create(null)
        }
    }
}

export {
    _Set
}