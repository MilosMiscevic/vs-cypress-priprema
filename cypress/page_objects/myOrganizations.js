class MyOrganizationsPage {
    get backToHomeBtn() {
      return cy.get("header").find(".vs-c-site-sign");
    }
  
    get myOrganizationsTitle() {
      return cy.get("header").find("span").first();
    }
  
    get organizationCards() {
      return cy.get(".vs-c-my-organization");
    }
  
    get newOrganizationModal() {
      return cy.get(".vs-c-modal");
    }
  
    get newOrganizationModalTitle() {
      return this.newOrganizationModal.find("h2 > span");
    }
  
    get newOrganizationNameLabel() {
      return this.newOrganizationModal.find("label");
    }
  
    get newOrganizationNameInput() {
      return this.newOrganizationModal.find("input");
    }
  
    get newOrganizationNameHelperText() {
      return this.newOrganizationModal.find("small");
    }
  
    get newOrganizationNextBtn() {
      return this.newOrganizationModal.find("button").last();
    }
  
    get newOrganizationCreateBtn() {
      return this.newOrganizationModal.find("button").last();
    }
  
    get dotIndicators() {
      return this.newOrganizationModal.find("ul").children();
    }
  
    get boardsModalWindow() {
      return cy.get(".vs-c-modal");
    }
  
    get boardsModalExitBtn() {
      return this.boardsModalWindow.find("button").first();
    }
  
    getOrganizationCardTitle(index) {
      return this.organizationCards
        .eq(index)
        .find("h2")
        .invoke("text")
        .then((text) => {
          return text;
        });
    }
  
    createOrganization(orgName) {
      this.organizationCards.eq(-2).click();
  
      this.dotIndicators.first().should("have.class", "active");
      this.dotIndicators.last().should("not.have.class", "active");
      this.newOrganizationNameHelperText
        .should("be.visible")
        .and("have.text", "You can always change this in Organization Settings");
      this.newOrganizationNextBtn.should("be.disabled");
  
      this.newOrganizationNameInput.type(orgName);
      this.newOrganizationNextBtn.should("not.be.disabled");
      this.newOrganizationNextBtn.click();
  
      this.dotIndicators.first().should("not.have.class", "active");
      this.dotIndicators.last().should("have.class", "active");
      this.newOrganizationModalTitle.should("have.text", orgName);
      this.newOrganizationNameHelperText
        .should("be.visible")
        .and("contain", "Allowed extensions: png, jpg, gif, jpeg and webp.");
  
      this.newOrganizationCreateBtn.click();
    }
  }
  
  export const myOrganizationsPage = new MyOrganizationsPage();
  