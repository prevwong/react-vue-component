import { defineReactive } from "./observer";
import { remove } from "../utils";
let uid = 0;
export default class Dep {
    static target
    id
    constructor() {
        this.id = uid++;
        this.subs = [];
        // this.component = comp;
        // this.key = key;
        // this.subs = new Set();
    }

    addSub(sub) {
        this.subs.push(sub);
    }

    removeSub(sub) {
        remove(this.subs, sub)
    }
    depend() {
        if (Dep.target) {
            Dep.target.addDep(this);
        }
    }

    notify() {
        console.log("notifying", this);
        const subs = this.subs.slice()
        subs.forEach(sub => sub.update());
        // if (this.component.watch[this.key]) this.component.watch[this.key].call(comp);
    }
}

Dep.target = null;
const targetStack = [];

export function pushTarget(_target) {
    if (Dep.target) targetStack.push(Dep.target);
    Dep.target = _target;
}

export function popTarget() {
    Dep.target = targetStack.pop();
}

