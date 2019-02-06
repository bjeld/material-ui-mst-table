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
     *
     */
    align: types.enumeration("ColumnAlignEnum", ["left", "right", "center", "inherit", "justify"]),
    /**
     * If true, the column header can be clicked to sort the content
     */
    sortable: types.boolean,
    columnCountData: types.array(types.frozen())
  })
  .volatile(self => ({
    renderer: value => value
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
  const align = options.hasOwnProperty("align") ? options.align : "left";
  const sortable = options.hasOwnProperty("sortable") ? options.sortable : false;
  const columnCountData = options.hasOwnProperty("columnCountData")
    ? options.columnCountData
    : undefined;
  const column = Column.create({
    fieldName,
    fieldLabel,
    fitToContent,
    hideable,
    hidden,
    align,
    sortable,
    columnCountData
  });
  column.setRenderer(cellRendererFunc);
  return column;
};
