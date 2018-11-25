import { remove } from "../utils";
import Watcher from "./watcher";
import { observe } from "./observer";

let id: number = 0;
export default class Dep {
    static target: Watcher = null
    subs: Array<Watcher> = []
    id: number
    constructor() {
        this.id = id++;
    }
    addSub(sub: Watcher): void {
        this.subs.push(sub);
    }
    removeSub(sub: Watcher): void {
        remove(this.subs, sub);
    }
    depend(): void {
        if (Dep.target) {
            Dep.target.addDep(this);
        }
    }
    notify(): void {
        for ( let i = 0; i < this.subs.length; i++ ) {
            this.subs[i].update();
        }
    }
}

let targetStack : Array<Watcher> = [];

export function pushTarget(target: Watcher) : void {
    if ( Dep.target ) targetStack.push(Dep.target);
    Dep.target = target;
}

export function popTarget() : void {
    targetStack.pop();
}