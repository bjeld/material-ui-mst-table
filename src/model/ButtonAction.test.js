import { ButtonAction } from "./ButtonAction";

describe("ButtonAction", () => {
  test(".variant must default to raised", () => {
    const buttonAction = ButtonAction.create({ type: "create" });
    expect(buttonAction.variant).toBe("raised");
  });
  test(".color must default to secondary", () => {
    const buttonAction = ButtonAction.create({ type: "create" });
    expect(buttonAction.color).toBe("secondary");
  });
  test(".size must default to medium", () => {
    const buttonAction = ButtonAction.create({ type: "create" });
    expect(buttonAction.size).toBe("medium");
  });
});
