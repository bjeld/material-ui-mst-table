import { RowAction } from "./RowAction";

let rowAction;

beforeEach(() => {
  rowAction = RowAction.create({
    type: "EDIT",
    label: "Gå"
  });
});

describe("\nInitializing", () => {
  it("has correct data after initializing ", () => {
    expect(rowAction.type).toBe("EDIT");
    expect(rowAction.label).toBe("Gå");
  });
});
