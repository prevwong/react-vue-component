export function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key)
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