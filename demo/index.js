import React, { Component } from "react";
import ReactDOM from 'react-dom';
import ReactV from '../src/index.ts';

class App extends ReactV.Component {
  state = {
    input: "",
    obj: {
      name: "Prev Wong"
    }
  }
  mounted() {
    setTimeout(() => {
      this.obj.name = 'John Pong';
    }, 1000);
  }
  onChange(e) {
    this.input = e.target.value;
  }
  render() {
    return (
      <div>
        <div style={{ marginBottom: "20px" }}>
          <span>input: </span><input type="text" onKeyUp={(e) => this.onChange(e)} />
        </div>
        <div>
          <span>States:</span>
          {JSON.stringify({
            input: this.input,
            obj: this.obj
          })}
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
