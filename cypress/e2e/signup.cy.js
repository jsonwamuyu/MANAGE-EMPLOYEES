/// <reference types="Cypress" />

describe("Test sign up page", () => {
  beforeEach(() => {
    cy.visit("signup.html");
  });

  it("Should sign up successfully ", () => {
    // stub the API request to prevent calling the real backend
    cy.intercept("POST", "/api/signup", {
      statusCode: 201,
      body: { message: "Signup successful!" },
    }).as("signupRequest");

    // visit the signup page
    cy.visit("/signup.html");

    // Fill out the signup form and click signup button
    cy.get('[data-cy="signup-email-input"]').type("admin@example.com");
    cy.get('[data-cy="signup-password-input"]').type("admin123");
    cy.get('[data-cy="signup-button"]').click();

    // Wait for the stub request
    cy.wait("@signupRequest").then((interception) => {
      expect(interception.response.statusCode).to.eq(201);
      expect(interception.response.body.message).to.eq("Signup successful!");
    });

    // Check if a successful message was displayed
    cy.contains("Signup successful").should("be.visible");
  });
});
