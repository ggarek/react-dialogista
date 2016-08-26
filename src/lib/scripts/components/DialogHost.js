import React, { PropTypes } from 'react';
import cx from 'classnames';
import Overlay from './Overlay';
import DialogsSummary from './DialogsSummary';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import FirstChild from './FirstChild';
import { connect } from 'react-redux';
import wrapWith from './wrapWith';

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
    dialogOnTop: PropTypes.object,
    pendingDialogs: PropTypes.arrayOf(PropTypes.object).isRequired,
    overlayClassName: PropTypes.string,
    summaryClassName: PropTypes.string,
    className: PropTypes.string,
    childrenTransitionProps: PropTypes.object,
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
    const {
      dialogOnTop,
      pendingDialogs,
      store,
      overlayClassName,
      summaryClassName,
      className,
      childrenTransitionProps,
    } = this.props;

    if (dialogOnTop) {
      const {
        key,
        component,
        props,
      } = dialogOnTop;

      const dialog = {
        dismiss() { store.dispatch(dismissDialog()); },
        confirm() { store.dispatch(confirmDialog()); },
      };

      const dialogProps = { ...props, dialog, key };
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
    const animated = Boolean(childrenTransitionProps);

    if (animated) {
      return (
        <ReactCSSTransitionGroup
          component="div"
          className={classes}
          {...childrenTransitionProps}
        >
          <Overlay className={overlayClassName}/>
          <DialogsSummary {...summaryProps}/>
          { content }
        </ReactCSSTransitionGroup>
      );
    }

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

const wrapped = wrapWith(
  ReactCSSTransitionGroup,
  props => ({ ...props.selfTransitionProps, component: FirstChild }),
  DialogHost,
  ({ selfTransitionProps, ...rest }) => rest, // eslint-disable-line
  props => Boolean(props.dialogOnTop),
  props => Boolean(props.selfTransitionProps)
);

export default connect(mapStateToProps)(wrapped);
