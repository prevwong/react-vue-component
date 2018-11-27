---
id: computed
title: Computed
---

> Computed properties allow us to have model-specific, complex values computed for the view. These values will be bound to the dependency values and only update when required.

Essentially, a computed value depends on a one or more state properties, and it is able to proceess and return a new value after performing a computation on those values.


```jsx
    class App extends ReactVC.Component {
      state = { 
          message: 'Hello'
      }
      computed: {
        reversedMessage() => {
            return this.message.split('').reverse().join('')
        }
      }
      render() {
          return (
              <div>
                  <p>{this.reversedMessage}</p>  <!-- olleH -->
              </div>
          )
      }
    }
```

> If the `message` state is updated, `reversedMessage` will automatically compute & return a new value. 

## Getters & Setters
Additionally, you can define custom getters and setters for a computed value. By default a computed value is unable to be manipulated, thus a setter function is needed for that purpose.

```jsx
    class App extends ReactVC.Component {
      state = { 
          message: 'Hello'
      }
      computed: {
        reversedMessage: {
            get() {
                return this.message.split('').reverse().join('')
            }
            set(message) {
                this.message = message;
            }
        }
      }
      render() {
          return (
              <div>
                  <p>{this.reversedMessage}</p> <!-- olleH -->
                  <a onClick={()=>this.reversedMessage = "new"}>{this.reversedMessage}</p> <!-- wen -->
              </div>
          )
      }
    }
  ```