import { walk, proxy } from "../reactivity/observer";
import React, {Component} from "react";

export default class ReactVComponent extends Component {
    state = {}
    methods = {}
    constructor(...args) {
        super(...args);
        Object.defineProperty(this, 'componentWillMount', {
            writeable: false,
            value: function () {
                this.doUpdate();
                Object.keys(this.methods).forEach((fn) => {
                    proxy(this, 'methods', fn)
                })
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
        walk(this, (o, key, val) => {
            this.setState(o, this.doUpdate);
        })
    }
    mounted() { }
}
