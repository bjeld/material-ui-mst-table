import React from "react";
import { decorate, observable, action } from "mobx";
import { observer } from "mobx-react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CopyIcon from "@material-ui/icons/FileCopy";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const supportedIcons = {
  edit: EditIcon,
  delete: DeleteIcon,
  copy: CopyIcon
};

class MultipleRowActions extends React.Component {
  anchorEl = null;
  anchorElUpdate = value => (this.anchorEl = value);

  render() {
    const { rowActions, onRowAction, data } = this.props;
    const open = Boolean(this.anchorEl);

    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={open ? "long-menu" : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={this.anchorEl}
          open={open}
          onClose={this.handleClose}
        >
          {rowActions.map(rowAction => {
            const Icon = supportedIcons[rowAction.type];
            return (
              <MenuItem
                key={rowAction.type}
                onClick={() => onRowAction(data, rowAction)}
              >
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText
                  inset
                  primary={rowAction.label || rowAction.type}
                />
              </MenuItem>
            );
          })}
        </Menu>
      </div>
    );
  }

  handleClick = e => {
    this.anchorElUpdate(e.currentTarget);
  };

  handleClose = e => {
    this.anchorElUpdate(null);
  };
}

decorate(MultipleRowActions, {
  anchorEl: observable,
  anchorElUpdate: action
});

export default observer(MultipleRowActions);
