import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import { CardText } from 'material-ui/Card';
import { orange500, red500 } from 'material-ui/styles/colors';
import { firebaseAuth } from '../../utils/FirebaseUtil';
import '../../assets/stylesheets/Common.css';

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            disabledSubmit: false,
            error: {
                error: false,
                message: '',
            },
        };
        this.style = {
            common: {
                margin: '10px 0px',
            },
        };
    }

    render() {
        const submit = () => {
            const email = this.refs.email.getValue();
            const password = this.refs.password.getValue();
            if (!email || !password) {
                return;
            }
            firebaseAuth.signInWithEmailAndPassword(email, password).catch((error) => {
                this.setState({
                    error: {
                        error: true,
                        message: error.message,
                    }
                });
            });
            this.props.loginEvent();
        };

        return (
            <div className="Login">
                <div className="Center">
                    <CardText>
                        ログイン
                    </CardText>
                </div>
                <TextField
                    floatingLabelText="メールアドレス"
                    type="email"
                    fullWidth={true}
                    required={true}
                    autoComplete="email"
                    ref="email"
                />
                <TextField
                    floatingLabelText="パスワード"
                    type="password"
                    fullWidth={true}
                    required={true}
                    autoComplete="current-password"
                    ref="password"
                />
                <div className="Center">
                    <RaisedButton
                        label='ログイン'
                        primary={true}
                        onTouchTap={submit}
                    />
                </div>
                <div className="Center">
                    <Chip
                        onTouchTap={this.props.onChangeAuthMode}
                        backgroundColor={orange500}
                        style={this.style.common}
                        >
                        新規登録はこちら
                    </Chip>
                </div>
                {this.state.error.error && (
                    <div className="CenterColum">
                        <CardText color={red500}>
                            ログインに失敗しました
                        </CardText>
                        <CardText color={red500}>
                            {this.state.error.message}
                        </CardText>
                    </div>
                )}
            </div>
        );
    }
}
