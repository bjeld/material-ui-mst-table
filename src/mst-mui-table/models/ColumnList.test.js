import { ColumnList } from "./ColumnList";
import { Column } from "./Column";

let columnList;

beforeEach(() => {
  columnList = ColumnList.create({
    columns: [
      Column.create({
        fieldName: "name",
        fieldLabel: "navn",
        hideable: false,
        hidden: false,
        numeric: false,
        sortable: false
      })
    ],
    showCheckbox: true
  });
});

describe("\nInitializing", () => {
  it("has correct data after initializing ", () => {
    expect(columnList.showCheckbox).toBe(true);
    expect(columnList.numAllColumns).toBe(1);
    expect(columnList.numVisibleColumns).toBe(1);
    expect(columnList.numHideableColumns).toBe(0);
  });
});
