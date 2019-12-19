import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './fonts/DS-DIGI.TTF';
// const ipc = require('node-ipc');
// ipc.config.id = 'webApp';
// ipc.config.retry = 1500;
// ipc.config.silent = true;
//
// ipc.connectTo('serialPortServer', () => {
//     ipc.of['jest-observer'].on('connect', () => {
//         ipc.of['jest-observer'].emit('a-unique-message-name', "The message we send");
//     });
// });

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
