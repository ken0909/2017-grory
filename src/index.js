import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import store from "./store";
import Routes from "./Routes";

injectTapEventPlugin();

render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('app')
);
