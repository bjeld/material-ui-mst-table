import { BulkAction } from "./BulkAction";

describe("BulkAction", () => {
  test(".multiple must default to false", () => {
    const bulkAction = BulkAction.create({ type: "copy" });
    expect(bulkAction.multiple).toBeFalsy();
  });
});
