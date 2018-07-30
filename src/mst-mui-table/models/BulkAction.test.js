import { BulkAction } from "./BulkAction";

let bulkAtion;

beforeEach(() => {
  bulkAtion = BulkAction.create({
    type: "delete",
    tooltip: "Delete selected",
    multiple: false
  });
});

describe("\ninitializong", () => {
  it("has correct data after initializong", () => {
    expect(bulkAtion.type).toBe("delete");
    expect(bulkAtion.multiple).toBe(false);
  });
});
