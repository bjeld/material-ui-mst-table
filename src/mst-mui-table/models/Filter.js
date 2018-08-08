import { types } from "mobx-state-tree";

export const Filter = types
  .model("Filter", {
    id: types.string,
    value: ->
  })
  .actions(self => ({
    setRules(func) {
      self.rules = func;
    },
    update(value) {
      self.value = value;
    }
  }));
