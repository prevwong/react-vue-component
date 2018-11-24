import ReactV from "../src/ReactV";
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
        illuminate: 2,
        times: 1,
        status: "ready",
        arr: ["hi", "world"]
    }
    mounted(){
       setTimeout(() => {
        this.arr.push("whut");
       }, 1000);
    }
    watch = {
        status(val, old){
            console.log("status updated....", val, old);
        },
        illuminate(val, old) {
            if ( val === 3 ) {
                this.status = "troix";
            } 
        },
    }
    methods = {
        change() {
            this.times = this.times + 1;
            this.illuminate = this.illuminate + 1;
        }
    }
    computed = {
        calc : {
            get() {
                return this.illuminate * this.times;
            },
            set(newVal) {
                this.illuminate = 10;
            }
        }
    }
    render(){
        const { status, illuminate, times, calc, arr} = this;
        return (
            <div>
                {
                    arr.map((o, i) => <li key={i}>{o}</li>)
                }
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("main"));
