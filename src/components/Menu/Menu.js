import React, { Component } from 'react';
import Chip from 'material-ui/Chip';
import { CardText } from 'material-ui/Card';
import { firebaseDbRef } from '../../utils/FirebaseUtil';

export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.user = this.props.user;
        this.state = {
            distance: 0,
        }
    }

    componentDidMount() {
        firebaseDbRef(`user/${this.user.uid}`).on('value', (snapshot) => {
            if (snapshot.val()) {
                this.setState({ distance: snapshot.val().distance });
            }
        });
    }

    render() {
        return (
            <div className="Menu">
                <div className="Center">
                    <Chip>
                        {this.user.displayName}さん
                    </Chip>
                </div>
                <div className="Center">
                    <CardText>
                        合計距離：{this.state.distance}km
                    </CardText>
                </div>
            </div>
        );
    }
}
