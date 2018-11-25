import React, {Component} from "react";
import { proxy, uniqueObjectKeys } from "../utils";
import { observe, set } from "../reactivity/observer";
import Watcher from "../reactivity/watcher";
// import { Watcher } from "../reactivity/watcher";

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
        console.log()
        // new Watcher();
        uniqueObjectKeys(this, "state", "props", (key) => {
            this._state[key] = this.state[key];
            proxy(this, key, '_state');
        });
        observe(this._state);
        // console.log("gonna watch")
        Object.keys(this._state).forEach((key, i) => {
            new Watcher(this, key, (newValue, oldValue) => {
                console.log("updated")
                if (this.watch && this.watch[key]) {
                    this.watch[key].call(this, newValue, oldValue);
                }
                this.setState({
                    key: this.state[key]
                })
            })
        });

        uniqueObjectKeys(this, "computed", 'props', 'state', (key) => {
            const computed = this.computed[key];
            const getter = typeof computed === "function" ? computed : computed.get;
            let get = getter,
                set = () => {};

            new Watcher(this, getter);

            if (typeof computed === "object") {
                get = computed.get;
                set = computed.set;
            }
            proxy(this, key, get, set)
        });

        // uniqueObjectKeys(this, "methods", 'props', 'state', 'computed', (key) => proxy(this, key, 'methods'));

        
    }
    set(o, key, val) {
        set(o, key, val);
    }

    mounted() { }
}
