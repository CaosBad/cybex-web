import React, { Component } from "react";
import { withRouter } from "react-router";
import DrawerToggle from "./DrawerToggle";
import HelpWindow from "./HelpWindow";

const HelpDrawer = class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowing: false
    }

    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer() {
    console.debug("ToggleDrawer: ");
    this.setState(prevState => ({
      isShowing: !prevState.isShowing
    }));
  }

  render() {
    return (
      <div id="helpDrawer">
        {
          this.state.isShowing ?
            <HelpWindow /> :
            <button onClick={this.toggleDrawer} >Toggle</button>
        }
      </div>
    );
  }
}

export default HelpDrawer;