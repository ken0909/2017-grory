import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Login from '../components/Auth/Login';
import SignIn from '../components/Auth/SignIn';
import { firebaseAuth } from '../utils/FirebaseUtil';
import * as actions from '../modules/auth';

const mapStateToProps = state => {
  return { auth: state.auth };
};

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(actions, dispatch) };
};

const Auth = ({ auth, actions }) => {
  firebaseAuth.signOut();
  return (
    <MuiThemeProvider>
      <React.Fragment>
        {auth.logInMode ? (
          <Login onChangeAuthMode={actions.toggleAuth} />
        ) : (
          <SignIn onChangeAuthMode={actions.toggleAuth} />
        )}
      </React.Fragment>
    </MuiThemeProvider>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
