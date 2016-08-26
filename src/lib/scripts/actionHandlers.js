export function initialState() {
  return {
    dialogOnTop: null,
    pendingDialogs: [],
  };
}

export function handleShowDialogQueue(state, { id, component, props }) {
  const nextDialog = {
    id,
    component,
    props,
  };
  const dialogOnTop = state.dialogOnTop || nextDialog;

  return {
    ...state,
    dialogOnTop,
    pendingDialogs: [...state.pendingDialogs, nextDialog],
  };
}

export function handleShowDialogStack(state, { id, component, props }) {
  const dialogOnTop = {
    id,
    component,
    props,
  };

  return {
    ...state,
    dialogOnTop,
    pendingDialogs: [dialogOnTop, ...state.pendingDialogs],
  };
}

export function handleShowManyDialogsStack(state, { dialogs }) {
  const newDialogs = [...dialogs].reverse();
  return {
    ...state,
    dialogOnTop: newDialogs[0],
    pendingDialogs: newDialogs.concat(state.pendingDialogs),
  };
}

export function handleShowManyDialogsQueue(state, { dialogs }) {
  const dialogOnTop = state.dialogOnTop || dialogs[0];
  return {
    ...state,
    dialogOnTop,
    pendingDialogs: state.pendingDialogs.concat(dialogs),
  };
}


export function handleCloseDialog(state) {
  const { dialogOnTop, pendingDialogs } = state;
  if (!dialogOnTop) {
    return state;
  }

  const nextPendingDialogs = pendingDialogs.slice(1);

  return {
    ...state,
    dialogOnTop: nextPendingDialogs[0] || null,
    pendingDialogs: nextPendingDialogs,
  };
}
