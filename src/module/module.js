export default class Module {
    _children = {};
    constructor(rawModule, runtime) {
        this.runtime = runtime;
        this._rawModule = rawModule;
        const {state: rawState} = rawModule;

        this.state =   (typeof rawState === 'function' ? rawState() : rawState) || {};
    }
    addChild(key, module) {
        this._children[key] = module;
    }
    getChild(key){
        return this._children[key];
    }
    forEachChild(fn) {
        return Object.entries(this._children).forEach(pairs => {
            fn(pairs[0], pairs[1])
        });
    }
    forEachMutation(fn) {
        if ( this._rawModule.mutations ) {
            Object.entries(this._rawModule.mutations).forEach(pairs => {
                fn(pairs[0], pairs[1])
            })
        }
    }
}