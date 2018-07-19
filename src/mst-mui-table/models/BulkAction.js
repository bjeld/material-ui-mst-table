import { types } from "mobx-state-tree";

export const BulkAction = types.model("BulkAction", {
  type: types.enumeration("BulkActionEnum", ["Delete"]),
  tooltip: types.maybe(types.string),
  multiple: false
});
