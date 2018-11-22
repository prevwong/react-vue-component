import { pushTarget, popTarget } from "./dep";

export default class Watcher {
    constructor(getter, cb) {
        this.getter = getter;
        this.cb = cb;
        this.value = this.getter();
        this.cb(this.value, null);
    }

    get(){
        pushTarget(this);
        const value = this.getter();
        popTarget();

        return value;
    }

    addDep(dep){
        dep.addSub(this);
    }

    update(){
        const value = this.get();
        const oldValue = this.value;
        this.value = value;

        this.cb(value, oldValue);
    }
}