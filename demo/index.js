import ReactV from "../src/ReactV";
import React from "react";
import ReactDOM from "react-dom"

class App extends ReactV.Component {
    state = {
        illuminate: 2,
        times: 1,
        status: "ready"
    }
    mounted(){
        setTimeout(() => {
            this.status = "mounted!";
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
        times() {
            console.log("times updated...")
        }
    }
    methods = {
        change() {
            this.times = this.times + 1;
            this.illuminate = this.illuminate + 1;
        }
    }
    computed = {
        calc() {
            return this.illuminate * this.times;
        }
    }
    render(){
        const { status, illuminate, times} = this;
        return (
            <div>
                <h3>{status}</h3>
                <p>{illuminate} + {times}</p>
                <a onClick={() => this.change()}>Click</a>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("main"));
