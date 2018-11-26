import ReactV from "../src/ReactV.ts";
import React from "react";
import ReactDOM from "react-dom"

class SubApp extends ReactV.Component {
    state = {
        times: 2,
    }
    mounted() {
        setTimeout(() => {
            this.times = 4;
        }, 2000)
    }
    render() {
        const {link} = this.props
        const { times } = this;
        return (
            <a>{link} + {times}</a>
        )
    }
}
class App extends ReactV.Component {
    state = {
        arr: ["proots", ["prev", "loots"]]
    }
    watch = {
        o(v, old ){
            console.log("object changed", v, old)
        }
    }
    mounted() {
        setTimeout(() => {
                this.arr[1].push("akoots");
                console.log("this", this.arr)
        }, 1000);
    }
    render(){
        const { arr, age, calc} = this;
        return (
            <div>
                {arr.map(key => {
                    return <p key={key}>{key}</p>
                })}
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("main"));
