import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Root from "./Root";
import './utils/fontawesome'
import {Provider} from "react-redux";
import {createStore} from 'redux'
import reducers from './reducers'
const store = createStore(reducers)

ReactDOM.render(<Provider store={store}><Root/></Provider>,
  document.getElementById('root')
);
serviceWorker.unregister();
