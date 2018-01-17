import React from 'react';
import { connect } from "react-redux";
import { Card, CardText, CardHeader } from 'material-ui/Card';
import LinearProgress from 'material-ui/LinearProgress';
import { Link } from 'react-router-dom';

const mapStateToProps = state => ({
  auth: state.auth,
  distance: state.distance
})

const style = {
  card: {
    margin: '10px 0px'
  },
  progress: {
    height: '20px'
  },
  distance: {
    fontSize: '32px'
  }
};

const Progress = ({ auth, distance }) => (
  <div className="Progress">
    {!auth.isLogIn && (
      <Card style={style.card}>
        <div className="Center">
          <CardText>
            <Link to="/login">ログインしてください</Link>
          </CardText>
        </div>
      </Card>
    )}
    <Card style={style.card}>
      <CardHeader
        title="栄光期間2017kmラン企画！！"
        subtitle={`こんにちは、${auth.name}さん`}
        titleColor="#ffc400"
      />
      <div className="Center">
        <CardText>現在の総合距離</CardText>
      </div>
      <div className="Center">
        <CardText color="#e91e63" style={style.distance}>
          {distance.distance}km
        </CardText>
      </div>
      <LinearProgress
        mode="determinate"
        value={distance.distance}
        min={0}
        max={2017}
        style={style.progress}
      />
    </Card>
  </div>
)

export default connect(mapStateToProps)(Progress)
