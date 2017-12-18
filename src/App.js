import React from 'react';
import { Route } from 'react-router-dom';
import Root from './containers/Root';
import Auth from './containers/Auth';
import Ranking from './containers/Ranking';

export const App = () => (
  <React.Fragment>
    <Route exact path="/" component={Root} />
    <Route path="/login" component={Auth} />
    <Route path="/ranking" component={Ranking} />
  </React.Fragment>
)
