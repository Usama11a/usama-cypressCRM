describe("Verify Creation of Quote", () => {


  it("Verify User Should be able to login ", () => {
    
    
  });


  it("Verify Sales Navigator is opened", () => {
    
    cy.get('[data-uipath="SalesNavigator/SalesNavigatorLbl"]')
      .contains("Sales Navigator")
      .should("be.visible");
  });


  it("Open Quick Create Wizard", () => {
    cy.get('[data-uipath="SalesNavigator/CreateNew"]')
      .should("be.visible")
      .click();
  });

  
  it("Select Create Quote on wizard", () => {
    // select standard quote on wizard


    cy.get('[data-uipath="Model_0"]')
      .should("be.visible")
      .click({ timeout: 60000 });

 
  });

  it("Select Customer, Opportunity, Contact & Quote on create quote pop up", () => {

    
    // Type customer name
    cy.get('[data-uipath="quickcreatecmbCustomerId"]').type("DO_NOT_USE_ForAutomationOnly", {
      delay: 50,
    });

    // Customer Cypress Customer from search resutls
    cy.get('[id="quickcreatecmb_CustomerIdquickcreatelookup_Input_listbox"]')
      .contains("DO_NOT_USE_ForAutomationOnly")
      .click();

    // Type Opportunity name
    cy.get('[id="quickcreatecmb_OpportunityIdquickcreatelookup_Input"]').type("376549-DO_NOT_USE_ForAutomationOnly", {
      delay: 50,
    });

    //Select Opportunity name from search list
    cy.get('[id="quickcreatecmb_OpportunityIdquickcreatelookup_Input_listbox"]').contains("376549-DO_NOT_USE_ForAutomationOnly")
      .click();

    //Type customer contact name
    // cq.getContactTextBox().type("Shehzad Mahmood");

    //Type quote name

    cy.get('[data-uipath="stringName"]')
      .clear()
      .type("Cypress Test Quote: " + Math.floor(Math.random()));

    //Type Quote description
   // cy.get('[data-uipath="tareaDescription"]').type("this is test Cypress quote " + Math.floor(Math.random()));
    cy.wait(3000);
  });



  it("i click Next to show Solution types", () => {
    // Click on Next button on Wizard
    cy.get('[data-uipath="QuickCreate/Next"]').click();
    cy.wait(3000);
  });



  it("Select the standard solution", () => {
    // select standard solution on wizard
    cy.get('[id="btnSolutionType0"]').click();
    cy.wait(3000);
  });



  it("Click the finish button to add a new quote", () => {
    cy.get("body").then((body) => {
      cy.log(
        "quote metrics length before: " +
          body.find("label:contains(Quote Metrics)").length
      );
    });


    //cq.getQuoteWizardNextButton().click();
    cy.get('[data-uipath="QuickCreate/Next"]')
      .should("be.visible")
      .click({ failOnStatusCode: false });
    cy.wait(8000);

    // Wait for intercepted HTTP request
    cy.request({
      method: "POST",
      // url: `https://valid.url/api/items`,
      url: "**/quotes/CreateSolutionFromTemplate?id=Quotes/*",
      //body: {name: "foo"},
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400); // status returned is 404
    });


  });

  it("Verify quote screen is opened", () => {

 
  });
});
