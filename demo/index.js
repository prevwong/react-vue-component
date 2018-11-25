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
       age: 16,
       o : { name: "hi"}
    }
    mounted(){
        setTimeout(() => {
            console.log("changed", this)
            this.o.name = "proots"
            this.set(this.o, "gender", "male");
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
        o(val, old) {
            console.log(val.name, old.name)
        }
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
                return `Name:${this.o.name}, Age:${this.age}`
            },
            set(newVal) {
                this.age = newVal;
            }
        }
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
