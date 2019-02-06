import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const Header = props => {
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
        <Tabs value={0} textColor="inherit">
          <Tab textColor="inherit" label="Nutritions" />
        </Tabs>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;
