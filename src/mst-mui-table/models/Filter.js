import { types } from "mobx-state-tree";

export const StringFilter = types
  .model("StringFilter", {
    id: types.string,
    value: types.string
  })
  .actions(self => ({
    setRules(func) {
      self.rules = func;
    },
    update(value) {
      self.value = value;
    }
  }));

export const NumberFilter = types
  .model("NumberFilter", {
    id: types.string,
    value: types.number
  })
  .actions(self => ({
    setRules(func) {
      self.rules = func;
    },
    update(value) {
      self.value = value;
    }
  }));

export const BooleanFilter = types
  .model("BooleanFilter", {
    id: types.string,
    value: types.boolean
  })
  .actions(self => ({
    setRules(func) {
      self.rules = func;
    },
    update(value) {
      self.value = value;
    }
  }));

export const Filter = types.union(StringFilter, NumberFilter, BooleanFilter);
