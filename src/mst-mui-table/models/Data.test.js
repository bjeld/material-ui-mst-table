import { Data } from "./Data";

let data;

beforeEach(() => {
  data = Data.create({
    id: "1",
    fieldNames: {
      name: "hest"
    },
    isSelected: false
  });
});

describe("\nInitializing", () => {
  it("has correct data after initializing ", () => {
    expect(data.isSelected === false);
    expect(data.getFieldValue("name") === "hest");
  });
  it("updateIsSelected works", () => {
    data.updateIsSelected(true);
    expect(data.isSelected).toBe(true);
    data.updateIsSelected(false);
    expect(data.isSelected).toBe(false);
  });
  it("can update fieldName values", () => {
    data.setFieldValue("name", "ko");
    expect(data.getFieldValue("name")).toBe("ko");
  });
});
