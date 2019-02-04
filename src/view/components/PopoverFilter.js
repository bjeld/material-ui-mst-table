import React from "react";
import { decorate, observable, action } from "mobx";
import { observer } from "mobx-react";
import FilterListIcon from "@material-ui/icons/FilterList";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import Tooltip from "@material-ui/core/Tooltip";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => {
  //console.log(theme);
  return {
    marker: {
      borderRadius: "50%",
      position: "absolute",
      top: 6,
      right: 6,
      width: 8,
      height: 8,
      backgroundColor: theme.palette.secondary.light,
      pointerEvents: "none"
    }
  };
};

const FilterMarkedAsActive = ({ children, markerClassName }) => (
  <div style={{ position: "relative" }}>
    <div>{children}</div>
    <div className={markerClassName} />
  </div>
);

class PopoverFilter extends React.Component {
  showFilter = false;
  showFilterUpdate = value => (this.showFilter = value);
  anchorEl = null;

  handleClick = event => {
    this.anchorEl = event.currentTarget;
    this.showFilterUpdate(true);
  };

  handleClose = event => {
    this.showFilterUpdate(false);
  };

  render() {
    const { hasFilter, classes } = this.props;

    return (
      <React.Fragment>
        {hasFilter ? (
          <FilterMarkedAsActive markerClassName={classes.marker}>
            <Tooltip title="Filter list">
              <IconButton aria-label="Filter list" onClick={this.handleClick}>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          </FilterMarkedAsActive>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list" onClick={this.handleClick}>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}

        <Popover
          open={this.showFilter}
          anchorEl={this.anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
        >
          {this.props.children}
        </Popover>
      </React.Fragment>
    );
  }
}

decorate(PopoverFilter, {
  showFilter: observable,
  updateShowFilter: action
});

export default withStyles(styles)(observer(PopoverFilter));
