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
          obj: { }
      }
      mounted() {
          
      }
      render() {
          return (
              <div>
                  <p>{name}</p>
                  <div>
                        {
                            Object.keys(obj).map(key => 
                                <p><strong>{key}</strong>: {obj[key]}</p>
                        }
                  </div>   
              </div>   
          )
      }
  }
  ```
