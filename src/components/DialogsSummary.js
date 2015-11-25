import React, { PropTypes } from 'react';

const summaryStyle = {
  position: 'absolute',
  top: '20vh',
  right: '1vw',
  backgroundColor: '#ffffff',
  padding: 10,
};

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
      <div style={summaryStyle}>
        There are { pendingDialogsCount } dialogs
      </div>
    );
  }
}
