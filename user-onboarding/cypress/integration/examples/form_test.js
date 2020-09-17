describe("Test form", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000/");
  });
  const nameInput = () => cy.get('input[name="name"]');
  const emailInput = () => cy.get('input[name="email"]');
  const passwordInput = () => cy.get('input[name="password"]');
  const termsButton = () => cy.get('input[name="terms"]');

  it("Add test to input name and verify if correct name", function () {
    nameInput().type("Brian");
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

describe("Test form submit, with no beforeEach reset", () => {
  it("go to url", () => {
    cy.visit("http://localhost:3000/");
  });

  const nameInput = () => cy.get('input[name="name"]');
  const emailInput = () => cy.get('input[name="email"]');
  const passwordInput = () => cy.get('input[name="password"]');
  const termsButton = () => cy.get('input[name="terms"]');
  //this one is verbatim '.contains("Submit")
  //this one is finding word and upperCase does not matter
  const submitButton = () => cy.get("button").contains(/submit/i);

  it("test submit button", () => {
    nameInput().type("Brian");
    emailInput().type("briankubes@gmail.com");
    passwordInput().type("12345");
    termsButton().check();
    submitButton().click();
  });

  it("go to url", () => {
    cy.visit("http://localhost:3000/");
  });

  it("test display of submit button if missing required field", () => {
    nameInput().type("Brian");
    emailInput().type("briankubes@gmail.com");
    passwordInput().type("12345");
    //left out the termsButton click
    submitButton().should("be.disabled");
  });
});
