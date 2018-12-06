# react-vue-component

Build Vue-like components in React (watch, computed & no more setState)

# Installation

`$ npm install --save-dev react-vue-component`

# Usage

- ```jsx
  import {Component} from "react-vue-component";
  
  class App extends Component {
      state = {
          name: "Bob", 
      }
      mounted() {
          
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
              this.name = "John"; // Changing name will also change the computed property fullName
          }
      }
      render() {
          const {name, obj} = this; // states, methods, and computed properties can be accessed directly via `this` just like in Vue
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
