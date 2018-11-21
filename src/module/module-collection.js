import Module from "./module";

export default class ModuleCollection {
    constructor(rawRootModule) {
        this.register([], rawRootModule, false);
    }
    get(path){
        return path.reduce((module, key) => {
            // console.log(module);
            return module.getChild(key);
        }, this.root);
    }
    register(path, rawModule, runtime=true){
        const newModule = new Module(rawModule, runtime);
        if ( path.length === 0 ) {
            this.root = newModule;
        } else {
            const parent = this.get(path.slice(0, -1));
            // console.log("parent", path, parent);
            parent.addChild(path[path.length-1], newModule);
        }


        if ( rawModule.modules ) {
            // Object.entries(rawModule.modules).forEach((key, value) => {
            //     this.register(path.concat(key), value, runtime);
            // })
            // console.log(Object.entries(rawModule.modules));
            Object.entries(rawModule.modules).forEach(pair => {
                this.register(path.concat(pair[0]), pair[1], runtime);
            })
        }
    }
}