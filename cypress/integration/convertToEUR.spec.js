import { convertToEUR } from "../../src/convertToEUR";

describe("convertToEUR", () => {
  it("convert 1 USD to EUR", () => {
    const USDPrice = 1;
    expect(convertToEUR(USDPrice)).equal(0.91);
  });

  it("convert 5 things costing 1 USD to EUR", () => {
    const USDPrice = 1;
    const quantity = 5;
    expect(convertToEUR(USDPrice, quantity)).equal(0.91 * 5);
  });
});
