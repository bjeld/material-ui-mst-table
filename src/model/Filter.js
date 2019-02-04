import { types } from "mobx-state-tree";

const createFilterable = () => {
  return types.model({}).actions(self => ({
    setRules(func) {
      self.rules = func;
    },
    update(value) {
      self.value = value;
    }
  }));
};

export const StringFilter = types.compose(
  types.model("StringFilter", {
    id: types.string,
    value: types.string
  }),
  createFilterable()
);

export const NumberFilter = types.compose(
  types.model("NumberFilter", {
    id: types.string,
    value: types.number
  }),
  createFilterable()
);

export const BooleanFilter = types.compose(
  types.model("BooleanFilter", {
    id: types.string,
    value: types.boolean
  }),
  createFilterable()
);

export const ArrayFilter = types.compose(
  types.model("ArrayFilter", {
    id: types.string,
    value: types.array(types.string)
  }),
  createFilterable()
);

export const Filter = types.union(StringFilter, NumberFilter, BooleanFilter, ArrayFilter);
