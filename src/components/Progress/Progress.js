import React, { Component } from 'react';
import { Card, CardText, CardHeader } from 'material-ui/Card';
import LinearProgress from 'material-ui/LinearProgress';
import { Link } from 'react-router-dom';
import { firebaseDbRef, firebaseAuth } from '../../utils/FirebaseUtil';

export default class Progress extends Component {
    constructor() {
        super();
        this.state = {
            distance: 0,
            name: 'ゲスト',
            login: false,
        };
        this.ref = firebaseDbRef('distance');
        this.style = {
            card: {
                margin: '10px 0px',
            },
            progress: {
                height: '20px',
            },
            distance: {
                fontSize: '32px',
            },
        };
    }

    componentDidMount() {
        this.ref.on('value', (snapshot) => {
            this.setState({ distance: snapshot.val().distance });
        });
        firebaseAuth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({ name: user.displayName || 'ゲスト' });
                this.setState({ login: true });
            } else {
                this.setState({ login: false });
            }
        });
    }

    render() {
        return (
            <div className="Progress">
                {!this.state.login &&
                    <Card style={this.style.card}>
                        <div className="Center">
                            <CardText>
                                <Link to="/login">ログインしてください</Link>
                            </CardText>
                        </div>
                    </Card>
                }
                <Card style={this.style.card}>
                    <CardHeader
                        title="栄光期間2017kmラン企画！！"
                        subtitle={`こんにちは、${this.state.name}さん`}
                        titleColor="#ffc400"
                    />
                    <div className="Center">
                        <CardText>
                            現在の総合距離
                        </CardText>
                    </div>
                    <div className="Center">
                        <CardText
                            color="#e91e63"
                            style={this.style.distance}
                        >
                            {this.state.distance}km
                        </CardText>
                    </div>
                    <LinearProgress
                        mode="determinate"
                        value={this.state.distance}
                        min={0}
                        max={2017}
                        style={this.style.progress}
                    />
                </Card>
            </div>
        );
    }
}
