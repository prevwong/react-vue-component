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
    }
    mounted(){
        setTimeout(() => {
            this.status = "mounted!";
        }, 1000);
        setTimeout(() => {
            this.times = 10;
        }, 2000);
        setTimeout(() => {
            this.calc = 77;
            console.log("changeD", this.calc)
            
        }, 3000);
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
                console.log("t", this)
                return this.illuminate * this.times;
            },
            set(newVal) {
                this.illuminate = 10;
            }
        }
    }
    render(){
        const { status, illuminate, times, calc} = this;
        return (
            <div>
                <h3>{status}</h3>
                <p>{illuminate}*{times}={calc}</p>
                <SubApp link={status}  />
                <a onClick={() => this.change()}>Click</a>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("main"));
