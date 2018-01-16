import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import { CardText } from 'material-ui/Card';
import { orange500, red500 } from 'material-ui/styles/colors';
import { firebaseAuth } from '../../utils/FirebaseUtil';
import * as actions from '../../modules/auth';
import '../../assets/stylesheets/Common.css';

const mapStateToProps = state => {
  return { auth: state.auth };
};

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(actions, dispatch) };
};

const style = {
  common: {
    margin: '10px 0px'
  }
};

const Login = ({ onChangeAuthMode, auth, actions, history }) => {
  const handleSubmit = e => {
    e.preventDefault();
    actions.logIn();

    const email = this.email.getInputNode().value;
    const password = this.password.getInputNode().value;
    if (!email || !password) {
      actions.logInFailure(
        new TypeError('メールアドレスとパスワードを入力してください')
      );
      return;
    }

    firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        actions.logInSuccess({ name: user.displayName });
        history.push('/');
      })
      .catch(error => actions.logInFailure(error));
  };

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <div className="Center">
          <CardText>ログイン</CardText>
        </div>
        <TextField
          floatingLabelText="メールアドレス"
          type="email"
          fullWidth={true}
          required={true}
          autoComplete="email"
          ref={input => (this.email = input)}
        />
        <TextField
          floatingLabelText="パスワード"
          type="password"
          fullWidth={true}
          required={true}
          autoComplete="current-password"
          ref={input => (this.password = input)}
        />
        <div className="Center">
          <RaisedButton
            label="ログイン"
            primary={true}
            onTouchTap={handleSubmit}
          />
        </div>
      </form>
      <div className="Center">
        <Chip
          onTouchTap={onChangeAuthMode}
          backgroundColor={orange500}
          style={style.common}
        >
          新規登録はこちら
        </Chip>
      </div>
      {auth.error && (
        <div className="CenterColum">
          <CardText color={red500}>ログインに失敗しました</CardText>
          <CardText color={red500}>{auth.message}</CardText>
        </div>
      )}
    </div>
  );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
