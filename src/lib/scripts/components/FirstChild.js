import React, { PropTypes } from 'react';

/**
 * @class FirstChild
 */
export default class FirstChild extends React.Component {
  static propTypes = {
    children: PropTypes.any,
  };
  render() {
    const children = React.Children.toArray(this.props.children);
    return children[0] || null;
  }
}
