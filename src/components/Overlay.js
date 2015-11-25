import React, { PropTypes } from 'react';

const overlayStyle = {
  position: 'fixed',
  left: 0,
  top: '-20vh',
  width: '100vw',
  height: '120vh', // for touch "spring" effect
  textAlign: 'center',
  backgroundColor: 'rgba(14, 14, 14, 0.85)',
  zIndex: 9999,
};

/**
 * @class Overlay
 */
export default class Overlay extends React.Component {
  static propTypes = {
    children: PropTypes.any,
  };
  static defaultProps = {};

  render() {
    return (
      <div style={overlayStyle}>
        { this.props.children }
      </div>
    );
  }
}
