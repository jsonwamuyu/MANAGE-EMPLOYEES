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
    }).as("loginStub");

    // type into the form input and click login button
    cy.get('[data-cy="email-input"]').type("johndoe@gmail.com");
    cy.get('[data-cy="password-input"]').type("admin123");
    cy.get('[data-cy="login-btn"]').click();

    cy.wait("@loginStub").then((intercept) => {
      expect(intercept.response.statusCode).to.eq(200);
      expect(intercept.response.body.message).to.eq("Login successful");
    });

    //
    cy.contains("Login successful").should("be.visible");
  });

  it("Should call the login button", () => {
    // spy on the handleLogin function
    cy.window().then((win) => {
      cy.spy(win, handleLogin).as("loginSpy");
    });
    // Fill out the login form
    cy.get('[data-cy="email-input"]').type("admin@example.com");
    cy.get('[dta-cy="password-input"]').type("admin123");
    cy.get('[data-cy="login-button"]').click();
  });

  // it("submit button",()=>{
  //   cy.get('[data-cy="email-input"]').type('johndoe@gmail.com');
  //   cy.get('[data-cy="password-input"]').type('admin123');
  //   cy.get('[data-cy="login-btn"]').click()

  //   // assertions

  // })
});
