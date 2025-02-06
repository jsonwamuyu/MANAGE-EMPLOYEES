/// <reference types='Cypress'/>

describe("Test signup page", () => {
  beforeEach(() => {
    cy.visit("signup.html");
  });

  it("Should sign up user provided correct credentials", () => {
    cy.intercept("POST", "/app/api", {
      statusCode: 201,
      body: { message: "Signup successful" },
    }).as("signupStub");
  });

  // Type input into the signup form
  cy.get('[data-cy="email"]').type("admin@example.com");
  cy.get('[data-cy="password"]').type = "admin123";
  cy.get('[data-cy="submit-button"]').click();

  //
  cy.wait("@signupStub").then((intercept) => {
    expect(intercept.response.statusCode).to.eq(201);
    expect(intercept.response.body.message).to.eq("Signup successful");
  });

  cy.contains("Signup successful").should("be.visible");
});
