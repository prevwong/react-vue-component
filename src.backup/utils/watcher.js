import { pushTarget, popTarget } from "./dep";


export default class Watcher {
    constructor(getter, cb) {
        this.getter = getter // function that returns a value based on reactive properties
        this.cb = cb // function that is run on value updates, and is passed value and old value
        this.value = this.get()
        this.cb(this.value, null)
    }

    get() {
        pushTarget(this) // from dep.js
        const value = this.getter()
        popTarget() // from dep.js

        return value
    }

    addDep(dep) {
        dep.addSub(this)
    }

    update() {
        const value = this.get()
        const oldValue = this.value
        this.value = value

        this.cb(value, oldValue)
    }
}