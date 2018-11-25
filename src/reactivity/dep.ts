import { remove } from "../utils";
import Watcher from "./watcher";
import { observe } from "./observer";

let id = 0;
export default class Dep {
    static target: Watcher = null
    subs: Array<Watcher> = []
    id: number
    constructor() {
        this.id = id++;
    }
    addSub(sub) {
        this.subs.push(sub);
    }
    removeSub(sub) {
        remove(this.subs, sub);
    }
    depend() {
        if (Dep.target) {
            Dep.target.addDep(this);
            
        }
    }
    notify() {
        for ( let i = 0; i < this.subs.length; i++ ) {
            this.subs[i].update();
        }
    }
}

let targetStack : Array<Watcher> = [];

export function pushTarget(target: Watcher) {
    if ( Dep.target ) targetStack.push(Dep.target);
    Dep.target = target;
}

export function popTarget(){
    targetStack.pop();
}