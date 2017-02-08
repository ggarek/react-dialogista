import {
  showManyDialogs,
  showDialog,
  closeById,
  initialState,
} from './actionHandlers';

// All dialogs are added to the end
const createDialogistaReducer = () => (state = initialState(), { type, ...payload }) => {
  switch (type) {
  case 'SHOW_DIALOG':
    return showDialog(state, payload);
  case 'SHOW_MANY_DIALOGS':
    return showManyDialogs(state, payload.dialogs);
  case 'DISMISS_DIALOG':
  case 'CONFIRM_DIALOG':
    return closeById(state, payload.id);
  default:
    return state;
  }
};

export default createDialogistaReducer;
