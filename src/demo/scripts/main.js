import '../../lib/styles/dialogista.scss';
import '../styles/simple-dialog.scss';
import '../styles/general.scss';

import ReactDOM from 'react-dom';
import React from 'react';
import App from './components/App';
import SimpleDialog from './components/SimpleDialog';
import { DialogHost, createDialogActions, createDialogistaReducer } from '../../lib/scripts';
import { createStore } from 'redux';
const dialogStore = createStore(createDialogistaReducer());
const { showDialog } = createDialogActions(dialogStore);

const openSimpleDialog = () => showDialog(SimpleDialog, {});
ReactDOM.render(
  <div className="container">
    <App openDialog={openSimpleDialog} />
    <DialogHost store={dialogStore} overlayClassName="my-dialog-overlay" className="my-dialog-host"/>
  </div>,
  document.querySelector('#dialogista')
);
