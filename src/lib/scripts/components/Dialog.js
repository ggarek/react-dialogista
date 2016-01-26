import React, { PropTypes } from 'react';
import cx from 'classnames';

/**
 * @class Dialog
 */
export default class Dialog extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
  };
  static defaultProps = {};

  render() {
    const { children, className } = this.props;
    const classes = cx('dialog-host__dialog', className);
    return <div className={classes}>{ children }</div>;
  }
}
