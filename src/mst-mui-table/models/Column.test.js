import { Column } from "./Column";

let column;

beforeEach(() => {
  column = Column.create({
    fieldName: "name",
    fieldLabel: "navn",
    hideable: false,
    hidden: false,
    numeric: false,
    sortable: false,
    columnCountData: []
  });
});

describe("\nInitializing", () => {
  it("has correct data after initializing ", () => {
    expect(column.fieldName).toBe("name");
    expect(column.fieldLabel).toBe("navn");
    expect(column.hideable).toBe(false);
    expect(column.hidden).toBe(false);
    expect(column.numeric).toBe(false);
    expect(column.sortable).toBe(false);
  });
  it("can toggle column visibility", () => {
    expect(column.hidden).toBe(false);
    column.toggleColumnVisibility();
    expect(column.hidden).toBe(true);
  });
});
