---
id: watchers
title: Watchers
---
Each `state` property can have a watcher method which will be called when it's state has been manipulated.

```jsx
    class App extends ReactVC.Component {
      state = { 
          text: "Hi there"
      }
      watch = {
        text: function(newValue, oldValue) {
           console.log("text has been changed!");
        }
      }
      render() {
          return (
              <div>
                  <a onClick={() => this.text}>{this.text}</a>
              </div>
          )
      }
    }
```

## Nested watchers

If you have a state property that is an object, you may also watch for specific properties in that object.

    jsx
        class App extends ReactVC.Component {
          state = { 
              obj: { name: "Lols", age: 20 }
          }
          watch = {
            "obj.name": function(newValue, oldValue) {
               console.log("obj.name has been changed!");
            },
            "obj.age": function(newValue, oldValue) {
               console.log("obj.age been changed!");
            }
          }
          render() {
              return (
                  <div>
                      <a onClick={() => this.obj.name="Bob"}>{this.obj.name}</a>
                      <a onClick={() => this.obj.age=20}>{this.obj.age}</a>
                  </div>
              )
          }
        }