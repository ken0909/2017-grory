import React, { Component } from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { Link } from 'react-router';
import { firebaseDbRef } from '../../utils/FirebaseUtil';
import '../../assets/stylesheets/Common.css';

export default class Ranking extends Component {
    constructor() {
        super();
        this.state = {
            userInfoList: []
        }
        this.style = {
            distance: {
                fontSize: '20px',
            }
        }
    }

    componentDidMount() {
        this.listenForItem(firebaseDbRef('user'));
    }

    listenForItem(dbRef) {
        dbRef.on('value', (snapshot) => {
            const userInfoList = [];
            snapshot.forEach((data) => {
                userInfoList.push({
                    distance: data.val().distance,
                    name: data.val().name || 'ゲスト',
                });
            });
            userInfoList.sort((prev, next) => next.distance - prev.distance);
            this.setState({ userInfoList });
        });
    }

    render() {
        return (
            <div className="Ranking">
                <Card>
                    <div className="Center">
                        <CardText>
                            <Link to="/">トップへ戻る</Link>
                        </CardText>
                    </div>
                </Card>
                {this.state.userInfoList.map((data, index) => (
                    <Card key={index}>
                        <CardHeader
                            title={data.name}
                        />
                        <div className="Center">
                            <CardText
                                color="#e91e63"
                                style={this.style.distance}
                            >
                                {data.distance}km
                            </CardText>
                        </div>
                    </Card>
                ))}
            </div>
        );
    }
}
