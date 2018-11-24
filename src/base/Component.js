import { walk, proxy, observe, sharedPropertyDefinition } from "../reactivity/observer";
import React, {Component} from "react";
import Watcher, { createWatcher } from "../reactivity/watcher";

export default class ReactVComponent extends Component {
    state = {}
    _state = {}
    methods = {}
    computed = {}
    _watch = {};
    constructor(...args) {
        super(...args);
        Object.defineProperty(this, 'componentWillMount', {
            writeable: false,
            value: function () {
                this._state = {...this.state};
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

        this.initComputed();

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
    initComputed() {
        const watchers = this._computedWatchers = Object.create(null);
        Object.keys(this.computed).forEach(key => {
            const getter = this.computed[key];
            watchers[key] = new Watcher(this, getter);
            this.defineComputed(key, getter);
        })
    }

    defineComputed(key, fn) {
        sharedPropertyDefinition.get = fn;
        sharedPropertyDefinition.set = () => {};
        Object.defineProperty(this, key, sharedPropertyDefinition);
    }
    mounted() { }
}
