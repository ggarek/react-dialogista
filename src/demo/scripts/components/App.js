import React, { Component, PropTypes } from 'react';
import { DialogHost } from '../../../lib/scripts';

export default class App extends Component {
  static propTypes = {
    openDialog: PropTypes.func,
    openMany: PropTypes.func,
    dialogStore: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      dialogHostProps: {
        overlayClassName: 'my-dialog-overlay',
        className: 'my-dialog-host',
      },
    };
  }

  displaySingle = () => {
    this.setState({ dialogHostProps: {
      overlayClassName: 'my-dialog-overlay',
      className: 'my-dialog-host',
    } }, this.props.openDialog);
  };

  displayMany = () => {
    this.setState({
      dialogHostProps: {
        mode: 'stack',
        show: 3,
        overlayClassName: 'my-dialog-overlay',
        className: 'my-dialog-host _as-notifications',
      },
    }, this.props.openMany);
  };

  render() {
    return (
      <div className="container">
        <div>
          <button onClick={this.displaySingle}>Open Dialog</button>
          <button onClick={this.displayMany}>Open Many Dialogs</button>
        </div>
        <DialogHost
          store={this.props.dialogStore}
          {...this.state.dialogHostProps}
        />
      </div>
    );
  }
}
