import React, { PropTypes } from 'react';
import cx from 'classnames';
import Overlay from './Overlay';
import DialogsSummary from './DialogsSummary';
import { connect } from 'react-redux';

const ESC = 27;

function dismissDialog() {
  return {
    type: 'DISMISS_DIALOG',
  };
}

function confirmDialog() {
  return {
    type: 'CONFIRM_DIALOG',
  };
}

/**
 * @class DialogHost
 */
class DialogHost extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    dialogOnTop: PropTypes.object.isRequired,
    pendingDialogs: PropTypes.arrayOf(PropTypes.object).isRequired,
    overlayClassName: PropTypes.string,
    summaryClassName: PropTypes.string,
    className: PropTypes.string,
  };
  static defaultProps = {
  };

  constructor(props) {
    super(props);

    this.handleWindowKeyUp = this.handleWindowKeyUp.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keyup', this.handleWindowKeyUp);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleWindowKeyUp);
  }

  handleWindowKeyUp(ne) {
    const { store } = this.props;
    if (ne.keyCode === ESC && store) {
      ne.preventDefault();
      ne.stopPropagation();

      store.dispatch(dismissDialog());
    }
  }

  render() {
    let content = null;
    const { dialogOnTop, pendingDialogs, store, overlayClassName, summaryClassName, className } = this.props;

    if (dialogOnTop) {
      const {
        component,
        props,
      } = dialogOnTop;

      const dialog = {
        dismiss() { store.dispatch(dismissDialog()); },
        confirm() { store.dispatch(confirmDialog()); },
      };

      const dialogProps = { ...props, dialog };
      content = React.createElement(component, dialogProps);
    }

    const summaryProps = {
      pendingDialogsCount: pendingDialogs.length,
      className: summaryClassName,
    };

    if (!dialogOnTop) {
      return null;
    }

    const classes = cx('dialog-host', className);
    return (
      <div className={classes}>
        <Overlay className={overlayClassName}/>
        <DialogsSummary {...summaryProps}/>
        { content }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(DialogHost);
