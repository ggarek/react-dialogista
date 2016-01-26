import React, { PropTypes } from 'react';

/**
 * @class DialogsSummary
 */
export default class DialogsSummary extends React.Component {
  static propTypes = {
    pendingDialogsCount: PropTypes.number.isRequired,
  };
  static defaultProps = {};

  render() {
    const {
      pendingDialogsCount,
    } = this.props;

    if (pendingDialogsCount < 2) {
      return null;
    }

    return (
      <div className="dialog-host__summary">
        There are { pendingDialogsCount } dialogs
      </div>
    );
  }
}
