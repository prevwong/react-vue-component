# react-vue-component
Build Vue-like components in React (watch, computed & no more setState)

# Installation
`$ npm install --save-dev react-vue-component`

# Usage
- Import the `Component` from the `react-vue-component`
- Use `ReactVC.Component` when creating new components
```js
import ReactVC from "react-vue-component"

class App extends ReactVC.Component {
    state = {
        name: "Prev"
    }
    mounted() {
        setTimeout(() => {
            this.name = "Whatever";
        }, 1000)
    }
    watch {
        name(newName, oldName) {
            console.log("Name has changed", newName, oldName);
        }
    }
    computed {
        fullName() {
            return this.name + " Wong";
        }
    }
    render(){
        const {name, fullName} = this;
        return (
            <div>
                <p>{name}</p>
                <p>{fullName}</p>
            </div>
        )
    }
}
```