/// <reference types="Cypress" />

import { faker } from "@faker-js/faker";
import { addNewBoard } from "../page_objects/addBoard";


describe("Adding a new board", () => {
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
addNewBoard.newBoardTitle
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

let boardId;
let randomBoardName = faker.company.name();

addNewBoard.createBoard(randomBoardName);
cy.wait("@createOrganization").then((interception) => {
  boardId = interception.response.body.id;

  expect(interception.response.statusCode).eq(201);
  expect(interception.response.body.name).eq(randomBoardName);

  cy.visit(`/organizations/${boardId}/boards`);
  cy.url().should("include", `${boardId}/boards`);
});

addNewBoard.backToHomeBtn.click({ force: true });
cy.wait("@getMyOrganizations").then((interception) => {
  expect(interception.response.statusCode).eq(200);
});

cy.url()
  .should("not.include", `${boardId}/boards`)
  .and("include", "/my-organizations");

addNewBoard.boardCards
  .eq(-3)
  .scrollIntoView()
  .should("be.visible");
addNewBoard.getBoardCardTitle(-3).then((title) => {
  expect(title).to.be.equal(randomBoardName);
});
});
});
