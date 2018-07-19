import { BulkAction } from "./BulkAction";

let bulkAtion;

beforeEach(() => {
  bulkAtion = BulkAction.create({
    type: "Delete",
    tooltip: "Delete selected",
    multiple: false
  });
});

describe("\ninitializong", () => {
  it("has correct data after initializong", () => {
    expect(bulkAtion.type).toBe("Delete");
    expect(bulkAtion.multiple).toBe(false);
  });
});
