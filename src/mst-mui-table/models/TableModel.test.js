import { TableModel } from "./TableModel";
import { columnBuilder } from "./Column";
import { ColumnList } from "./ColumnList";

let tableModel;

beforeEach(() => {
  tableModel = TableModel.create({
    columnList: ColumnList.create({
      columns: [columnBuilder("name", "Navn", (value, data) => console.log(value))]
    })
  });
});

describe("\nInitializing", () => {
  it("has correct data after initializing ", () => {
    expect(tableModel.hasSelected).toBe(false);
    expect(tableModel.dataProvider.length).toBe(0);
  });
});
