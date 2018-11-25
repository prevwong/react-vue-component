import { injectReactivity } from "./reactivity";
import VueIshComponent from "./types/VueIshComponent";

class Component extends VueIshComponent {
    constructor(props: any) {
        super(props);
        this.created();
        Object.defineProperty(this, 'componentWillMount', {
            writable: false,
            value: function () {
                this.beforeMount();
                injectReactivity(this);
            }
        });

        Object.defineProperty(this, 'componentDidMount', {
            writable: false,
            value: function () {
                this.mounted();
            }
        });
    }
}

export default {
    Component
}