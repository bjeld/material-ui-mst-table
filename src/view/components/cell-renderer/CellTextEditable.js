import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import ButtonBase from "@material-ui/core/ButtonBase";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { TextField } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import { observable, action, decorate } from "mobx";
import { observer } from "mobx-react";
import EditIcon from "@material-ui/icons/Edit";

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    backgroundColor: "#FAFAFA",
    minWidth: 300
  },
  popover: {
    marginTop: 1
  },
  root: {
    height: "100%",
    flex: 1,
    margin: 0,
    padding: 0,
    display: "flex",
    justifyContent: "space-between",
    cursor: "pointer"
  },
  focusVisible: {},
  icon: {
    fontSize: 20
  }
});

class CellTextEditable extends React.Component {
  isFocused = false;
  isFocusedUpdate = value => (this.isFocused = value);

  constructor(props) {
    super(props);
    this.anchorEl = React.createRef();
  }

  componentDidMount() {
    this.anchorEl = ReactDOM.findDOMNode(this).parentNode;
  }

  currentState = observable({
    open: false,
    currentValue: ""
  });

  handleClose = e => {
    this.currentState.open = false;

    if (e.key && e.key.toLowerCase() === "escape") return;
    if (this.props.value !== this.currentState.currentValue) return;

    this.props.onValueChanged(this.currentState.currentValue);
  };

  handleButtonClick = action(() => {
    this.currentState.open = true;
  });

  handleChange = action(e => {
    this.currentState.currentValue = e.currentTarget.value;
  });

  handleKeyDown = e => {
    if (e.keyCode === 9) {
      e.preventDefault();
      this.props.onValueChanged(this.currentState.currentValue);
      this.currentState.open = false;
    }

    if (e.key.toLowerCase() === "enter") {
      this.props.onValueChanged(this.currentState.currentValue);
      this.currentState.open = false;
    }
  };

  handleFocus = e => {
    this.currentState.currentValue = this.props.value;
    e.currentTarget.setSelectionRange(0, -1);
  };

  handleRootFocus = e => {
    this.isFocusedUpdate(true);
  };

  handleRootBlur = e => {
    this.isFocusedUpdate(false);
  };

  handleButtonBaseFocus = e => {
    window.onkeypress = e => {
      this.currentState.currentValue = e.key;
      this.currentState.open = true;
    };
  };

  handleButtonBaseBlur = e => {
    window.onkeypress = undefined;
  };

  handleBlur = e => {
    e.preventDefault();
  };

  handleMouseOver = e => {
    this.isFocusedUpdate(true);
  };

  handleMouseOut = e => {
    this.isFocusedUpdate(false);
  };

  render() {
    const { value, classes } = this.props;

    const hasValue = value && value !== "";

    return (
      <Fragment>
        <div
          className={classes.root}
          onFocus={this.handleRootFocus}
          onBlur={this.handleRootBlur}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
          onClick={this.handleButtonClick}
        >
          <ButtonBase
            onFocus={this.handleButtonBaseFocus}
            onBlur={this.handleButtonBaseBlur}
            focusRipple={false}
            classes={{ focusVisible: classes.focusVisible }}
          >
            <Typography color={hasValue ? "default" : "textSecondary"} align="left" noWrap>
              {value && value !== "" ? value : "Add a name"}
            </Typography>
          </ButtonBase>

          <div style={{ opacity: this.isFocused ? 1 : 0 }}>
            <EditIcon className={classes.icon} />
          </div>
        </div>
        <Popover
          className={classes.popover}
          onClose={this.handleClose}
          anchorEl={this.anchorEl}
          open={this.currentState.open}
          elevation={3}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left"
          }}
        >
          <div className={classes.paper}>
            <TextField
              autoFocus
              onFocus={this.handleFocus}
              fullWidth
              value={this.currentState.currentValue}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
              onBlur={this.handleBlur}
            />
          </div>
        </Popover>
      </Fragment>
    );
  }
}

decorate(CellTextEditable, {
  isFocused: observable,
  isFocusedUpdate: action
});

export default withStyles(styles)(observer(CellTextEditable));
