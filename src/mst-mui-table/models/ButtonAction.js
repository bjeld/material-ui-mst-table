import { types } from "mobx-state-tree";

export const ButtonAction = types.model("ButtonAction", {
  type: "create",
  variant: "raised",
  color: "default",
  size: types.optional(
    types.enumeration("ButtonActionSizeEnum", ["small", "medium", "large"]),
    "medium"
  )
});
