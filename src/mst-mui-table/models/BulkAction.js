import { types } from "mobx-state-tree";

export const BulkAction = types.model("BulkAction", {
  type: types.enumeration("BulkActionEnum", ["delete", "copy"]),
  tooltip: types.maybeNull(types.string),
  multiple: false
});
