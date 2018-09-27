import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";

import './index.css';
import App from './userInterface/react/containers/App';
import registerServiceWorker from './registerServiceWorker';
import store from "./application/state/store";

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
