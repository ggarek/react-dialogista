import createDialogistaReducer from './reducer';
import Dialog from './components/Dialog';
import DialogHost from './components/DialogHost';
import * as actions from './actions';

function createDialogActions(dialogStore) {
  function showDialog(component, props) {
    const action = actions.showDialog(component, props);
    dialogStore.dispatch(action);
    return action.id;
  }

  function showManyDialogs(dialogs) {
    const action = actions.showManyDialogs(dialogs);
    dialogStore.dispatch(action);
    return action.dialogs.map(x => x.id);
  }

  return {
    showDialog,
    showManyDialogs,
    dismissDialog: id => dialogStore.dispatch(actions.dismissDialog(id)),
    confirmDialog: id => dialogStore.dispatch(actions.confirmDialog(id)),
  };
}

export {
  Dialog,
  DialogHost,
  createDialogistaReducer,
  createDialogActions,
};
