import { ButtonAction } from "./ButtonAction";

let buttonAction;

beforeEach(() => {
  buttonAction = ButtonAction.create({
    type: "create",
    variant: "raised",
    color: "primary",
    size: "medium"
  });
});

describe("\nInitializing", () => {
  it("has correct data after initializing ", () => {
    expect(buttonAction.type).toBe("create");
    expect(buttonAction.variant).toBe("raised");
    expect(buttonAction.color).toBe("primary");
    expect(buttonAction.size).toBe("medium");
  });
});
