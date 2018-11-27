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
        arr: ["proots", ["prev", "loots"]],
        number: 2,
        number2: 10,
        obj : {
            name: "Prev",
            age: 16
        }
    }
    mounted() {
        setTimeout(() => {
            this.obj.name = "Prev Pong";
            setTimeout(() => {
                // this.obj.age = 20;
                this.del(this.obj, "name");
                console.log("deleted...")
            }, 1000);
        }, 1000);
    }
    watch = {
        'obj.name'(v, old) {
            console.log("name changed", v, old);
        },
        'obj.age'(v, old) {
            console.log("age changed", v, old);
        }
    }
    computed = {
        calc() {
            return this.number + this.number2;
        }
    }
    render(){
        const { arr, age, calc} = this;
        return (
            <div>
                {
                   Object.keys(this.obj).map(o => <p key={o}>{`${o} : ${this.obj[o]}`}</p>)
                }
                <p>{calc}</p>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("main"));
