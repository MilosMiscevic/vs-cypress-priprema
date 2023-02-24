/// <reference types="Cypress" />

import { faker } from "@faker-js/faker";
import { myOrganizationsPage } from "../page_objects/myOrganizations";

describe("create organization test", () => {
  before("log into the app", () => {
    cy.intercept({
      method: "GET",
      url: `${Cypress.env("apiUrl")}/my-organizations`,
    }).as("getMyOrganizations");

    cy.loginBE();
    cy.visit("/");
    cy.wait("@getMyOrganizations").then((interception) => {
      expect(interception.response.statusCode).eq(200);
      expect(window.localStorage.getItem("token")).to.exist;
    });

    cy.url().should("include", "my-organizations");
    myOrganizationsPage.myOrganizationsTitle
      .should("be.visible")
      .and("have.text", "My Organizations");
  });

  it("create organization with valid data", () => {
    cy.intercept({
      method: "POST",
      url: `${Cypress.env("apiUrl")}/organizations`,
    }).as("createOrganization");

    cy.intercept({
      method: "GET",
      url: `${Cypress.env("apiUrl")}/my-organizations`,
    }).as("getMyOrganizations");

    let orgId;
    let randomOrgName = faker.company.name();

    myOrganizationsPage.createOrganization(randomOrgName);
    cy.wait("@createOrganization").then((interception) => {
      orgId = interception.response.body.id;

      expect(interception.response.statusCode).eq(201);
      expect(interception.response.body.name).eq(randomOrgName);

      cy.visit(`/organizations/${orgId}/boards`);
      cy.url().should("include", `${orgId}/boards`);
    });

    myOrganizationsPage.backToHomeBtn.click({ force: true });
    cy.wait("@getMyOrganizations").then((interception) => {
      expect(interception.response.statusCode).eq(200);
    });

    cy.url()
      .should("not.include", `${orgId}/boards`)
      .and("include", "/my-organizations");

    myOrganizationsPage.organizationCards
      .eq(-3)
      .scrollIntoView()
      .should("be.visible");
    myOrganizationsPage.getOrganizationCardTitle(-3).then((title) => {
      expect(title).to.be.equal(randomOrgName);
    });
  });
});
