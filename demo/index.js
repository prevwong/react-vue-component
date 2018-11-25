import ReactV from "../src/ReactV.ts";
import React from "react";
import ReactDOM from "react-dom"

class SubApp extends ReactV.Component {
    state = {
        times: 2
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
       age: 16,
       o : { name: "hi"}
    }
    watch = {
        o(v, old ){
            console.log("object changed", v, old)
        }
    }
    mounted() {
        console.log("mounted")
        setTimeout(() => {
            console.log("changed", this)
            this.o.name = "proots"
            // this.set(this.o, "gender", "male");
        }, 1000);
    }
    render(){
        const { o, age, calc} = this;
        return (
            <div>
                <p>{age}</p>
                {Object.keys(this.o).map(key => {
                    return <p key={key}>{key} : {this.o[key]}</p>
                })}
                <p>{calc}</p>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("main"));
