import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import CircularProgress from 'material-ui/CircularProgress/CircularProgress';
import { CardText } from 'material-ui/Card';
import { orange500, red500 } from 'material-ui/styles/colors';
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

const Login = ({ onChangeAuthMode, auth, actions }) => {
  const handleSubmit = e => {
    e.preventDefault();

    const email = this.email.getInputNode().value;
    const password = this.password.getInputNode().value;
    if (!email || !password) {
      actions.logInFailure(
        new TypeError('メールアドレスとパスワードを入力してください')
      );
      return;
    }
    actions.logIn({ email, password });
  };

  return (
    <div className="Login">
      <div className="Center">
        <CardText>ログイン</CardText>
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
        </React.Fragment>
      )}
      {auth.error && (
        <div className="CenterColum">
          <CardText color={red500}>ログインに失敗しました</CardText>
          <CardText color={red500}>{auth.message}</CardText>
        </div>
      )}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
