import React, { Component } from 'react';
import Chip from 'material-ui/Chip';
import { CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { firebaseDbRef, firebaseAuth } from '../../utils/FirebaseUtil';

export default class Menu extends Component {
  constructor() {
    super();
    this.state = {
      distance: 0,
      name: 'ゲスト'
    };
  }

  componentDidMount() {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        const ref = firebaseDbRef(`user/${user.uid}`);
        ref.on('value', snapshot => {
          if (snapshot.val()) {
            this.setState({ distance: snapshot.val().distance });
          } else {
            ref.update({
              distance: 0,
              name: user.displayName,
              userAgent: navigator.userAgent,
              platform: navigator.platform
            });
          }
        });
        this.setState({ name: user.displayName });
      }
    });
  }

  render() {
    const logout = () => {
      firebaseAuth.signOut();
      window.location.href = '/login';
    };

    const updateUserName = () => {
      const user = firebaseAuth.currentUser;
      user
        .updateProfile({
          displayName: this.refs.name.getValue().trim()
        })
        .then(() => {
          this.setState({ name: user.displayName });
        });
    };

    return (
      <div className="Menu">
        <div className="Center">
          <Chip>{this.state.name}さん</Chip>
        </div>
        {!this.state.name && (
          <div>
            <TextField
              floatingLabelText="名前を設定"
              fullWidth={true}
              required={true}
              autoComplete="nickname"
              ref="name"
            />
            <div className="Center">
              <RaisedButton
                label="設定"
                primary={true}
                onTouchTap={updateUserName}
              />
            </div>
          </div>
        )}
        <div className="Center">
          <CardText>合計距離：{this.state.distance}km</CardText>
        </div>
        <div className="Center">
          <RaisedButton label="ログアウト" primary={true} onTouchTap={logout} />
        </div>
      </div>
    );
  }
}
