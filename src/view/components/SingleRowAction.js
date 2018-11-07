import React from "react";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const supportedIcons = {
  edit: EditIcon,
  delete: DeleteIcon
};

const SingleRowAction = ({ onRowAction, rowAction, data }) => {
  const handleClick = e => {
    onRowAction(data, rowAction);
  };

  const Icon = supportedIcons[rowAction.type];

  return (
    <IconButton onClick={handleClick}>
      <Icon />
    </IconButton>
  );
};

export default SingleRowAction;
