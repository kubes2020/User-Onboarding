describe("Test form", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000/");
  });
  it("Add test to inputs and submit form", function () {
    cy.get('input[name="name"]').type("Brian");
  });
});
