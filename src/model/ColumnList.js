import { types } from "mobx-state-tree";
import { Column } from "./Column";

export const ColumnList = types
  .model("ColumnList", {
    columns: types.array(Column),
    showCheckbox: true
  })
  .views(self => ({
    /**
     * Returns all columns
     */
    get allColumns() {
      return self.columns;
    },
    get numAllColumns() {
      return self.columns.length;
    },
    /**
     * Returns only visible columns
     */
    get visibleColumns() {
      return self.columns.filter(x => !x.hidden);
    },
    get numVisibleColumns() {
      return self.visibleColumns.length;
    },
    /**
     * Returns only columns that can be hidden
     */
    get hideableColumns() {
      return self.columns.filter(x => x.hideable);
    },
    get numHideableColumns() {
      return self.hideableColumns.length;
    },
    get hasHideableColumns() {
      return self.numAllColumns > 0;
    }
  }));
