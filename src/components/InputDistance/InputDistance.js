import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { firebaseDbRef, firebaseAuth } from '../../utils/FirebaseUtil';
import '../../assets/stylesheets/Common.css';
import * as actions from '../../modules/distance';

const mapStateToProps = state => ({
  distance: state.distance
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

class InputDistance extends React.Component {
  constructor() {
    super();
    this.distanceRef = firebaseDbRef('distance');
    this.style = {
      card: {
        margin: '10px 0px'
      }
    };
  }

  componentDidMount() {
    this.distanceRef.on('value', snapshot =>
      this.props.actions.setDistance({ distance: snapshot.val().distance })
    );
  }

  handleValidation(e) {
    const value = e.target.value;
    const distance = this.distance;
    if (!/^(\d)+(\.(\d)*)?$/.test(value)) {
      distance.state.errorText = '半角数値を入力してください';
      return;
    }
    distance.state.errorText = '';
  }

  calc(distance) {
    return Math.floor(distance * 10) / 10;
  }

  handleSubmit() {
    const distance = parseFloat(this.distance.getInputNode().value);
    this.props.actions.increaseDistance(distance);

    this.distanceRef.transaction(currentVal => {
      const currentDistance = currentVal.distance || 0;
      return { distance: this.calc(currentDistance + distance) };
    });
    this.userRef.transaction(currentVal => {
      const currentDistance = currentVal.distance || 0;
      return {
        distance: this.calc(currentDistance + distance),
        name: currentVal.name || firebaseAuth.currentUser.displayName,
        userAgent: navigator.userAgent,
        platform: navigator.platform
      };
    });

    this.distance.getInputNode().value = 0;
  }

  render() {
    return (
      <div className="InputDistance">
        <Card style={this.style.card}>
          <CardHeader title="何キロ走りましたか？" />
          <div className="Center">
            <TextField
              floatingLabelText="半角数字で入力してください"
              hintText="少数も入力できます"
              required={true}
              onChange={this.handleValidation}
              ref={input => (this.distance = input)}
              type="number"
            />
            <span>km</span>
          </div>
          <br />
          <div className="Center">
            <RaisedButton
              label="送信"
              primary={true}
              onTouchTap={this.handleSubmit}
            />
          </div>
          {/* {this.state.inputDistance !== 0 && (
            <div className="Center">
              <CardText>
                {this.state.inputDistance}km入力されました！
                <br />
                お疲れ様でした！
              </CardText>
            </div>
          )} */}
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

export default connect(mapStateToProps, mapDispatchToProps)(InputDistance);
