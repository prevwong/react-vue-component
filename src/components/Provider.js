import React from "react";

export default class Provider extends React.Component {
    constructor(props) {
        super(props);
        const { store } = this.props;
        console.log("store", store);

        this.state = {
            store
        }
        this.subscribe();
    }
    subscribe(){
        const {store} = this.props;
        // store.stateChange((state) => {
        //     console.log("state changed.")
        // })
        store.subscribe(((mutation, state) => {
            console.log("store modified")
        }));
    }
    render(){
        return (
            this.props.children
        )
    }
}