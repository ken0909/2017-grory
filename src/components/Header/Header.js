import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Login from '../Auth/Login';
import SignIn from '../Auth/SignIn';
import Menu from '../Menu/Menu';
import { firebaseAuth } from '../../utils/FirebaseUtil';

export default class Header extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            login: false,
            loginMode: false,
        };
    }

    componentDidMount() {
        firebaseAuth.onAuthStateChanged((user) => {
            if (user) {
                user.updateProfile({
                    displayName: this.name,
                });
                this.user = user;
                this.setState({ login: true });
            } else {
                this.setState({ login: false });
            }
        });
    }

    render() {
        const handleToggle = () => this.setState({ open: !this.state.open });

        const handleClose = () => this.setState({ open: false });

        const handleToggleAuth = () => this.setState({ loginMode: !this.state.loginMode });

        const signInEvent = (name) => {
            handleClose();
            this.name = name;
        }

        return (
            <div className="Header">
                <AppBar
                    title="2017 RUN!!"
                    onLeftIconButtonTouchTap={handleToggle}
                />
                <Drawer
                    docked={false}
                    width={this.state.login ? 200 : window.innerWidth}
                    open={this.state.login ? this.state.open : !this.state.login}
                    onRequestChange={(open) => this.setState({open})}
                >
                    {this.state.login ?
                        <Menu user={this.user}/> :
                        this.state.loginMode ?
                        <Login loginEvent={handleClose} onChangeAuthMode={handleToggleAuth} /> :
                        <SignIn loginEvent={signInEvent} onChangeAuthMode={handleToggleAuth} />}
                </Drawer>
            </div>
        );
    }
}
