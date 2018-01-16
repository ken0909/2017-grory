import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
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
        {auth.isLoading ? (
          <CircularProgress />
        ) : auth.logInMode ? (
          <Login onChangeAuthMode={actions.switchSignIn} />
        ) : (
          <SignIn onChangeAuthMode={actions.switchLogIn} />
        )}
      </React.Fragment>
    </MuiThemeProvider>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
