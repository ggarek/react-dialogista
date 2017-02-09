import '../../lib/styles/dialogista.scss';
import '../styles/simple-dialog.scss';
import '../styles/general.scss';

import ReactDOM from 'react-dom';
import React from 'react';
import App from './components/App';
import SimpleDialog from './components/SimpleDialog';
import { createDialogActions, createDialogistaReducer } from '../../lib/scripts';
import { createStore } from 'redux';
const dialogStore = createStore(createDialogistaReducer());
const { showDialog, showManyDialogs } = createDialogActions(dialogStore);

const openSimpleDialog = () => showDialog(SimpleDialog, {});
const openManyDialogs = () => showManyDialogs([[SimpleDialog, {}], [SimpleDialog, {}], [SimpleDialog, {}], [SimpleDialog, {}]]);
ReactDOM.render(
  <App openDialog={openSimpleDialog} dialogStore={dialogStore} openMany={openManyDialogs}/>,
  document.querySelector('#dialogista')
);
