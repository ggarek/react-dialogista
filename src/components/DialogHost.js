import React, { PropTypes } from 'react';
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
  };
  static defaultProps = {};

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
    const { dialogOnTop, pendingDialogs, store } = this.props;

    if (dialogOnTop) {
      const {
        component,
        props,
      } = dialogOnTop;

      const dialog = {
        dismiss() { store.dispatch(dismissDialog()); },
        confirm() { store.dispatch(confirmDialog()); },
      };

      content = React.createElement(component, { ...props, dialog });
    }

    const summaryProps = {
      pendingDialogsCount: pendingDialogs.length,
    };

    if (!dialogOnTop) {
      return null;
    }

    return (
      <Overlay>
        <DialogsSummary {...summaryProps}/>
        { content }
      </Overlay>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(DialogHost);
