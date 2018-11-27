import * as React from "react"
import { set } from "../reactivity/observer";
export default abstract class VueIshComponent extends React.Component {
    _state: object = {}
    _watch: object = {}
    state: object = {}
    set: Function = set
    methods?: object = {}
    computed?: object = {}
    watch?: object = {}

    created(): void { }
    beforeMount(): void { }
    mounted(): void { }
}