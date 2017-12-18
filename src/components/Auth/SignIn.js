import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import { CardText } from 'material-ui/Card';
import { orange500, red500 } from 'material-ui/styles/colors';
import { firebaseAuth } from '../../utils/FirebaseUtil';
import '../../assets/stylesheets/Common.css';

export default class SignIn extends Component {
    constructor() {
        super();
        this.state = {
            disabledSubmit: false,
            error: {
                error: false,
                message: '',
            }
        };
        this.style = {
            common: {
                margin: '10px 0px',
            },
            hint: {
                color: orange500,
            }
        };
    }

    render() {
        const submit = () => {
            const emailField = this.refs.email;
            const emailValue = emailField.getValue();
            const emailRegex = /[\w.-]+@[\w-]+\.[\w.-]+/;
            if (!emailRegex.test(emailValue)) {
                emailField.state.errorText = 'メールアドレスの形式が正しくありません';
                return;
            }
            const password1Field = this.refs.password1;
            const password2Field = this.refs.password2;
            const password1Value = password1Field.getValue();
            const password2Value = password2Field.getValue();
            if (!password1Value) {
                password1Field.state.errorText = 'パスワードは必須です';
            } else if (!password2Value) {
                password2Field.state.errorText = 'パスワード(確認用)は必須です';
            } else if (password1Value !== password2Value) {
                password2Field.state.errorText = 'パスワードが一致しません';
            }
            const nameField = this.refs.name;
            const nameValue = nameField.getValue();
            if (!nameValue) {
                nameField.state.errorText = '名前は必須です';
            }
            firebaseAuth.createUserWithEmailAndPassword(emailValue, password1Value).then((user) => {
                user.updateProfile({
                    displayName: nameValue,
                }).then(() => {
                    window.location.href = '/';
                });
            }).catch((error) => {
                this.setState({
                    error: {
                        error: true,
                        message: error.message,
                    }
                });
            });
        };

        const emailValidation = (event) => {
            const value = event.target.value;
            const email = this.refs.email;
            if (!value) {
                email.state.errorText = 'メールアドレスは必須です';
                this.setState({ disabledSubmit: true });
                return;
            }
            email.state.errorText = '';
            this.setState({ disabledSubmit: false });
        };

        const password1Validation = (event) => {
            const value = event.target.value;
            const password = this.refs.password1;
            if (!value) {
                password.state.errorText = 'パスワードは必須です';
                this.setState({ disabledSubmit: true });
                return;
            }
            const passwordRegex = /[\d|\w]{8,16}/;
            if (!passwordRegex.test(value)) {
                password.state.errorText = 'パスワードは8~16文字の半角英数字';
                this.setState({ disabledSubmit: true });
                return;
            }
            password.state.errorText = '';
            this.setState({ disabledSubmit: false });
        };

        const password2Validation = (event) => {
            const value = event.target.value;
            const password = this.refs.password2;
            if (!value) {
                password.state.errorText = 'パスワード(確認用)は必須です';
                this.setState({ disabledSubmit: true });
                return;
            }
            const passwordRegex = /(\d|\w){8,16}/;
            if (!passwordRegex.test(value)) {
                password.state.errorText = 'パスワードは8~16文字の半角英数字';
                this.setState({ disabledSubmit: true });
                return;
            }
            const password1 = this.refs.password1.getValue();
            if (password.getValue() !== password1) {
                password.state.errorText = 'パスワードが一致しません';
                this.setState({ disabledSubmit: true });
                return;
            }
            password.state.errorText = '';
            this.setState({ disabledSubmit: false });
        };

        return (
            <div className="SignIn">
                <div className="Center">
                    <CardText>
                        ユーザ登録してください
                    </CardText>
                </div>
                <TextField
                    floatingLabelText="メールアドレス"
                    type="email"
                    fullWidth={true}
                    onChange={emailValidation}
                    required={true}
                    autoComplete="email"
                    ref="email"
                />
                <TextField
                    floatingLabelText="パスワード"
                    type="password"
                    fullWidth={true}
                    onChange={password1Validation}
                    required={true}
                    autoComplete="new-password"
                    ref="password1"
                />
                <TextField
                    floatingLabelText="パスワード(確認用)"
                    type="password"
                    fullWidth={true}
                    onChange={password2Validation}
                    required={true}
                    autoComplete="new-password"
                    ref="password2"
                />
                <TextField
                    floatingLabelText="名前"
                    errorText="普段呼ばれている名前を登録してください"
                    errorStyle={this.style.hint}
                    fullWidth={true}
                    required={true}
                    autoComplete="nickname"
                    ref="name"
                />
                <div className="Center">
                    <RaisedButton
                        label='新規登録'
                        primary={true}
                        onTouchTap={submit}
                        disabled={this.state.disabledSubmit}
                    />
                </div>
                <div className="Center">
                    <Chip
                        onTouchTap={this.props.onChangeAuthMode}
                        backgroundColor={orange500}
                        style={this.style.common}
                        >
                        ログインはこちら
                    </Chip>
                </div>
                {this.state.error.error && (
                    <div className="CenterColum">
                        <CardText color={red500}>
                            登録に失敗しました
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
