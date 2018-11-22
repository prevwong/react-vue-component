let uid = 0;
Dep.target = null;
class Dep {
    constructor(args) {
        this.id = uid++;
        this.subs = [];
    }
    addSub(sub) {
        this.subs.push(sub);
    }
    removeSub(sub){
        this.subs.slice(this.subs.indexOf(sub), -1);
    }
    depend(){
        if ( Dep.target) {
            Dep.target.addDep(this);
        }
    }
    notify(){
        this.subs.forEach(sub => sub.update());
    }
}