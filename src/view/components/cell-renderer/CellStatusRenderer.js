import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  success: {
    backgroundColor: "#DDF4EB",
    borderRadius: 12,
    padding: "4px 12px"
  },
  warn: {
    backgroundColor: "#F5D76E",
    borderRadius: 12,
    padding: "4px 12px"
  },
  error: {
    backgroundColor: "#F47983",
    borderRadius: 12,
    padding: "4px 12px"
  },
  info: {
    backgroundColor: "#89C4F4",
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
