import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from "react-router-redux";
import Root from './containers/Root';
import Auth from './containers/Auth';
import Ranking from './containers/Ranking';
import { history } from './store';

const Routes = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path="/" component={Root} />
      <Route path="/login" component={Auth} />
      <Route path="/ranking" component={Ranking} />
    </Switch>
  </ConnectedRouter>
);

export default Routes;
