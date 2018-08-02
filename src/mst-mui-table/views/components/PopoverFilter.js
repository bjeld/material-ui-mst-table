import React from "react";
import { decorate, observable, action } from "mobx";
import { observer } from "mobx-react";
import FilterListIcon from "@material-ui/icons/FilterList";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import Tooltip from "@material-ui/core/Tooltip";

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
    return (
      <React.Fragment>
        <Tooltip title="Filter list">
          <IconButton aria-label="Filter list" onClick={this.handleClick}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
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

export default observer(PopoverFilter);
