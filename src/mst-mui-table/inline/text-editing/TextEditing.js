import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import ButtonBase from "@material-ui/core/ButtonBase";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { Paper, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { observable, action } from "mobx";
import { observer } from "mobx-react";

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    backgroundColor: "#FAFAFA",
    minWidth: 300
  },
  buttonNoValue: {
    color: "#ff9900"
  },
  popover: {
    marginTop: 1
  }
});

class TextEditing extends React.Component {
  constructor(props) {
    super(props);
    this.xxx = React.createRef();
  }

  componentDidMount() {
    this.xxx = ReactDOM.findDOMNode(this).parentNode;
  }

  currentState = observable({
    open: false,
    currentValue: ""
  });

  anchorEl = null;

  handleClose = e => {
    this.currentState.open = false;

    if (e.key && e.key.toLowerCase() === "escape") return;
    if (this.props.value !== this.currentState.currentValue) return;

    this.props.onValueChanged(this.currentState.currentValue);
  };

  handleButtonClick = action(() => {
    this.currentState.open = true;
    this.currentState.currentValue = this.props.value;
  });

  handleChange = action(e => {
    this.currentState.currentValue = e.currentTarget.value;
  });

  handleKeyDown = e => {
    if (e.key.toLowerCase() === "enter") {
      this.props.onValueChanged(this.currentState.currentValue);
      this.currentState.open = false;
    }
  };

  handleFocus = e => {
    e.currentTarget.setSelectionRange(0, -1);
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

  render() {
    const { value, classes } = this.props;

    const hasValue = value && value !== "";

    return (
      <Fragment>
        <ButtonBase
          onFocus={this.handleButtonBaseFocus}
          onBlur={this.handleButtonBaseBlur}
          buttonRef={node => {
            this.anchorEl = node;
          }}
          focusRipple
          onClick={this.handleButtonClick}
        >
          <Typography color={hasValue ? "default" : "textSecondary"} align="left" noWrap>
            {value && value !== "" ? value : "Add a name"}
          </Typography>
        </ButtonBase>
        <Popover
          className={classes.popover}
          onClose={this.handleClose}
          anchorEl={this.xxx}
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
          <Paper className={classes.paper}>
            <TextField
              autoFocus
              onFocus={this.handleFocus}
              fullWidth
              value={this.currentState.currentValue}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
            />
          </Paper>
        </Popover>
      </Fragment>
    );
  }
}

export default withStyles(styles)(observer(TextEditing));
