class AddNewBoard {
    get backToHomeBtn() {
      return cy.get("header").find(".vs-c-site-sign");
    }
  
    get newBoardTitle() {
      return cy.get("header").find("span").first();
    }
  
    get boardCards() {
      return cy.get(".vs-c-modal--create-board");
    }
  
    get newBoardModal() {
      return cy.get(".vs-c-modal");
    }
  
    get newBoardModalTitle() {
      return this.newBoardModal.find("h2 > span");
    }
  
    get newBoardNameLabel() {
      return this.newBoardModal.find("label");
    }
  
    get newBoardNameInput() {
      return this.newBoardModal.find("input");
    }
  
    get newBoardNameHelperText() {
      return this.newBoardModal.find("small");
    }
  
    get newBoardNextBtn() {
      return this.newBoardModal.find("button").last();
    }
  
    get newBoardCreateBtn() {
      return this.newBoardModal.find("button").last();
    }
  
    get dotIndicators() {
      return this.newBoardModal.find("ul").children();
    }
  
    get boardsModalWindow() {
      return cy.get(".vs-c-modal");
    }
  
    get boardsModalExitBtn() {
      return this.boardsModalWindow.find("button").first();
    }
  
    getBoardCardTitle(index) {
      return this.boardCards
        .eq(index)
        .find("h2")
        .invoke("text")
        .then((text) => {
          return text;
        });
    }
  
    createBoard(boardName) {
      this.boardCards.eq(-2).click();
  
      this.dotIndicators.first().should("have.class", "active");
      this.dotIndicators.last().should("not.have.class", "active");
      this.newBoardNameHelperText
        .should("be.visible")
        .and("have.text", "You can always change this in Organization Settings");
      this.newBoardNextBtn.should("be.disabled");
  
      this.newBoardNameInput.type(boardName);
      this.newBoardNextBtn.should("not.be.disabled");
      this.newBoardNextBtn.click();
  
      this.dotIndicators.first().should("not.have.class", "active");
      this.dotIndicators.last().should("have.class", "active");
      this.newBoardModalTitle.should("have.text", boardName);
      this.newBoardNameHelperText
        .should("be.visible")
        .and("contain", "Allowed extensions: png, jpg, gif, jpeg and webp.");
  
      this.newBoardCreateBtn.click();
    }
  }
  
  export const addNewBoard = new AddNewBoard();