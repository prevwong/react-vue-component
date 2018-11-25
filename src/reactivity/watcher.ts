import Dep, { pushTarget, popTarget } from "../reactivity/dep";
import {Component} from "react";
// import { traverse } from "../reactivity_backup/traverse";
import { isObject } from "../utils";

export default class Watcher {
    comp: Component = null
    cb: Function
    deps: Array<Dep> = []
    depIds: Set<number> = new Set()
    getter: Function = () => {}
    value: any
    oldValue: any
    constructor(comp: Component, value:any, cb: Function = () => {}) {
       this.comp = comp;
       this.cb = cb;
       this.getter = typeof value === "function" ? value : this.parsePath(value);
       this.value = this.get();
       this.oldValue = this.stripGettersSetters();
    }
    stripGettersSetters(){
        return typeof this.value === "object" ? {...this.value} : this.value;
    }
    parsePath(path) {
        const bailRE = /[^\w.$]/
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
    get(){
        let value : any;
        pushTarget(this);
        try {
            value = this.getter.call(this.comp, this.comp);
        } catch(e) {
            console.error("Error in getter", e);
        } finally {
            traverse(value);
            popTarget();
        }

        return value;
    }
    addDep(dep) {
        const {id} = dep;
        if ( !this.depIds.has(id) ) {
            this.depIds.add(id);
            this.deps.push(dep);
            dep.addSub(this);
        }
    }
    update() {
        const value = this.get();
        if ( value !== this.value || isObject(value) ) {
            this.cb.call(this.comp, value, this.oldValue);
            this.oldValue = this.stripGettersSetters();
        }
    }
} 

const traverse = (obj: object) : void => {
    const keys = Object.keys(obj);
    for ( let i = 0; i < keys.length; i++ ) {
        return obj[keys[i]]
    }
}