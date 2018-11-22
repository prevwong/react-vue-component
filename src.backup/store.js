import ModuleCollection from "./module/module-collection";
import React from "react";
import { defineReactive, set } from "./utils/observer";

export class Store {
    _committing = false;
    _actions = {};
    _actionSubscribers = {};
    _mutations = {};
    _wrappedGetters = {};
    _subscribers = [];
    constructor(options={}) {
        const vm = new React.Component();
        this._modules = new ModuleCollection(options);

        const state = this._modules.root.state;
        resetStoreVM(this, state);
        installModule(this, this._modules.root.state, [], this._modules.root);
    }

    get state() {
        return this._vm.props.$$state;
    }

    subscribe(fn) {
        return genericSubscribe(fn, this._subscribers);
    }
    
    commit(type, payload) {
        const mutation = {type, payload};
        const entry = this._mutations[type];
        if(!entry) {
            console.error(`[reactx] unknown mutation type: ${type}`);
            return;
        }

        this._subscribers.forEach(sub => sub(mutation, this.state))
    }
}

function resetStoreVM(store, state, hot) {
    const oldVm = store._vm;
    store.getters = {};
    store._vm = new React.Component({
        $$state: state
    });
}

function installModule(store, rootState, path, module, hot) {
    const isRoot = !path.length;
    // const namespace = store._modules.g

    if (!isRoot && !hot) {
        const parentState = getNestedState(rootState, path.slice(0, -1))
        const moduleName = path[path.length - 1]
        set(parentState, moduleName, module.state);
        // parentState[moduleName] = module.state;
        console.log("pa", parentState)
        // store._withCommit(() => {
        //     Vue.set(parentState, moduleName, module.state)
        // })
    }

    module.forEachMutation((key, mutation) => {
        registerMutation(store, key, mutation);
    })
    module.forEachChild((key, child) => {
        installModule(store, rootState, path.concat(key), child, hot)
    })
}

function getNestedState(state, path) {
    return path.length
        ? path.reduce((state, key) => state[key], state)
        : state
}

function registerMutation(store, type, handler, local) {
    const entry = store._mutations[type] || (store._mutations[type] = [])
    entry.push(function wrappedMutationHandler(payload) {
        handler.call(store)
    })
}



function genericSubscribe(fn, subs) {
    if (subs.indexOf(fn) < 0) {
        subs.push(fn)
    }
    return () => {
        const i = subs.indexOf(fn)
        if (i > -1) {
            subs.splice(i, 1)
        }
    }
}