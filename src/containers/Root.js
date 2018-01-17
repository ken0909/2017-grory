import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../components/Header/Header';
import InputDistance from '../components/InputDistance/InputDistance';
import Progress from '../components/Progress/Progress';

const Root = () => (
  <MuiThemeProvider>
    <React.Fragment>
      <Header />
      <Progress />
      <InputDistance />
    </React.Fragment>
  </MuiThemeProvider>
);

export default Root;
