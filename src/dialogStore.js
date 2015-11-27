import { createStore } from 'redux';

function initialState() {
  return {
    dialogOnTop: null,
    pendingDialogs: [],
  };
}

function handleShowDialog(state, { component, props }) {
  const dialogOnTop = {
    component,
    props,
  };

  return {
    dialogOnTop,
    pendingDialogs: [dialogOnTop, ...state.pendingDialogs],
  };
}

function handleShowManyDialogs(state, { dialogs }) {
  const newDialogs = [...dialogs].reverse();
  return {
    dialogOnTop: newDialogs[0],
    pendingDialogs: newDialogs.concat(state.pendingDialogs),
  };
}

function handleCloseDialog(state) {
  const { dialogOnTop, pendingDialogs } = state;
  if (!dialogOnTop) {
    return state;
  }

  const nextPendingDialogs = pendingDialogs.slice(1);

  return {
    dialogOnTop: nextPendingDialogs[0] || null,
    pendingDialogs: nextPendingDialogs,
  };
}

function showDialog(state = initialState(), { type, ...payload }) {
  switch (type) {
  case 'SHOW_DIALOG':
    return handleShowDialog(state, payload);

  case 'SHOW_MANY_DIALOGS':
    return handleShowManyDialogs(state, payload);

  case 'DISMISS_DIALOG':
  case 'CONFIRM_DIALOG':
    return handleCloseDialog(state);

  default: return state;
  }
}

export default createStore(showDialog);
