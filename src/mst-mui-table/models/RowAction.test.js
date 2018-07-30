import { RowAction } from "./RowAction";

let rowAction;

beforeEach(() => {
  rowAction = RowAction.create({
    type: "edit",
    tooltip: "Gå"
  });
});

describe("\nInitializing", () => {
  it("has correct data after initializing ", () => {
    expect(rowAction.type).toBe("edit");
    expect(rowAction.tooltip).toBe("Gå");
  });
});
