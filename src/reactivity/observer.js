import { hasOwn } from "../utils";

export function observe(value) {
    if ( value === null || typeof value !== "object" ) return;
    let ob;
    if ( hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
        ob = value.__ob__;
    } else {
        ob = new Observer(value);
    }
    return ob;
}