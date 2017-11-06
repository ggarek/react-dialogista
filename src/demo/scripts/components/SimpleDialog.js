import PropTypes from 'prop-types';
import React from 'react';
import { Dialog } from '../../../lib/scripts';

/**
 * @class SimpleDialog
 */
export default class SimpleDialog extends React.Component {
  static propTypes = {
    dialog: PropTypes.object,
  };

  static defaultProps = {};

  render() {
    const s1 = { color: 'rgba(100,100,100,0.75)', padding: '20px 0 0 0', textTransform: 'uppercase', fontSize: '10px'};
    return (
      <Dialog className="simple-dialog">
        <button className="btn-close" onClick={this.props.dialog.dismiss}>x</button>
        <div>Simple Dialog with react-dialogista</div>
        <div style={s1}>Press 'ESC' to close</div>
      </Dialog>
    );
  }
}
