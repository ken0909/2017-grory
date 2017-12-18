import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Login from "../components/Auth/Login";
import SignIn from "../components/Auth/SignIn";
import { firebaseAuth } from "../utils/FirebaseUtil";

export default class Auth extends Component {
  constructor() {
    super();
    this.state = {
      signIn: false
    };
  }

  componentDidMount() {
    firebaseAuth.signOut();
  }

  render() {
    const handleToggleAuth = () =>
      this.setState({ signIn: !this.state.signIn });

    return (
      <MuiThemeProvider>
        <div className="Auth">
          {this.state.signIn ? (
            <Login onChangeAuthMode={handleToggleAuth} />
          ) : (
            <SignIn onChangeAuthMode={handleToggleAuth} />
          )}
        </div>
      </MuiThemeProvider>
    );
  }
}
