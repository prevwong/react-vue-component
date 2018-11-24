import { walk, proxy, observe, sharedPropertyDefinition } from "../reactivity/observer";
import React, {Component} from "react";
import Watcher, { createWatcher } from "../reactivity/watcher";
import { uniqueObjectKeys } from "../utils";

export default class ReactVComponent extends Component {
    _state = {}
    methods = {}
    computed = {}
    _watch = {};
    constructor(...args) {
        super(...args);
        Object.defineProperty(this, 'componentWillMount', {
            writeable: false,
            value: function () {
                this._reactivity();
            }
        });

        Object.defineProperty(this, 'componentDidMount', {
            writeable: false,
            value: function () {
                this.mounted();
            }
        });
    }
    _reactivity() {
        uniqueObjectKeys(this, "state", "props", (key) => {
            this._state[key] = this.state[key];
            proxy(this, key, '_state');
        });
        observe(this._state);

        uniqueObjectKeys(this, "computed", 'props', 'state', (key) => {
            const getter = this.computed[key];
            new Watcher(this, getter);
            proxy(this, key, getter, () => { })
        });

        uniqueObjectKeys(this, "methods", 'props', 'state', 'computed', (key) => proxy(this, key, 'methods'));

        Object.keys(this._state).forEach(key => {
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
