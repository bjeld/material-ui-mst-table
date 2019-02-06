import React from "react";
import PropTypes from "prop-types";
import { MuiThemeProvider, createMuiTheme, withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./Header";

let theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5
    }
  },
  palette: {
    primary: {
      light: "#63ccff",
      main: "#009be5",
      dark: "#006db3"
    }
  }
});

theme = {
  ...theme,
  overrides: {
    MuiButton: {
      label: {
        textTransform: "initial"
      }
    },
    MuiTabs: {
      root: {
        marginLeft: theme.spacing.unit
      },
      indicator: {
        height: 3,
        backgroundColor: theme.palette.common.white
      }
    },
    MuiTab: {
      root: {
        textTransform: "initial",
        margin: "0 16px",
        minWidth: 0,
        [theme.breakpoints.up("md")]: {
          minWidth: 0
        }
      },
      labelContainer: {
        padding: 4,
        [theme.breakpoints.up("md")]: {
          padding: 4
        }
      }
    }
  }
};

const styles = {
  root: {
    display: "flex",
    minHeight: "100vh"
  },
  appContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column"
  },
  mainContent: {
    flex: 1,
    padding: "48px 36px",
    background: "#EEEEEE"
  }
};



class Main extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          <div className={classes.appContent}>
            <Header onTabChange={this.props.onTapChange}/>
            <main className={classes.mainContent}>{this.props.children}</main>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Main);
