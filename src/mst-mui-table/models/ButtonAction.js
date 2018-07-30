import { types } from "mobx-state-tree";

export const ButtonAction = types
  .model("ButtonAction", {
    type: types.enumeration("ButtonActionVariantEnum", ["create", "uplaod"]),
    variant: types.enumeration("ButtonActionVariantEnum", [
      "text",
      "flat",
      "outlined",
      "contained",
      "raised"
    ]),
    color: types.enumeration("ButtonActionColorEnum", [
      "default",
      "inherit",
      "primary",
      "secondary"
    ]),
    size: types.enumeration("ButtonActionSizeEnum", ["small", "medium", "large"])
  })
  .preProcessSnapshot(snapshot => {
    const variant = snapshot.variant || "raised";
    const color = snapshot.color || "default";
    const size = snapshot.size || "medium";
    return { ...snapshot, variant, color, size };
  });
