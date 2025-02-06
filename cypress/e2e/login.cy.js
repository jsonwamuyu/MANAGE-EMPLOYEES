describe("Test login functionality spec", () => {
  beforeEach(() => {
    cy.visit("login.html");
  });
  after(() => {
    cy.visit("admin.html");
  });

  it("Contains a header with text content Login", () => {
    cy.get(".login-container").find("h1");
    cy.get(".login-title").should("have.length", 1);
  });

  it("Should validate form inputs", () => {
    const email = "admin@example.com";
    const password = "admin123";

    cy.get('[data-cy="email-input"]').type(email);
    cy.get('[data-cy="password-input"]').type(password);

    // click the login button
    cy.get('[data-cy="login-btn"]').click();

    // Assertions for email
    // cy.get('[data-cy="email-input"]').should('have.value', email);
    // cy.get('[data-cy="email-input"]').should('match', /^[^@]+@[^@]+\.[^@]+$/)

    // // Assertions for password
    // cy.get('[data-cy="password-input"]').should('have.value', password);
    // cy.get('[data-cy="password-input"]').should('have.length.greaterThan', 5)

    // cy.url().should('match', '/admin.html')
  });

  it("Should login user successfully", () => {
    // stub the login functionality
    cy.intercept("GET", "/app/api", {
      statusCode: 200,
      body: { message: "Login successful" },
    }).as('loginStub');

    // type into the form input and click login button
  });

  // it("submit button",()=>{
  //   cy.get('[data-cy="email-input"]').type('johndoe@gmail.com');
  //   cy.get('[data-cy="password-input"]').type('admin123');
  //   cy.get('[data-cy="login-btn"]').click()

  //   // assertions

  // })
});
