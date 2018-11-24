import { walk, proxy, observe } from "../reactivity/observer";
import React, {Component} from "react";
import { createWatcher } from "../reactivity/watcher";

class Watch {
    key;
    fn;
    constructor(key, fn) {
        this.key=key;
        this.fn=fn;
    }
    run(){
        this.fn();
    }
}

export default class ReactVComponent extends Component {
    state = {}
    _state = {}
    methods = {}
    _watch = {};
    constructor(...args) {
        super(...args);
        Object.defineProperty(this, 'componentWillMount', {
            writeable: false,
            value: function () {
                this._state = {...this.state};
                console.log(this._state)
                this.doUpdate();
            }
        });

        Object.defineProperty(this, 'componentDidMount', {
            writeable: false,
            value: function () {
                this.mounted();
            }
        });
    }
    doUpdate() {
        observe(this._state);
        Object.keys(this.state).forEach(key => {
            proxy(this, '_state', key);
        });
        Object.keys(this.methods).forEach((fn) => {
            proxy(this, 'methods', fn)
        });


        Object.keys(this.state).forEach(key => {
            createWatcher(this, key, (newValue, oldValue) => {
                if (this.watch && this.watch[key]) {
                    this.watch[key].call(this, newValue, oldValue);
                }
                this.setState({
                    key: this.state[key]
                })
            })
        });
    }
    mounted() { }
}
