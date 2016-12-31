import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Card from 'material-ui/Card';
import { firebaseDbRef, firebaseAuth } from '../../utils/FirebaseUtil';
import '../../assets/stylesheets/Common.css';

export default class InputDistance extends Component {
    constructor() {
        super();
        this.state = {
            distance: 0,
            submit: true,
            userDistance: 0,
        };
        this.distanceRef = firebaseDbRef('distance');
        this.style = {
            card: {
                margin: '10px 0px',
            },
        };
    }

    componentDidMount() {
        this.distanceRef.on('value', (snapshot) => {
            this.setState({ distance: snapshot.val().distance });
        });
        firebaseAuth.onAuthStateChanged((user) => {
            if (user) {
                this.userRef = firebaseDbRef(`user/${user.uid}`);
                this.userRef.on('value', (snapshot) => {
                    if (snapshot.val()) {
                        this.setState({ userDistance: snapshot.val().distance });
                    }
                });
            }
        });
    }

    render() {
        const handleValidation = (event) => {
            const value = event.target.value;
            const distance = this.refs.distance;
            if (!value) {
                this.setState({ submit: true });
                return;
            }
            const number = /^(\d)+(\.(\d)*)?$/;
            if (!number.test(value)) {
                distance.state.errorText = '半角数値を入力してください';
                this.setState({ submit: true });
                return;
            }
            distance.state.errorText = '';
            this.setState({ submit: false });
        };

        const submit = () => {
            const distance = this.refs.distance.getValue();
            const decimalPoint = Math.pow(10, 1);
            const calcDestance = Math.round(distance * decimalPoint) / decimalPoint;
            this.distanceRef.update({
                distance: this.state.distance + calcDestance,
            });
            this.userRef.update({
                distance: this.state.userDistance + calcDestance,
            });
        }

        return (
            <div className="InputDistance">
                <Card style={this.style.card}>
                    <div className="Center">
                        <TextField
                            floatingLabelText="半角数字で入力してください"
                            hintText="少数も入力できます"
                            required={true}
                            onChange={handleValidation}
                            ref="distance"
                        />
                        <span>
                            km
                        </span>
                    </div>
                    <br />
                    <div className="Center">
                        <RaisedButton
                            label='送信'
                            primary={true}
                            onTouchTap={submit}
                            disabled={this.state.submit}
                        />
                    </div>
                </Card>
            </div>
        );
    }
}
