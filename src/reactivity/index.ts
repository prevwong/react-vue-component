
import {observe} from "./observer";
import Watcher from "./watcher";
import {proxy} from "../utils";
import { uniqueObjectKeys} from "../utils";
import VueIshComponent from "../types/VueIshComponent";


export const injectReactivity = (comp: VueIshComponent): void => {
    initState(comp);
    initWatch(comp);
    initComputed(comp);
}

export const initState = (comp: VueIshComponent): void => {
    uniqueObjectKeys(comp, "state", ["props"], (key) => {
        comp._state[key] = comp.state[key];
        proxy(comp, key, '_state');
    });
    observe(comp._state);
}

export const initWatch = (comp: VueIshComponent): void => {
    Object.keys(comp._state).forEach((key, i) => {
        new Watcher(comp, key, (newValue, oldValue) => {
            if (comp.watch && comp.watch[key]) {
                comp.watch[key].call(comp, newValue, oldValue);
            }
            comp.setState({
                key: comp.state[key]
            })
        })
    });
}

export const initComputed = (comp: VueIshComponent): void => {
    uniqueObjectKeys(comp, "computed", ['props', 'state'], (key) => {
        const computed = comp.computed[key];
        const getter = typeof computed === "function" ? computed : computed.get;
        let get = getter,
            set = () => { };

        new Watcher(comp, getter);

        if (typeof computed === "object") {
            get = computed.get;
            set = computed.set;
        }
        proxy(comp, key, get, set)
    });
}