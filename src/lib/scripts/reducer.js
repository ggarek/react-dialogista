import {
  initialState,
  handleCloseDialog,
  handleShowDialogQueue,
  handleShowDialogStack,
  handleShowManyDialogsStack,
  handleShowManyDialogsQueue,
} from './actionHandlers';

const DEFAULT_OPTIONS = {
  mode: 'stack',
};

function createDialogistaReducer(options = DEFAULT_OPTIONS) {
  const isStackMode = options.mode === 'stack';

  function dialogistaReducer(state = initialState(), { type, ...payload }) {
    switch (type) {
    case 'SHOW_DIALOG':
      return isStackMode ? handleShowDialogStack(state, payload) : handleShowDialogQueue(state, payload);

    case 'SHOW_MANY_DIALOGS':
      return isStackMode ? handleShowManyDialogsStack(state, payload) : handleShowManyDialogsQueue(state, payload);

    case 'DISMISS_DIALOG':
    case 'CONFIRM_DIALOG':
      return handleCloseDialog(state);

    default:
      return state;
    }
  }

  return dialogistaReducer;
}

export default createDialogistaReducer;
