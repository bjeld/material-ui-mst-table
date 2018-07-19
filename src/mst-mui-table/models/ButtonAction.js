import { types } from "mobx-state-tree";

export const ButtonAction = types.model("ButtonAction", {
  type: types.enumeration("ButtonActionTypeEnum", ["Create", "Upload"]),
  variant: types.optional(
    types.enumeration("ButtonActionVariantEnum", ["text", "flat", "outlined", "contained", "raised", "fab"]),
    "raised"
  ),
  color: types.optional(
    types.enumeration("ButtonActionColorEnum", ["default", "inherit", "primary", "secondary"]),
    "default"
  ),
  size: types.optional(types.enumeration("ButtonActionSizeEnum", ["small", "medium", "large"]), "medium")
});
