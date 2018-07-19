import { types } from "mobx-state-tree";

export const Column = types
  .model("Column", {
    fieldName: types.string,
    /**
     * The translated display label for this fieldName.
     */
    fieldLabel: types.string,
    /**
     * If true, the View can hide this column
     */
    hideable: types.boolean,
    /**
     * If true, this column is initially hidden
     */
    hidden: types.boolean,
    /**
     * If true, the content in the column is aligned right
     */
    numeric: types.boolean,
    /**
     * If true, the column header can be clicked to sort the content
     */
    sortable: types.boolean,
    columnCountData: types.maybe(types.array(types.frozen))
  })
  .volatile(self => ({
    cellRenderer: value => value
  }))
  .actions(self => ({
    setRenderer(func) {
      self.renderer = func;
    },
    toggleColumnVisibility() {
      self.hidden = !self.hidden;
    }
  }));

export const columnBuilder = (fieldName, fieldLabel, cellRendererFunc, options = {}) => {
  const fitToContent = options.hasOwnProperty("fitToContent") ? options.fitToContent : false;
  const hideable = options.hasOwnProperty("hideable") ? options.hideable : true;
  const hidden = options.hasOwnProperty("hidden") ? options.hidden : false;
  const numeric = options.hasOwnProperty("numeric") ? options.numeric : false;
  const sortable = options.hasOwnProperty("sortable") ? options.sortable : false;
  const columnCountData = options.hasOwnProperty("columnCountData")
    ? options.columnCountData
    : null;
  const column = Column.create({
    fieldName,
    fieldLabel,
    fitToContent,
    hideable,
    hidden,
    numeric,
    sortable,
    columnCountData
  });
  column.setRenderer(cellRendererFunc);
  return column;
};
