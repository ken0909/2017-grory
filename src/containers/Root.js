import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../components/Header/Header';
import InputDistance from '../components/InputDistance/InputDistance';
import Progress from '../components/Progress/Progress';
import * as actions from "../modules/auth";

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

class Root extends React.Component {
  componentDidMount() {
    this.props.actions.loadLogInState({})
  }

  render() {
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <Header />
          <Progress />
          <InputDistance />
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default connect(null, mapDispatchToProps)(Root);
