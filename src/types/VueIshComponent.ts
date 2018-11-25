import * as React from "react"
export default abstract class VueIshComponent extends React.Component<any, any> {
    _state: object = {}
    _watch: object = {}
    state: object = {}
    set: Function = () => {}
    methods?: object = {}
    computed?: object = {}
    watch?: object = {}

    created(): void { }
    beforeMount(): void { }
    mounted(): void { }
}