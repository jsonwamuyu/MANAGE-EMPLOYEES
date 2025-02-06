/// <reference types="Cypress" />

describe("Test sign up page", () => {
  beforeEach(() => {
    cy.visit("signup.html");
  });

  it("Should sign up successfully ", () => {
    // stub the API request to prevent calling the real backend
    cy.intercept("POST", "/api/signup", {
      statusCode: 201,
      body: { message: "Signup successful" },
    }).as("signupRequest");
  });
});
