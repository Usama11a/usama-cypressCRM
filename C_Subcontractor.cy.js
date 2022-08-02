import "cypress-wait-until";
import "cypress-file-upload";


describe("Verify Subcontractor screen after import", () => {
  it("Verify subcontractor grid", () => {
    cy.wait(8000);
    cy.get('[data-uipath="QuoteDetail/sidebar/Root/subcontractor"]').click({
      force: true,
    });
    cy.wait(4000);
    cy.get(
      '[data-uipath="QuantitySolutionTable"] [col-id="SubcontractorId.Name"]'
    )
      .contains("DO NOT USE (For Automation)")
      .click();
    cy.wait(2000);
    cy.get(
      '[data-uipath="QuantitySolutionTable"] [col-id="SubcontractorId.Name"]'
    ).should("contain.text", "DO NOT USE (For Automation)");
    // cy.get('[data-uipath="QuantitySolutionTable"] [col-id="NoOfItems"]').should('contain.text', '12')
    // cy.get('[data-uipath="QuantitySolutionTable"] [col-id="Coverage"]').should('contain.text', '100%')
    // cy.get('[data-uipath="QuantitySolutionTable"] [col-id="PricingStrategyValue"]').should('contain.text', '5% Margin')
    //  cy.get('[data-uipath="QuantitySolutionTable"] [col-id="StatusValue"]').should('contain.text', 'Awarded')
  });

  it("Export file and verify", () => {
    //const path = require("path");
   // const downloadsFolder = Cypress.config("downloadsFolder");

    cy.task("countFiles", "cypress/downloads").then((count) => {
      (before) => {
        cy.get('[data-uipath="ExportFile/PublishIcon"]').click();
        cy.wait(3000);
      };
      (after) => {
        expect(after.length).to.be.eq(before.length + 1);
      };
    });
  });

  it.skip("Upload the file and verify cost", () => {
    const downloadsFolder = Cypress.config("downloadsFolder");

    // cy.task('downloads', downloadsFolder).then(before => {

    //  cy.get('[data-uipath="ExportFile/PublishIcon"]').click()

    cy.task("downloads", downloadsFolder).then((after) => {
      const newFile = after.filter((file) => !before.includes(file))[0];
      cy.log("Downloads folder : " + downloadsFolder);
      cy.log("New file to upload: " + newFile);
      cy.get('[id="UploadFile_Form"] [type="file"]').attachFile(
        downloadsFolder + "/" + newFile
      );

      cy.wait(10000);
    });
  });

  it("Update costs and qty from the grid", () => {
    cy.get('[id="SubcontractorItems"] [row-id="1"] [col-id="PriceOverride"]')
      .click()
      .click()
      .dblclick()
      .clear()
      .type("2.25");
    cy.get('[id="SubcontractorItems"] [row-id="1"] [col-id="Cost"]')
      .click()
      .click()
      .dblclick()
      .clear()
      .type("1")
      .type("{enter}");
    //cy.get('[id="SubcontractorItems"] [row-id="1"] [col-id="TotalCost"]').click().click().dblclick().clear().type('500')
    //cy.get('[id="SubcontractorItems"] [row-id="4"] [col-id="Cost"]').click().click().dblclick().clear().type('350')
    //cy.get('[id="SubcontractorItems"] [row-id="5"] [col-id="Cost"]').click().click().dblclick().clear().type('450').type('{enter}')
    //cy.get('[id="SubcontractorItems"] [row-id="5"] [col-id="Quantity"]').click().click().dblclick().clear().type('2').type('{enter}')
  });

  it("Verify costs and prices after update", () => {
    cy.get('[id="SubcontractorItems"] [row-id="1"] [col-id="Cost"]').should(
      "contain.text",
      "US $1"
    );
    cy.get(
      '[id="SubcontractorItems"] [row-id="1"] [col-id="PriceOverride"]'
    ).should("contain.text", "US $2.25");
    /*
    //cy.get('[id="SubcontractorItems"] [row-id="0"] [col-id="TotalCost"]').should('contain.text', '450')
    cy.get('[id="SubcontractorItems"] [row-id="0"] [col-id="Price"]').should('contain.text', '157.89')
    cy.get('[id="SubcontractorItems"] [row-id="0"] [col-id="TotalPrice"]').should('contain.text', '473.67')

    cy.get('[id="SubcontractorItems"] [row-id="1"] [col-id="Cost"]').should('contain.text', '166.66666666666666')
    cy.get('[id="SubcontractorItems"] [row-id="1"] [col-id="TotalCost"]').should('contain.text', '500')
    cy.get('[id="SubcontractorItems"] [row-id="1"] [col-id="Price"]').should('contain.text', '175.44')
    cy.get('[id="SubcontractorItems"] [row-id="1"] [col-id="TotalPrice"]').should('contain.text', '526.32')

    cy.get('[id="SubcontractorItems"] [row-id="4"] [col-id="Cost"]').should('contain.text', '350')
    cy.get('[id="SubcontractorItems"] [row-id="4"] [col-id="TotalCost"]').should('contain.text', '350')
    cy.get('[id="SubcontractorItems"] [row-id="4"] [col-id="Price"]').should('contain.text', '368.42')
    cy.get('[id="SubcontractorItems"] [row-id="4"] [col-id="TotalPrice"]').should('contain.text', '368.42')
*/
  });
  it("Generate RFQ and verify", () => {
    const downloadsFolder = Cypress.config("downloadsFolder");

    // cy.task("downloads", downloadsFolder).then((before) => {
    //   cy.get('[class="button"]').contains("Generate RFQ").click();

    //   cy.get('[data-uipath="ExportFile/PublishIcon"]').click()
    //   cy.wait(3000);
    //   cy.task('downloads', downloadsFolder).then(after => {
    //     expect(after.length).to.be.eq(before.length + 1)
    //   })
    // });
  });

  it("Delete other products", () => {
    cy.get('[id="SubcontractorItems"] [row-index="0"] svg').click();
    cy.get('[data-uipath="YesBtn"]', { timeout: 60000 }).click();
    cy.wait(2000);
    cy.get('[id="SubcontractorItems"] [row-index="1"] svg').click();
    cy.get('[data-uipath="YesBtn"]', { timeout: 60000 }).click();
    cy.wait(2000);
    cy.get('[id="SubcontractorItems"] [row-index="1"] svg').click();
    cy.get('[data-uipath="YesBtn"]', { timeout: 60000 }).click();
    cy.wait(2000);
    cy.get('[id="SubcontractorItems"] [row-index="1"] svg').click();
    cy.get('[data-uipath="YesBtn"]', { timeout: 60000 }).click();
    cy.wait(2000);
    cy.get('[id="SubcontractorItems"] [row-index="1"] svg').click();
    cy.get('[data-uipath="YesBtn"]', { timeout: 60000 }).click();
    cy.wait(2000);
    cy.get('[id="SubcontractorItems"] [row-index="1"] svg').click();
    cy.get('[data-uipath="YesBtn"]', { timeout: 60000 }).click();
    cy.wait(2000);
    cy.get('[id="SubcontractorItems"] [row-index="1"] svg').click();
    cy.get('[data-uipath="YesBtn"]', { timeout: 60000 }).click();
    cy.wait(2000);
    cy.get('[id="SubcontractorItems"] [row-index="1"] svg').click();
    cy.get('[data-uipath="YesBtn"]', { timeout: 60000 }).click();
    cy.wait(2000);
    cy.get('[id="SubcontractorItems"] [row-index="1"] svg').click();
    cy.get('[data-uipath="YesBtn"]', { timeout: 60000 }).click();
    cy.wait(2000);
    cy.get('[id="SubcontractorItems"] [row-index="1"] svg').click();
    cy.get('[data-uipath="YesBtn"]', { timeout: 60000 }).click();
    cy.wait(2000);
    cy.get('[id="SubcontractorItems"] [row-index="1"] svg').click();
    cy.get('[data-uipath="YesBtn"]', { timeout: 60000 }).click();
    cy.wait(2000);
  });
  it("Award Vendor", () => {
    cy.get(
      '[data-uipath="QuantitySolutionTable"] [col-id="StatusValue"]:eq(1)'
    ).then(function (status) {
      //  const len = status.length;

      const res = status.text();
      cy.log("Resource status value: " + res);
      if (res == "") {
        // Delete products
        // cy.get('.s-checkbox-all').click();
        cy.get('[class="button"]').contains("Award Vendor").click();
        cy.wait(4000);
        cy.get(
          '[data-uipath="QuantitySolutionTable"] [col-id="StatusValue"]'
        ).should("contain.text", "Awarded");
      }
    });
  });
});
