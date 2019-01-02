import { observe } from './observer';
import Watcher from './watcher';
import { proxy, isPlainObject } from '../utils';
import { uniqueObjectKeys } from '../utils';
import VueIshComponent from '../types/VueIshComponent';

export const injectReactivity = (comp: VueIshComponent): void => {
  initState(comp);
  initWatch(comp);
  initComputed(comp);
};

export const initState = (comp: VueIshComponent): void => {
  uniqueObjectKeys(comp, 'state', ['props'], key => {
    comp._state[key] = comp.state[key];
    proxy(comp, key, '_state');
  });
  observe(comp._state);
};

export const initWatch = (comp: VueIshComponent): void => {
  Object.keys(comp._state).forEach((key, i) => {
    new Watcher(comp, key, (newValue, oldValue) => {
      comp.setState({
        key: comp.state[key]
      });
    });
  });
  const { watch } = comp;
  Object.keys(watch).forEach(key => {
    createWatcher(comp, key, watch[key]);
  });
};

interface WatcherHandler {
  handler;
}

export const createWatcher = (
  comp: VueIshComponent,
  state: string,
  handler: WatcherHandler | Function
) => {
  if (isPlainObject(handler)) {
    handler = (handler as WatcherHandler).handler;
    return createWatcher(comp, state, handler);
  }
  new Watcher(comp, state, handler as Function);
};

export const initComputed = (comp: VueIshComponent): void => {
  uniqueObjectKeys(comp, 'computed', ['props', 'state'], key => {
    const computed = comp.computed[key];
    const getter = typeof computed === 'function' ? computed : computed.get;
    let get = getter,
      set = () => {};

    new Watcher(comp, getter);

    if (typeof computed === 'object') {
      get = computed.get;
      set = computed.set;
    }
    proxy(comp, key, get, set);
  });
};
