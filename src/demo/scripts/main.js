import '../../lib/styles/dialogista.scss';
import '../styles/simple-dialog.scss';

import ReactDOM from 'react-dom';
import React from 'react';
import App from './components/App';
import { DialogHost, dialogStore } from '../../lib/scripts';

ReactDOM.render(
  <div className="container">
    <App />
    <DialogHost store={dialogStore}/>
  </div>,
  document.querySelector('#dialogista')
);
