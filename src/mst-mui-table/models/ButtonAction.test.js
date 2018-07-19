import { ButtonAction } from "./ButtonAction";

let buttonAction;

beforeEach(() => {
  buttonAction = ButtonAction.create({
    type: "CREATE",
    variant: "raised",
    color: "primary",
    size: "medium"
  });
});

describe("\nInitializing", () => {
  it("has correct data after initializing ", () => {
    expect(buttonAction.type).toBe("CREATE");
    expect(buttonAction.variant).toBe("raised");
    expect(buttonAction.color).toBe("primary");
    expect(buttonAction.size).toBe("medium");
  });
});
