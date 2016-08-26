import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <div>
        <button onClick={this.props.openDialog}>Open Dialog</button>
      </div>
    );
  }
}
