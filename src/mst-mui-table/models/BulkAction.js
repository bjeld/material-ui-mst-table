import { types } from "mobx-state-tree";

export const BulkAction = types.model("BulkAction", {
  type: types.enumeration("BulkActionEnum", ["delete"]),
  tooltip: types.maybeNull(types.string),
  multiple: false
});
