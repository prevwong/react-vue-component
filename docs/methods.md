---
id: methods
title: Methods
---

- In Vue, methods are wrapped in a `methods` object.  Similarly, that is also the case here, although completely optional (and maybe unnecessary ehhehe).


```jsx
  import ReactVC from "react-vue-component"
  class App extends ReactVC.Component {
      state = { 
          text: "Hi there"
      }
      methods = {
          changeText(text) {
              this.text = text;
          }
      }
      render() {
          return (
              <div>
                  <a onClick={() => this.changeText("Lmao")}>Change my name</a>
              </div>
          )
      }
  }
  ```