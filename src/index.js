import dialogStore from './dialogStore';
import Dialog from './components/Dialog';
import DialogHost from './components/DialogHost';

function showDialog(component, props) {
  dialogStore.dispatch({
    type: 'SHOW_DIALOG',
    component,
    props,
  });
}

export {
  Dialog,
  DialogHost,
  dialogStore,
  showDialog,
};
