import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { routerReducer as routing, routerMiddleware } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import auth from './modules/auth';
import app from './modules/app';
import distance from './modules/distance';
import authMiddleware from './middleware/auth';

export const history = createBrowserHistory();

const composeEnhancers =
  process.env.NODE_ENV === 'production'
    ? compose
    : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  combineReducers({
    app,
    auth,
    distance,
    routing
  }),
  composeEnhancers(applyMiddleware(routerMiddleware(history), authMiddleware))
);
