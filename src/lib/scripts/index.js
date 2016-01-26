import dialogStore from './dialogStore';
import Dialog from './components/Dialog';
import DialogHost from './components/DialogHost';

/**
 * Show one dialog
 * @param {React.Component} component
 * @param {object} props
 */
function showDialog(component, props) {
  dialogStore.dispatch({
    type: 'SHOW_DIALOG',
    component,
    props,
  });
}

/**
 * Show any number of dialogs at once
 * @param {array} dialogs
 */
function showManyDialogs(dialogs) {
  dialogStore.dispatch({
    type: 'SHOW_MANY_DIALOGS',
    dialogs: dialogs.map(([component, props]) => ({ component, props })),
  });
}

export {
  Dialog,
  DialogHost,
  dialogStore,
  showDialog,
  showManyDialogs,
};
