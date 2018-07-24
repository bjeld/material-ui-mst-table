import { types } from "mobx-state-tree";

export const RowAction = types.model("RowAction", {
  type: types.enumeration("RowActionEnum", ["GOTO", "EDIT", "COPY", "VERSIONS"]),
  label: types.maybeNull(types.string),
  rules: types.optional(types.map(types.frozen), {})
});
