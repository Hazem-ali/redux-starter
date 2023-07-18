import { isEven } from "./math";

describe("isEven", () => {
  it("even number should return true", () => {
    // Function under test
    const result = isEven(2);
    expect(result).toEqual(true);
  });
  it("odd number should return false", () => {
    // Function under test
    const result = isEven(1);
    expect(result).toEqual(false);
  });
});
