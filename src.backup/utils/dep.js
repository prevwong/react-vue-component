import { defineReactive } from "./observer";

export default class Dep {
    constructor(comp, key) {
        this.component = comp;
        this.key = key;
        this.subs = new Set();
    }

    addSub(sub) {
        this.subs.add(sub);
    }

    depend(){
        console.log("DE", Dep.target);
        if(Dep.target){
            Dep.target.addDep(this);
        }
    }

    notify(){
        this.subs.forEach(sub => sub.update());
        if ( this.component.watchers[this.key] ) this.component.watchers[this.key]();
    }
}

Dep.target = null;
const targetStack = [];

export function pushTarget(_target){
    console.log("push", _target);
    if(Dep.target) targetStack.push(Dep.target);
    Dep.target = _target;
}

export function popTarget(){
    Dep.target = targetStack.pop();
}

