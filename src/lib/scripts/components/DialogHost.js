import React, { PropTypes } from 'react';
import cx from 'classnames';
import Overlay from './Overlay';
import DialogsSummary from './DialogsSummary';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import { connect } from 'react-redux';

const ESC = 27;


class FirstChild extends React.Component {
  render() {
    var children = React.Children.toArray(this.props.children);
    return children[0] || null;
  }
}

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
    return (
      <ReactCSSTransitionGroup
        component="div"
        className={classes}
        transitionName="example"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={400}
      >
        {
/*          <Overlay className={overlayClassName}/>
          < DialogsSummary {...summaryProps}/>*/
        }
        { content }
      </ReactCSSTransitionGroup>
    );
  }
}

function mapStateToProps(state) {
  return state;
}
//
const SelfTransitionHostHOC = ComposedComponent => class extends React.Component {
  render() {
    // const props = {
    //   transitionName: 'self',
    //   transitionEnterTimeout: 10500,
    //   transitionLeaveTimeout: 10400,
    // };
    return (
      <ReactCSSTransitionGroup
        component={FirstChild}
        transitionName="self"
        transitionEnterTimeout={2500}
        transitionLeaveTimeout={2400}
      >
        { this.props.dialogOnTop ? <ComposedComponent {...this.props} /> : null }
      </ReactCSSTransitionGroup>
    );
  }
};

function wrapWith(wrapper, wrapperProps, composed, composedProps, shouldRenderComposed = () => true) {
  return class extends React.Component {
    render() {
      const children = shouldRenderComposed(this.props)
        ? React.createElement(composed, composedProps(this.props))
        : null;

      return React.createElement(wrapper, wrapperProps(this.props), children);
    }
  };
}

const wrapped = wrapWith(
  ReactCSSTransitionGroup,
  () => ({ component: FirstChild, transitionName: 'self', transitionEnterTimeout: 500, transitionLeaveTimeout: 400 }),
  DialogHost,
  x => x,
  props => Boolean(props.dialogOnTop)
);

// export default connect(mapStateToProps)(DialogHost);
// export default connect(mapStateToProps)(SelfTransitionHostHOC(DialogHost));
export default connect(mapStateToProps)(wrapped);
