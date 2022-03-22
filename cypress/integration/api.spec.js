import { ENDPOINT_COINS, ENDPOINT_MARKET } from "../../src/Content";

describe("Coinpaprika api testing", () => {
  it("test endpoint coins", () => {
    cy.request(ENDPOINT_COINS).as("coinsRequest");
    cy.get("@coinsRequest").then((coins) => {
      expect(coins.status).to.eq(200);
      assert.isArray(coins.body, "Coins Response is an array");
    });
  });

  it("test endpoint markets", () => {
    cy.request(ENDPOINT_MARKET("btc-bitcoin")).as("marketsRequest");
    cy.get("@marketsRequest").then((coins) => {
      expect(coins.status).to.eq(200);
      assert.isArray(coins.body, "Markets Response is an array");
    });
  });
});
