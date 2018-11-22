import { walk } from "../src.backup/utils/observer";
import Watcher from "../src.backup/utils/watcher";
import React from "react";
import ReactDOM from "react-dom"
// import { mapGetters } from "../src/index.js";
// import React from "react";
// import ReactDOM from "react-dom";
// import store from "./store";
// import reactx from "../src/index";
// const { Provider } = reactx;

// class App extends React.Component {
//     // getters = mapGetters(["allDocuments"])
//     componentDidMount(){
//         setTimeout(() => {
//             console.log("test", store.state)
//             store.state.documents.documents = ["hi"]
//         }, 1000)
//     }
//     render(){
//         return (
//             <Provider store={store}>
//                 <div className = "app">
//                     <h2>App</h2>
//                 </div>
//             </Provider>
//         )
//     }
// }

// ReactDOM.render(<App />, document.getElementById("main"));

class ReactxComponent extends React.Component {
    state = {}
    componentDidMount(){
        walk(this.state, (o, key, val) => {
            this.setState(o)
        });
        this.mounted();
    }
    mounted(){}
}

class App extends ReactxComponent {
    state = {
        firstName: "Prev",
        lastName: "Wong"
    }
    change(){
        this.state.firstName = "john"
    }
    render(){
        const { firstName, lastName } = this.state;
        return (
            <div>
                <h3><span>{firstName}</span> lolo</h3>
                <a onClick={() => this.change()}>Click me</a>
            </div>
        )
    }
}
ReactDOM.render(<App />, document.getElementById("main"));

// const data = {
//     firstName: "hello",
//     lastName: "world"

// }

// walk(data);

// const watcher = new Watcher(() => `Hi! My name is ${data.firstName} ${data.lastName}`, (val) => console.log(val));
// setTimeout(() => {
//     data.lastName = "hl"
// }, 1000)