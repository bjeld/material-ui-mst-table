import { types, hasParent, getParent } from "mobx-state-tree";

let prevSelectedDataId;

export const Data = types
  .model("Data", {
    id: types.identifier,
    fieldNames: types.map(types.frozen()),
    isSelected: false
  })
  .actions(self => ({
    updateIsSelected(value, shiftKey) {
      self.isSelected = value;

      if (value && hasParent(self, 2) && shiftKey) {
        getParent(self, 2).shiftSelect(self, prevSelectedDataId);
      }

      if (self.isSelected) {
        prevSelectedDataId = self.id;
      } else {
        prevSelectedDataId = null;
      }
    },
    /**
     * Shortcut for setting a value on fieldNames.
     */
    setFieldValue(key, value) {
      self.fieldNames.set(key, value);
    },
    getFieldValue(key) {
      return self.fieldNames.get(key);
    }
  }));
