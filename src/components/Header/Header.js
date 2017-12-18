import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import Drawer from "material-ui/Drawer";
import Menu from "../Menu/Menu";

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
  }

  render() {
    const handleToggle = () => this.setState({ open: !this.state.open });

    return (
      <div className="Header">
        <AppBar title="2017 RUN!!" onLeftIconButtonClick={handleToggle} />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={open => this.setState({ open })}
        >
          <Menu />
        </Drawer>
      </div>
    );
  }
}
