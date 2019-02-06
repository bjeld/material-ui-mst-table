import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  success: {
    backgroundColor: "#BCF0D2",
    color: "#2AB764",
    borderRadius: 12,
    padding: "4px 12px"
  },
  warn: {
    backgroundColor: "#FEF9E7",
    color: "#C19C0B",
    borderRadius: 12,
    padding: "4px 12px"
  },
  error: {
    backgroundColor: "#FBDEDB",
    color: "#c0392b",
    borderRadius: 12,
    padding: "4px 12px"
  },
  info: {
    backgroundColor: "#CBE5F6",
    color: "#2980b9",
    borderRadius: 12,
    padding: "4px 12px"
  }
});

class CellStatusRenderer extends React.Component {
  static propTypes = {
    statusList: PropTypes.array.isRequired,
    status: PropTypes.string
  };

  static defaultProps = {
    statusList: ["error", "warn", "info", "success"],
    stauts: "info"
  };

  render() {
    const { classes, status, label } = this.props;

    return <div className={classes[status]}>{label}</div>;
  }
}

export default withStyles(styles)(CellStatusRenderer);
