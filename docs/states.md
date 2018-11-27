---
id: states
title: States
---



## Accessing states

Normally in React, you would access state properties via `this.state`. However with `react-vue-component`, you are able to also access it directly via `this`property, just as you would in Vue.



## Manipulating states

Instead of calling `setState`, you can now directly manipulate `state`properties which in-turn will automatically cause a re-render. This applies to Array methods as well ( calling `push`, `unshift`, `pop`, `slice` will automatically trigger a re-render)





```jsx
    class App extends ReactVC.Component {
      state = { 
          name: "Lols"
          arr: ["Pancakes", "Roti canai"]
      }
      render() {
          return (
              <div>
                  <a onClick={() => this.obj.name="Bob"}>{this.obj.name}</a>
                  {
                      this.arr.map(item => <p>{item}</p>)
                  }
                  <a onClick={() => this.arr.push("Tosai")}>Add new item</a>
              </div>
          )
      }
    }
  ```