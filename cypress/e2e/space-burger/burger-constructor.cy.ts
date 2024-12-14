describe("constructor page works correctly", function () {
  function dragDrop(dragSelector: string, dropSelector: string): void {
    cy.get('[data-testid="ingredient"]').first().trigger("dragenter");
    cy.get(dragSelector).first().trigger("dragstart");

    cy.get(dropSelector).trigger("drop");
  }

  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should open and close detail-ingredient popup", function () {
    cy.get('[data-testid="ingredient"]').first().click();
    cy.contains("Детали ингредиента");
    cy.get('[data-testid="close-btn"]').click();
  });

  it("should drag first ingredient to burger-constructor", function () {
    dragDrop(
      '[data-testid="ingredient"]',
      '[data-testid="constructor-container"]'
    );

    cy.get(".constructor-element").should("exist");
  });

  it("should create order and open/close order-info popup", function () {
    cy.intercept("POST", "**/api/auth/login").as("loginRequest");

    cy.intercept("POST", "**/api/orders").as("getOrder");

    dragDrop(
      '[data-testid="ingredient"]',
      '[data-testid="constructor-container"]'
    );

    cy.contains("Оформить заказ").click();

    cy.url().should("include", "/login");
    cy.get(".input_type_email").find("input").type("test@user.comtest");
    cy.get(".input_type_password").find("input").type("12345678");
    cy.contains("Войти").click();
    cy.wait("@loginRequest", { timeout: 10000 });

    cy.contains("Оформить заказ").click();
    cy.wait("@getOrder", { timeout: 20000 });

    cy.get('[data-testid="order-info-popup"]').should("exist");
    cy.get('[data-testid="close-btn"]').click();
  });
});
