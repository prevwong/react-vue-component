# react-vue-component

Build Vue-like components in React (watch, computed & no more setState)

# Installation

`$ npm install --save-dev react-vue-component`

# Basic  Usage

- ```jsx
  import {Component} from "react-vue-component";
  
  class App extends Component {
      state = {
          name: "Bob", 
      }
      mounted() {
          this.name = "Albert";
      }
      watch {
          name(newName, oldName) {
              console.log("name has changed!");
          },
      }
      computed {
          fullName(){
              return this.name + " Lolzer";
          }
      }
      methods {
          changeName() {
              // Changing name will also change the computed property fullName
              this.name = "John";
          }
      }
      render() {
          // states, methods, and computed properties can be accessed directly via `this` just like in Vue
          const {name, fullName, changeName} = this;
          
          return (
              <div>
                  <p>{name}</p>
                  <p>{fullName}</p>
                  <a onClick={() => this.changeName()}>Change my name</a>  
              </div>   
          )
      }
  }
  ```

## Objects

- In Vue, in order to "reactively" add/delete key-value pairs from an object, you will need to use  `set(obj, key, value)`and `delete(obj,key)`respectively.

```jsx
import {Component} from "react-vue-component";
class App extends Component {
  state = {
      obj : {
          name: "Prev"
      }
  }
  methods {
      addToObj() {
          this.set(this.obj, "age", 20); 
      }
      deleteName() {
          this.delete(this.obj, "name");
      }
  }
  watch {
      "obj.name" : (newName, oldName) => {
          console.log("Obj.name has changed");
      }
      "obj.age" : (newAge, oldAge) => {
          console.log("Obj.age has changed");
      }
  }
  render() {
      const {obj} = this;
      return (
          <div>
              Object.keys(obj).map(key => 
                  <p><strong>{key}</strong>: {obj[key]}</p>
              ) 
            <a onClick={() => this.addToObj()}>Add new key</a>
            <a onClick={() => this.deleteName()}>Delete name</a>
          </div>
      )
  }
}
```
