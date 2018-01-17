import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { routerReducer } from 'react-router-redux';
import App from './App';
import auth from './modules/auth';
import app from './modules/app';
import distance from './modules/distance';

injectTapEventPlugin();

const composeEnhancers =
  process.env.NODE_ENV !== 'production'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

const store = createStore(
  combineReducers({
    app,
    auth,
    distance,
    routing: routerReducer
  }),
  composeEnhancers()
  // applyMiddleware(),
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
