import React from 'react';
import { Dialog } from '../../../lib/scripts';

/**
 * @class SimpleDialog
 */
export default class SimpleDialog extends React.Component {
  static propTypes = {};
  static defaultProps = {};

  render() {
    const s1 = { color: 'rgba(100,100,100,0.75)', padding: '20px 0 0 0', textTransform: 'uppercase', fontSize: '10px'};
    return (
      <Dialog className="simple-dialog">
        <div>Simple Dialog with react-dialogista</div>
        <div style={s1}>Press 'ESC' to close</div>
      </Dialog>
    );
  }
}
