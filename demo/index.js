// import { mapGetters } from "../src/index.js";
import React from "react";
import ReactDOM from "react-dom";
import store from "./store";
import reactx from "../src/index";
const { Provider } = reactx;

class App extends React.Component {
    // getters = mapGetters(["allDocuments"])
    componentDidMount(){
        setTimeout(() => {
            console.log("test", store.state)
            store.state.documents.documents = ["hi"]
        }, 1000)
    }
    render(){
        return (
            <Provider store={store}>
                <div className = "app">
                    <h2>App</h2>
                </div>
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("main"));
