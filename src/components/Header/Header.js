import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Menu from '../Menu/Menu';
import * as actions from "../../modules/app";

const mapStateToProps = state => ({
  app: state.app
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

const Header = ({ app, actions }) => (
  <React.Fragment>
    <AppBar title="2017 RUN!!" onLeftIconButtonClick={actions.toggleMenu} />
    <Drawer
      docked={false}
      width={200}
      open={app.menuOpen}
      onRequestChange={open => actions.toggleMenu({ menuOpen: open })}
    >
      <Menu />
    </Drawer>
  </React.Fragment>
)

export default connect(mapStateToProps, mapDispatchToProps)(Header)
