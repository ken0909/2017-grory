import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, Route, browserHistory } from 'react-router';
import Root from './containers/Root';
import Auth from './containers/Auth';
import Ranking from './containers/Ranking';

injectTapEventPlugin();

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={Root} />
        <Route path="/login" component={Auth} />
        <Route path="/ranking" component={Ranking} />
    </Router>,
  document.getElementById('root')
);
