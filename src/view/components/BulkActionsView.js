import React from "react";
import BulkAction from "./BulkAction";

const BulkActionsView = ({ bulkActions, onBulkAction }) => {
  return bulkActions.map(bulkAction => (
    <BulkAction
      onBulkAction={onBulkAction}
      key={`bulkAction${bulkAction.type}`}
      bulkAction={bulkAction}
    />
  ));
};

export default BulkActionsView;
