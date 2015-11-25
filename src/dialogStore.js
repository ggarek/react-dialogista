import { createStore } from 'redux';

function initialState() {
  return {
    dialogOnTop: null,
    pendingDialogs: [],
  };
}

function handleShowDialog(state, payload) {
  const { component, props } = payload;
  const dialogOnTop = {
    component,
    props,
  };

  return {
    dialogOnTop,
    pendingDialogs: [dialogOnTop, ...state.pendingDialogs],
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

  case 'DISMISS_DIALOG':
  case 'CONFIRM_DIALOG':
    return handleCloseDialog(state);

  default: return state;
  }
}

export default createStore(showDialog);
