import { types } from "mobx-state-tree";

export const Filter = types
  .model("Filter", {
    id: types.string
  })
  .actions(self => ({
    setRules(func) {
      self.rules = func;
    },
    test(data) {
      return self.rules(data);
    }
  }));
