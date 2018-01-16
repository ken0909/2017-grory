import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import App from './App';
import auth from './modules/auth';

injectTapEventPlugin();

const store = createStore(
  combineReducers({
    auth,
    routing: routerReducer
  }),
  process.env.NODE_ENV !== 'production'
    ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    : null
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
