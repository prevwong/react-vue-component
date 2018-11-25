import { parsePath, isObject } from "../utils";
import { pushTarget, popTarget } from "./dep";
import { traverse } from "./traverse";

let id = 0;
export default class Watcher {
    comp = null
    cb = () => {}
    constructor(comp, expOrFn, cb) {
        this.id = id++;
        this.expOrFn = expOrFn;
        this.comp = comp;
        this.cb = cb;
        // this.deps = [];
        this.newDeps = [];
        this.depIds = new Set();
        this.newDepIds = new Set();
        this.getter = typeof expOrFn === "function" ? expOrFn : parsePath(expOrFn);
        this.value = this.get();
    }
    get(){ 
        console.log("watcher getting", this.id)
        let value;
        pushTarget(this);
        const comp = this.comp;
        try {
            value = this.getter(comp, comp);
        } catch(e) {
            console.error(`Error in getter`, e);
        } finally {
            console.log("traversing now", this.newDeps)
            traverse(value);
            popTarget();
            // this.cleanupDeps()
        }
       
        return value;
    }


    addDep(dep) {
        const id = dep.id;
        if ( !this.newDepIds.has(id) ) {
            this.newDepIds.add(id);
            this.newDeps.push(dep);
            if ( !this.depIds.has(id) ) {
                dep.addSub(this);
            }
        }
    }

    update() {
        const value = this.get()
        if (value !== this.value || isObject(value) ) {
            const oldValue = this.value
            this.value = value;
            this.cb.call(this.vm, value, oldValue)
        }
    }

    depend() {
        // let i = this.deps.length
        // while (i--) {
        //     this.deps[i].depend()
        // }
    }
}
