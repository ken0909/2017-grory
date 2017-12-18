import React, { Component } from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import { Card, CardHeader, CardText } from "material-ui/Card";
import { firebaseDbRef, firebaseAuth } from "../../utils/FirebaseUtil";
import "../../assets/stylesheets/Common.css";

export default class InputDistance extends Component {
  constructor() {
    super();
    this.state = {
      distance: 0,
      isDisabled: true,
      userDistance: 0,
      inputDistance: 0,
      input: "",
      login: false
    };
    this.distanceRef = firebaseDbRef("distance");
    this.style = {
      card: {
        margin: "10px 0px"
      }
    };
  }

  componentDidMount() {
    this.distanceRef.on("value", snapshot => {
      this.setState({ distance: snapshot.val().distance });
    });
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        this.userRef = firebaseDbRef(`user/${user.uid}`);
        this.setState({ login: true });
      } else {
        this.setState({ login: false });
        this.setState({ isDisabled: true });
      }
    });
  }

  render() {
    const handleValidation = event => {
      const value = event.target.value;
      this.setState({ input: value });
      const distance = this.refs.distance;
      if (!this.state.login) {
        distance.state.errorText = "入力するにはログインしてください";
        this.setState({ isDisabled: true });
        return;
      }
      if (!value) {
        this.setState({ isDisabled: true });
        return;
      }
      const number = /^(\d)+(\.(\d)*)?$/;
      if (!number.test(value)) {
        distance.state.errorText = "半角数値を入力してください";
        this.setState({ isDisabled: true });
        return;
      }
      distance.state.errorText = "";
      this.setState({ isDisabled: false });
    };

    const submit = () => {
      const distance = parseFloat(this.refs.distance.getValue());
      const calc = distance => Math.floor(distance * 10) / 10;
      this.setState({
        inputDistance: calc(this.state.inputDistance + distance)
      });
      this.setState({ input: "" });
      this.distanceRef.transaction(currentVal => {
        const currentDistance = currentVal.distance || 0;
        return { distance: calc(currentDistance + distance) };
      });
      this.userRef.transaction(currentVal => {
        const currentDistance = currentVal.distance || 0;
        const userAgent = navigator.userAgent;
        return {
          distance: calc(currentDistance + distance),
          name: currentVal.name || firebaseAuth.currentUser.displayName,
          userAgent:
            userAgent.indexOf("Line") === -1
              ? userAgent
              : currentVal.userAgent || userAgent,
          platform: navigator.platform
        };
      });
    };

    return (
      <div className="InputDistance">
        <Card style={this.style.card}>
          <CardHeader title="何キロ走りましたか？" />
          <div className="Center">
            <TextField
              floatingLabelText="半角数字で入力してください"
              hintText="少数も入力できます"
              value={this.state.input}
              required={true}
              onChange={handleValidation}
              ref="distance"
              type="number"
            />
            <span>km</span>
          </div>
          <br />
          <div className="Center">
            <RaisedButton
              label="送信"
              primary={true}
              onTouchTap={submit}
              disabled={this.state.isDisabled}
            />
          </div>
          {this.state.inputDistance !== 0 && (
            <div className="Center">
              <CardText>
                {this.state.inputDistance}km入力されました！
                <br />
                お疲れ様でした！
              </CardText>
            </div>
          )}
        </Card>
        <Card style={this.style.card}>
          <CardText>
            不具合やご意見がありましたら
            <a href="mailto:shiva0909ken@gmail.com?subject=【栄光期間Run企画】問い合わせ">
              shiva0909ken@gmail.com
            </a>
            までご連絡ください
          </CardText>
        </Card>
      </div>
    );
  }
}
