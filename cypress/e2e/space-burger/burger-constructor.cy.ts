type TSelectors = {
  [selectorName: string]: string;
};

describe("constructor page works correctly", function () {
  const selectors: TSelectors = {
    ingredient: '[data-testid="ingredient"]',
    constructorContainer: '[data-testid="constructor-container"]',
    closeButton: '[data-testid="close-btn"]',
    orderPopup: '[data-testid="order-info-popup"]',
    emailInput: ".input_type_email input",
    passwordInput: ".input_type_password input",
    constructorElement: ".constructor-element",
    ingredientModal: 'h2:contains("Детали ингредиента")',
    loginButton: 'button:contains("Войти")',
    orderButton: 'button:contains("Оформить заказ")',
  };

  function dragDrop(dragSelector: string, dropSelector: string): void {
    cy.get(dragSelector).first().as("dragElement");
    cy.get("@dragElement").trigger("dragenter");
    cy.get("@dragElement").trigger("dragstart");

    cy.get(dropSelector).trigger("drop");
  }

  beforeEach(() => {
    cy.visit("/");
  });

  it("should open and close detail-ingredient popup", function () {
    cy.get(selectors.ingredient).first().click();
    cy.get(selectors.ingredientModal);
    cy.get(selectors.closeButton).click();
  });

  it("should drag first ingredient to burger-constructor", function () {
    dragDrop(selectors.ingredient, selectors.constructorContainer);

    cy.get(selectors.constructorElement).should("exist");
  });

  it("should create order and open/close order-info popup", function () {
    cy.intercept("POST", "**/api/auth/login").as("loginRequest");
    cy.intercept("POST", "**/api/orders").as("getOrder");

    dragDrop(selectors.ingredient, selectors.constructorContainer);
    cy.get(selectors.orderButton).click();

    cy.url().should("include", "/login");
    cy.get(selectors.emailInput).type("test@user.comtest");
    cy.get(selectors.passwordInput).type("12345678");
    cy.get(selectors.loginButton).click();
    cy.wait("@loginRequest", { timeout: 10000 });

    cy.get(selectors.orderButton).click();
    cy.wait("@getOrder", { timeout: 20000 });

    cy.get(selectors.orderPopup).should("exist");
    cy.get(selectors.closeButton).click();
  });
});
