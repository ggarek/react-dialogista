import React, { Component } from 'react';
import { showDialog } from '../../lib';
import SimpleDialog from './SimpleDialog';

export default class App extends Component {
  openDialog() {
    showDialog(SimpleDialog, {});
  }

  render() {
    return (
      <div>
        <button onClick={() => this.openDialog()}>Open Dialog</button>
      </div>
    );
  }
}
