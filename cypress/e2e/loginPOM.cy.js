/// <reference types="Cypress" />

import { loginPage } from "../page_objects/login";

describe("login tests", () => {
  before("visit login page", () => {
    cy.visit("/");
    loginPage.loginPageHeading.click();
  });
  
  it("login with valid cerdentials", () => {
    cy.intercept({
      method: "POST",
      url: `${Cypress.env("apiUrl")}/login`,
    }).as("succesfulLogin");

    loginPage.login(Cypress.env("testUserEmail"), Cypress.env("testUserPass"));
    cy.wait("@succesfulLogin").then((interception) => {
      console.log("INTERCEPTION", interception);
      expect(interception.response.statusCode).eq(200);
      expect(interception.response.statusMessage).should.eq(Authorized);
    });
    cy.url().should("not.include", "/login");
  });
});
