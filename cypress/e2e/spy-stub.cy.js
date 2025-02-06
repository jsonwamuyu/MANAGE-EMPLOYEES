// STUBS and SPIES

//  In Cypress, a stub replaces the real
// function with a fake one that returns a specific result

// In Cypress, a spy lets you observe if a function was called,
// how many times, and what was passed to it.

cy.stub(window, "alert").as("alertStub");
cy.get("#click-me-btn").click();
cy.get("@alertStub").should("have.been.calledOnce");
