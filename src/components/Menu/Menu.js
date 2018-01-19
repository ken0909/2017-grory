import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import Chip from 'material-ui/Chip';
import { CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import * as actions from "../../modules/auth";

const mapStateToProps = state => ({
  auth: state.auth,
  distance: state.distance
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

const Menu = ({ auth, actions, distance, history }) => (
    <div className="Menu">
      <div className="Center">
        <Chip>{auth.name}さん</Chip>
      </div>
      <div className="Center">
        <CardText>合計距離：{distance.userDistance}km</CardText>
      </div>
      {auth.isLogIn && (
        <div className="Center">
          <RaisedButton label="ログアウト" primary={true} onTouchTap={actions.logOut} />
        </div>
      )}
    </div>
  );

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
