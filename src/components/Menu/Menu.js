import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Chip from 'material-ui/Chip';
import { CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { firebaseAuth } from '../../utils/FirebaseUtil';

const mapStateToProps = state => ({
  auth: state.auth,
  distance: state.distance
});

const Menu = ({ auth, distance, history }) => {
  const logout = () => {
    firebaseAuth.signOut();
    history.push('/login');
  };

  return (
    <div className="Menu">
      <div className="Center">
        <Chip>{auth.name}さん</Chip>
      </div>
      <div className="Center">
        <CardText>合計距離：{distance.userDistance}km</CardText>
      </div>
      {auth.isLogIn && (
        <div className="Center">
          <RaisedButton label="ログアウト" primary={true} onTouchTap={logout} />
        </div>
      )}
    </div>
  );
};

export default withRouter(connect(mapStateToProps)(Menu));
