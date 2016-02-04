import { createStore } from 'redux';
import {
  initialState,
  handleCloseDialog,
  handleShowDialogQueue,
  handleShowDialogStack,
  handleShowManyDialogsStack,
  handleShowManyDialogsQueue,
} from './actionHandlers';

function createDialogStore(options) {
  const isStackMode = options.mode === 'stack';

  function showDialog(state = initialState(), { type, ...payload }) {
    switch (type) {
    case 'SHOW_DIALOG':
      return isStackMode ? handleShowDialogStack(state, payload) : handleShowDialogQueue(state, payload);

    case 'SHOW_MANY_DIALOGS':
      return isStackMode ? handleShowManyDialogsStack(state, payload) : handleShowManyDialogsQueue(state, payload);

    case 'DISMISS_DIALOG':
    case 'CONFIRM_DIALOG':
      return handleCloseDialog(state);

    default: return state;
    }
  }

  return createStore(showDialog);
}

export default createDialogStore;
