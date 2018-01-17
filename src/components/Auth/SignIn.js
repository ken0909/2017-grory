import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import CircularProgress from 'material-ui/CircularProgress/CircularProgress';
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
  },
  hint: {
    color: orange500
  }
};

const SignIn = ({ onChangeAuthMode, auth, actions, history }) => {
  const handleSubmit = e => {
    e.preventDefault();
    actions.signIn();

    const emailField = this.email;
    const email = emailField.getInputNode().value;
    if (!/[\w.-]+@[\w-]+\.[\w.-]+/.test(email)) {
      actions.signInFailure(
        new TypeError('メールアドレスの形式が正しくありません')
      );
      return;
    }

    const passwordField = this.password;
    const confirmPasswordField = this.confirmPassword;
    const password = passwordField.getInputNode().value;
    const confirmPassword = confirmPasswordField.getInputNode().value;
    if (password !== confirmPassword) {
      actions.signInFailure(new TypeError('パスワードが一致しません'));
      return;
    }

    const name = this.name.getInputNode().value;
    firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        user
          .updateProfile({
            displayName: name
          })
          .then(() => {
            actions.signInSuccess({ name: user.displayName });
            history.push('/');
          })
          .catch(error => actions.signInFailure(error));
      })
      .catch(error => actions.signInFailure(error));
  };

  const handleValidatePassword = e => {
    const value = e.target.value;
    const password = this.password;
    if (!value) {
      password.state.errorText = 'パスワードは必須です';
      return;
    }
    if (!/[\d|\w]{8,16}/.test(value)) {
      password.state.errorText = 'パスワードは8~16文字の半角英数字';
      return;
    }
    password.state.errorText = '';
  };

  const handleValidateConfirmPassword = e => {
    const value = e.target.value;
    const password = this.confirmPassword;
    if (!value) {
      password.state.errorText = 'パスワード(確認用)は必須です';
      return;
    }
    if (!/(\d|\w){8,16}/.test(value)) {
      password.state.errorText = 'パスワードは8~16文字の半角英数字';
      return;
    }
    password.state.errorText = '';
  };

  return (
    <div className="SignIn">
      <div className="Center">
        <CardText>ユーザ登録してください</CardText>
      </div>
      {auth.isLoading ? (
        <div className="Center">
          <CircularProgress />
        </div>
      ) : (
        <React.Fragment>
          <form onSubmit={handleSubmit}>
            <TextField
              floatingLabelText="メールアドレス"
              type="email"
              fullWidth={true}
              required={true}
              ref={input => (this.email = input)}
            />
            <TextField
              floatingLabelText="パスワード"
              type="password"
              fullWidth={true}
              onChange={handleValidatePassword}
              required={true}
              ref={input => (this.password = input)}
            />
            <TextField
              floatingLabelText="パスワード(確認用)"
              type="password"
              fullWidth={true}
              onChange={handleValidateConfirmPassword}
              required={true}
              ref={input => (this.confirmPassword = input)}
            />
            <TextField
              floatingLabelText="名前"
              errorText="普段呼ばれている名前を登録してください"
              errorStyle={style.hint}
              fullWidth={true}
              required={true}
              ref={input => (this.name = input)}
            />
            <div className="Center">
              <RaisedButton
                label="新規登録"
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
              ログインはこちら
            </Chip>
          </div>
        </React.Fragment>
      )}
      {auth.error && (
        <div className="CenterColum">
          <CardText color={red500}>登録に失敗しました</CardText>
          <CardText color={red500}>{auth.message}</CardText>
        </div>
      )}
    </div>
  );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));
