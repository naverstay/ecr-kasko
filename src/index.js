import React from 'react';
import ReactDOM from 'react-dom';
import "antd/dist/antd.less";

import './index.scss';
import App from './App';
import AppTab from './AppTab';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    {/*<App />*/}
    <AppTab />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
