import { types } from "mobx-state-tree";

export const Filter = types
  .model("Filter", {
    id: types.string
  })
  .actions(self => ({
    setRules(func) {
      self.rules = func;
    },
    test(data, searchValue) {
      return self.rules(data, searchValue);
    }
  }));
