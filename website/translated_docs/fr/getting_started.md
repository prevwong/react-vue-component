---
id: getting_started
title: Getting Started
sidebar_label: Getting Started
---
A simple react component that allows you to create *vue-like* components. This is achieved by integrating Vue's reactivity system and using it to extend `React.Component`.

The result of this is we can now benefit from some Vue-awesomeness such as `watcher` & `computed`properties. Moreover, we are no longer required to call `setState` when manipulating state properties, instead manipulating them directly (eg: `this.state.name="Bob"`) will automatically trigger a re-render, just like in Vue.

Other "essence" of a Vue component such as `methods()` and component lifecycle events has also been ported over.

If you've already used Vue, you can skip this documentation altogether. This is essentially the same as Vue, but in a React Component.

Credits to the Vue core team for their genius reactivity system!

### Installation

Install `react-vue-component` via npm:

- `npm install --save-dev react-vue-component`

### Usage

- ```jsx import ReactVC from "react-vue-component" class App extends ReactVC.Component { state = { name: "Bob" } mounted() { setTimeout(() => { this.name = "John"; this.age = 20 }, 1000); } methods: { changeName(name) { this.name = name; } } watcher: { name(newName, oldName) { console.log("Name changed", newName, oldName); } } computed: { profile() { return `${this.name} - age: ${this.age}`; } } render() { return (

<div>
  <h3>
    {this.profile}
  </h3><a onclick={() > this.changeName("Lol")}>Change my name</a>
</div>

          )
      }
    

} ```

- Note that `state`, `computed` & `methods` properties have been alliased into the component's `this` object.