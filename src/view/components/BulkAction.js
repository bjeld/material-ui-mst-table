import React from "react";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const IconMap = {
  delete: <DeleteIcon />
};

const BulkActionView = ({ bulkAction, onBulkAction }) => {
  return (
    <IconButton onClick={() => onBulkAction(bulkAction)}>
      {IconMap[bulkAction.type]}
    </IconButton>
  );
};

export default BulkActionView;
