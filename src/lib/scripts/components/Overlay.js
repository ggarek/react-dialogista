import React, { PropTypes } from 'react';
import cx from 'classnames';

/**
 * @class Overlay
 */
export default class Overlay extends React.Component {
  static propTypes = {
    className: PropTypes.string,
  };
  static defaultProps = {};

  render() {
    const classes = cx('dialog-host__overlay', this.props.className);
    return (
      <div className={classes} />
    );
  }
}
