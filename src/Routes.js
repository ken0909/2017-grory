import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Root from './containers/Root';
import Auth from './containers/Auth';
import Ranking from './containers/Ranking';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Root} />
      <Route path="/login" component={Auth} />
      <Route path="/ranking" component={Ranking} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
