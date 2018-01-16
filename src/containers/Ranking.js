import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../components/Header/Header';
import Ranking from '../components/Ranking/Ranking';

const RankingContainer = () => (
  <MuiThemeProvider>
    <div>
      <Header />
      <Ranking />
    </div>
  </MuiThemeProvider>
);

export default RankingContainer;
