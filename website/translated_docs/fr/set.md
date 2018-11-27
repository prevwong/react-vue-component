---
id: set
title: Manipulating objects
---
> A caveat with Vue's reactivity system is that it's unable to detect changes made to an object (as in inserting a new key value pair, or deleting an existing key value pair). Thus 2 methods: `set` and `get` are introduced to address these problems.

### set()

```jsx
    class App extends ReactVC.Component {
      state = { 
          obj : { name: "Hello" }
      }
      ...
      methods = {
          addAge() {
              // this.obj.age=20 <= this will not work
              this.set(this.obj, "age", 20);
          }
      }
      ...
    }
```

### del()

```jsx
    class App extends ReactVC.Component {
      state = { 
          obj : { age: 20 }
      }
      ...
      methods = {
          removeAge() {
              // delete this.obj["age"] <= this will not work
              this.del(this.obj, "age");
          }
      }
      ...
    }
```