import { types, destroy } from "mobx-state-tree";
import { ColumnList } from "./ColumnList";
import { Data } from "./Data";
import { BulkAction } from "./BulkAction";
import { ButtonAction } from "./ButtonAction";
import { RowAction } from "./RowAction";
import { Filter } from "./Filter";

const getSorting = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => (b.fieldNames.get(orderBy) < a.fieldNames.get(orderBy) ? -1 : 1)
    : (a, b) => (a.fieldNames.get(orderBy) < b.fieldNames.get(orderBy) ? -1 : 1);
};

export const TableModel = types
  .model("TableModel", {
    columnList: ColumnList,
    dataProvider: types.array(Data),
    bulkActions: types.array(BulkAction),
    buttonActions: types.array(ButtonAction),
    rowActions: types.array(RowAction),
    searchValue: "",
    orderBy: "",
    order: types.enumeration("orderEnum", ["asc", "desc"]),
    title: "Title",
    selectedTitle: "Selected Title",
    page: 0,
    rowsPerPageOptions: types.array(types.number),
    rowsPerPage: types.number,
    filters: types.array(Filter)
  })
  .preProcessSnapshot(snapshot => {
    const order = snapshot.order || "asc";
    const rowsPerPageOptions = snapshot.rowsPerPageOptions || [10, 20, 30, 40, 50];
    const rowsPerPage = snapshot.rowsPerPage || 10;
    return { ...snapshot, order, rowsPerPage, rowsPerPageOptions };
  })
  .actions(self => ({
    shiftSelect(caller, prevSelectedDataId) {
      if (prevSelectedDataId) {
        const items = self.sorted;
        const indexA = items.findIndex(data => data.id === prevSelectedDataId);
        const indexB = items.findIndex(data => data.id === caller.id);
        const low = Math.min(indexA, indexB);
        const high = Math.max(indexA, indexB);
        const candidates = items.filter((item, index) => index >= low && index <= high);
        candidates.forEach(item => item.updateIsSelected(true));
      }
    },
    updateDataProvider(value) {
      self.dataProvider = value;
    },
    updatePage(page) {
      self.page = page;
    },
    updateRowsPerPage(rowsPerPage) {
      self.rowsPerPage = rowsPerPage;
    },
    add(data) {
      self.dataProvider.push(data);
    },
    destroyItems(items) {
      items.forEach(item => {
        destroy(item);
      });
    },
    searchValueUpdate(value) {
      self.searchValue = value;
    },
    updateOrderBy(value) {
      if (self.orderBy === value) {
        self.updateOrder(self.order === "asc" ? "desc" : "asc");
      } else {
        self.orderBy = value;
      }
    },
    updateOrder(value) {
      self.order = value;
    },
    selectAll() {
      self.dataProvider.forEach(data => (data.isSelected = true));
    },
    deselectAll() {
      self.dataProvider.forEach(data => (data.isSelected = false));
    },
    /**
     * A filter is just a function that return true or false
     * based on conditions that plays well with the Data fields.
     *
     * @param {*} filter
     */
    addFilter(filter) {
      self.filters.push(filter);
    },
    removeFilter(id) {
      const filter = self.filters.find(filter => filter.id === id);
      self.filters.remove(filter);
    }
  }))
  .views(self => ({
    get filtered() {
      let candidates = [...self.dataProvider];
      candidates = candidates.filter(data => {
        let result = true;

        self.filters.forEach(filter => {
          if (!filter.test(data, self.searchValue)) {
            result = false;
          }
        });

        return result;
      });
      return candidates;
    },
    get sorted() {
      return self.filtered
        .sort(getSorting(self.order, self.orderBy))
        .slice(self.page * self.rowsPerPage, self.page * self.rowsPerPage + self.rowsPerPage);
    },
    get selected() {
      return self.filtered.filter(data => data.isSelected);
    },
    get numSelected() {
      return self.selected.length;
    },
    get numRowCount() {
      return self.filtered.length;
    },
    get hasSelected() {
      return self.selected.length > 0;
    },
    get hasRowActions() {
      return self.rowActions.length > 0;
    },
    get hasBulkActions() {
      return self.bulkActions.length > 0;
    },
    get hasButtonActions() {
      return self.buttonActions.length > 0;
    },
    get hasFilter() {
      return self.filtered.length < self.dataProvider.length;
    }
  }));
