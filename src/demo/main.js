import ReactDOM from 'react-dom';
import React from 'react';
import App from './components/App';
import { DialogHost, dialogStore } from '../lib';

ReactDOM.render(
  <div className="container">
    <App />
    <DialogHost store={dialogStore}/>
  </div>,
  document.querySelector('#dialogista')
);
