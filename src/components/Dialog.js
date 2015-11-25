import React, { PropTypes } from 'react';

const contentStyle = {
  display: 'inline-block',
  top: '50%',
  transform: 'translateY(-50%)',
  position: 'relative',

  backgroundColor: '#ffffff',
  padding: 10,
  boxShadow: '1px 1px 1px 2px rgba(14,14,14,0.15)',
};

/**
 * @class Dialog
 */
export default class Dialog extends React.Component {
  static propTypes = {
    children: PropTypes.any,
  };
  static defaultProps = {};

  render() {
    return <div style={contentStyle}>{ this.props.children }</div>;
  }
}
