/// <reference types="Cypress" />

import { loginPage } from "../page_objects/login";

describe("login test", () => {
  before("visit login page", () => {
    cy.visit("/login");
    cy.url().should("include", "/login");

    loginPage.loginPageHeading
      .should("be.visible")
      .and("have.text", "Log in with your existing account");
  });

  it("login with valid credentials", () => {
    cy.intercept({
      method: "POST",
      url: `${Cypress.env("apiUrl")}/login`,
    }).as("login");

    cy.intercept({
      method: "GET",
      url: `${Cypress.env("apiUrl")}/my-organizations`,
    }).as("getMyOrganizations");

    loginPage.login(Cypress.env("testUserEmail"), Cypress.env("testUserPass"));
    loginPage.loginPageHeading.should("not.exist");

    cy.wait("@login").then((interception) => {
      expect(interception.response.statusCode).eq(200);
      expect(interception.response.body.token).to.exist;
    });

    cy.wait("@getMyOrganizations").then((interception) => {
      expect(interception.response.statusCode).eq(200);
    });

    cy.url().should("include", "/my-organizations");
  });
});
