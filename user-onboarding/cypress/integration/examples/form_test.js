describe("Test form", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000/");
  });
  const nameInput = () => cy.get('input[name="name"]');
  const emailInput = () => cy.get('input[name="email"]');
  const passwordInput = () => cy.get('input[name="password"]');
  const termsButton = () => cy.get('input[name="terms"]');

  it("Add test to input name and verify if correct name", function () {
    cy.get('input[name="name"]').type("Brian");
    nameInput().should("have.value", "Brian");
  });

  it("test to add an email to input", () => {
    emailInput().type("briankubes@gmail.com");
    emailInput().should("have.value", "briankubes@gmail.com");
  });

  it("test to add a password to input", () => {
    passwordInput().type("12345");
    passwordInput().should("have.value", "12345");
  });

  it("test to see if user can check terms button", () => {
    termsButton().not("[disabled]");
  });
});
