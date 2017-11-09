import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import Overlay from './Overlay';
import DialogsSummary from './DialogsSummary';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import FirstChild from './FirstChild';
import { connect } from 'react-redux';
import wrapWith from './wrapWith';

const ESC = 27;

function dismissDialog(id) {
  return {
    type: 'DISMISS_DIALOG',
    id,
  };
}

function confirmDialog(id) {
  return {
    type: 'CONFIRM_DIALOG',
    id,
  };
}

/**
 * @class DialogHost
 */
class DialogHost extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    overlayClassName: PropTypes.string,
    summaryClassName: PropTypes.string,
    className: PropTypes.string,
    childrenTransitionProps: PropTypes.object,
    mode: PropTypes.oneOf(['stack', 'queue']),
    show: PropTypes.number,
    items: PropTypes.array,
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

      // Since only host now knows the display mode, it should get proper dialog id'
      // For the stack mode close the last dialog added, for the queue - the first one.
      const dialogs = store.getState().items;
      if (!dialogs.length) return;

      const idToClose = this.props.mode === 'stack'
        ? dialogs[dialogs.length - 1].id : dialogs[0].id;
      store.dispatch(dismissDialog(idToClose));
    }
  }

  render() {
    const {
      store,
      overlayClassName,
      summaryClassName,
      className,
      childrenTransitionProps,
      items,
      mode,
      show,
    } = this.props;

    if (items.length === 0) return null;

    let content;


    const specialProps = dlg => ({
      dismiss() { store.dispatch(dismissDialog(dlg.id)); },
      confirm() { store.dispatch(confirmDialog(dlg.id)); },
    });

    // TODO Stack and Queue is not very good naming. Much better would be "show last 3 items" or "show first 3 items"
    const toShow = mode === 'stack' ? items.slice(0, show) : items.slice(-1 * show);
    content = toShow.map(dlg => React.createElement(
      dlg.component,
      {
        ...dlg.props,
        dialog: specialProps(dlg),
        key: dlg.id,
      })
    );

    const summaryProps = {
      pendingDialogsCount: Math.max(0, items.length - show),
      className: summaryClassName,
    };

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
  props => Boolean(props.items.length > 0),
  props => Boolean(props.selfTransitionProps)
);

export default connect(mapStateToProps)(wrapped);
