import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { observer } from "mobx-react";
import { decorate, action, observable } from "mobx";

class Header extends React.Component{

  selectedIndex = 0;

  updateSelectedIndex = index => {
    this.selectedIndex = index;
    this.props.onTabChange(index);
  }

  render() {
    return (
      <React.Fragment>
      <AppBar component="div" color="primary" position="static" elevation={0}>
        <Toolbar>
          <Typography color="inherit" variant="h5">
            Material-UI -> MobX State Tree -> Table
          </Typography>
        </Toolbar>
      </AppBar>
      <AppBar component="div" color="primary" position="sticky" elevation={1}>
        <Tabs value={this.selectedIndex} textColor="inherit" onChange={
          (event, newValue) => this.updateSelectedIndex(newValue)
        }>
          <Tab textColor="inherit" label="Key Value" />
          <Tab textColor="inherit" label="Nutritions" />
        </Tabs>
      </AppBar>
    </React.Fragment>
    );
  }
};

decorate(Header, {
  selectedIndex: observable,
  updateSelectedIndex: action
})


export default observer(Header);
