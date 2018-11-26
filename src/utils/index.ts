import VueIshComponent from "../types/VueIshComponent";

export function proxy(target:object, key:string, ...args: any[]): object {
    let get, set;
    if (args.length === 2) {
        get = args[0];
        set = args[1];
    } else if (args.length === 1 && typeof args[0] === "string") {
        get = function proxyGetter(): any {
            return this[args[0]][key]
        }
        set = function proxySetter(val): void {
            this[args[0]][key] = val
        }
    }
    return Object.defineProperty(target, key, {
        enumerable: true,
        configurable: true,
        get,
        set
    });
}


export function remove(arr: any[], item: any): any[]{
    if (arr.length) {
        const index = arr.indexOf(item)
        if (index > -1) return arr.splice(index, 1)
    }
}

export function uniqueObjectKeys(ob: VueIshComponent, target:string, victims:string[], cb: Function): void {  
    const targetKeys = Object.keys(ob[target]);
    for ( let i = 0; i < targetKeys.length; i++ ) {
        let existsIn: boolean | string = false;
        const key = targetKeys[i];
        for (let j = 0; j < victims.length; j++) {
            if (ob[victims[j]][key]) {
                existsIn = victims[j];
                break;
            }
        }
        if (!existsIn) cb(key);
        else warn(`(${target} - '${key}') is already defined in ${existsIn}`);
    }    
}

export const isPlainObject = (obj: object): boolean => toString.call(obj) === '[object Object]'
export const isObject = (obj: object): boolean => obj !== null && typeof obj === 'object'
export const hasProto = '__proto__' in {}
export const warn = (msg: string): void => console.error(`[v-react warn]: ${msg}`);

