import React, { Component, PropTypes } from 'react';

export default class App extends Component {
  static propTypes = {
    openDialog: PropTypes.func,
  };
  render() {
    return (
      <div>
        <button onClick={this.props.openDialog}>Open Dialog</button>
      </div>
    );
  }
}
