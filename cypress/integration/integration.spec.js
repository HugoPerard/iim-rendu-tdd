describe("Crypto converter integration", () => {
  beforeEach(() => {
    cy.visit("localhost:3000/");
  });

  it("test title presence", () => {
    cy.get("[data-test=container]").contains("Crypto converter");
  });

  it("Default has value", () => {
    cy.get("[data-test=container]").should("not.contain", "Chargement...");
    cy.get("[data-test=display-span]").should("not.contain", "0.0000");
  });

  it("Change quantity", () => {
    cy.get("[data-test=container]").should("not.contain", "Chargement...");
    cy.get("[data-test=quantity-input]").invoke("val").should("equal", "1");
    cy.wait(500);
    cy.get("input").type("0");
    cy.get("[data-test=quantity-input]").invoke("val").should("equal", "10");
  });
});
