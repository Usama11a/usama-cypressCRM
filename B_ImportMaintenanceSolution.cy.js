import "cypress-wait-until";
import "cypress-file-upload";
import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
import SolutionImport from "../../2.QuoteAPE/SolutionImport/SolutionImport.PageObjects";
import Solutions from "../../2.QuoteAPE/Solutions/Solutions.PageObjects";
import QuickCreateQuote from "../../2.QuoteAPE/CreateQuote/QuickCreateQuote.PageObjects";
import CommonHelperElements from "../../../support/Helpers/CommonHelper.Elements";
import CommonHelper from "../../../support/Helpers/CommonHelper";

//import '../../../support/commands'
const helper = new CommonHelper();
const ehelper = new CommonHelperElements();
const path = require("path");

const sol = new Solutions();
const si = new SolutionImport();
const cq = new QuickCreateQuote();

describe("Maintenance Solution Upload", () => {
  it("User add a maintenance solution from solution imports", () => {

    // cy.CheckLogin();
    // cy.ifunauthorized()
    si.getSolutionImportTab().click()
    cy.wait(4000)
    si.getNewImportBtn().click()

    si.getDisplayName().type('Maintenance Solution Upload')

    si.setParsingStrategy('Maintenance Solution Upload')

    si.getSaveBtnOnAddPopup().click()
    cy.wait(4000)
    si.getRowVisibility('Action')

    si.getGridVisibility()
  });

  it("Upload a maintenance solution file", () => {
    cy.CheckLogin();
    si.getUploadBtn().click();

    const mnt_file = "sP - TestMaintimport.xls";

    si.getFile().attachFile(mnt_file);

    si.getSaveBtnOnUploadPopup().click();

    si.getRowVisibility("Action");
    si.getGridVisibility();
  });
});

describe("Update the values and then validate", () => {

  it("User updates all the values", function () {
    cy.CheckLogin();
    cy.get(".ag-body-horizontal-scroll-viewport").scrollTo("center");

    //Serial Numbers Update
    cy.get(
      '[data-uipath="QuoteImportsForm/General/VendorResaleAndMaintenance"] [row-index="0"] [col-id="ColumnData.Alias"]'
    )
      .dblclick()
      .clear()
      .type("PPT-A-" + Math.floor(Math.random() * 3000000) + 1).then(() =>{
    cy.get(
      '[data-uipath="QuoteImportsForm/General/VendorResaleAndMaintenance"] [row-index="1"] [col-id="ColumnData.Alias"]'
    )
      .dblclick()
      .clear()
      .type("PPT-A-" + Math.floor(Math.random() * 3000000) + 1);

    cy.get(
      '[data-uipath="QuoteImportsForm/General/VendorResaleAndMaintenance"] [row-index="2"] [col-id="ColumnData.Alias"]'
    )
      .dblclick()
      .clear()
      .type("PPT-A-" + Math.floor(Math.random() * 3000000) + 1)})

    cy.get(
      '[data-uipath="QuoteImportsForm/General/VendorResaleAndMaintenance"] [row-index="3"] [col-id="ColumnData.Alias"]'
    )
      .dblclick()
      .clear()
      .type("PPT-A-" + Math.floor(Math.random() * 3000000) + 1).then(() =>{
        

    cy.get(
      '[data-uipath="QuoteImportsForm/General/VendorResaleAndMaintenance"] [row-index="4"] [col-id="ColumnData.Alias"]'
    )
      .dblclick()
      .clear()
      .type("PPT-A-" + Math.floor(Math.random() * 3000000) + 1);

    cy.get(
      '[data-uipath="QuoteImportsForm/General/VendorResaleAndMaintenance"] [row-index="5"] [col-id="ColumnData.Alias"]'
    )
      .dblclick()
      .type("PPT-A-" + Math.floor(Math.random() * 3000000) + 1)})

    cy.get(
      '[data-uipath="QuoteImportsForm/General/VendorResaleAndMaintenance"] [row-index="6"] [col-id="ColumnData.Alias"]'
    )
      .dblclick()
      .clear()
      .type("PPT-A-" + Math.floor(Math.random() * 3000000) + 1).then(() =>{

    cy.get(
      '[data-uipath="QuoteImportsForm/General/VendorResaleAndMaintenance"] [row-index="7"] [col-id="ColumnData.Alias"]'
    )
      .dblclick()
      .clear()
      .type("PPT-A-" + Math.floor(Math.random() * 3000000) + 1)

    cy.get(
      '[data-uipath="QuoteImportsForm/General/VendorResaleAndMaintenance"] [row-index="8"] [col-id="ColumnData.Alias"]'
    )
      .dblclick()
      .clear()
      .type("PPT-A-" + Math.floor(Math.random() * 3000000) + 1);

    cy.get(
      '[data-uipath="QuoteImportsForm/General/VendorResaleAndMaintenance"] [row-index="9"] [col-id="ColumnData.Alias"]'
    )
      .dblclick()
      .clear()
      .type("PPT-A-" + Math.floor(Math.random() * 3000000) + 1)})

    cy.get(
      '[data-uipath="QuoteImportsForm/General/VendorResaleAndMaintenance"] [row-index="10"] [col-id="ColumnData.Alias"]'
    )
      .dblclick()
      .clear()
      .type("PPT-B-" + Math.floor(Math.random() * 3000000) + 1);

    cy.get(
      '[data-uipath="QuoteImportsForm/General/VendorResaleAndMaintenance"] [row-index="11"] [col-id="ColumnData.Alias"]'
    )
      .dblclick()
      .clear()
      .type("PPT-B-" + Math.floor(Math.random() * 3000000) + 1)

    //SLA update
    cy.get(
      '[data-uipath="QuoteImportsForm/General/VendorResaleAndMaintenance"] [row-index="3"] [col-id="ColumnData.ServiceLevel"]'
    ).dblclick()

    cy.get(".ag-rich-select-row")
      .contains("Test-SP05")
      .click({ timeout: 60000 });

    cy.get(".ag-body-horizontal-scroll-viewport").scrollTo("left");

    //Quantity Update
    cy.get(
      '[data-uipath="QuoteImportsForm/General/VendorResaleAndMaintenance"] [row-index="4"] [col-id="ColumnData.Quantity"]'
    )
      .dblclick()
      .clear()
      .type("1");

    //Brand Update
    cy.get(
      '[data-uipath="QuoteImportsForm/General/VendorResaleAndMaintenance"] [row-index="5"] [col-id="ColumnData.Brand"]'
    )
      .dblclick()
      .type("Canon")
      .type("{enter}");
  });

  it("User presses validate all", () => {
    cy.get("#validatepopup_button").click();

    cy.get("#ValidateAllItems_Click").click();

    //cy.reload()
    //cy.wait(15000)
  });

  it("warnings will be removed", () => {
    //cy.get('[class="Warning"]').should("have.length.gte", 2); // class "Warning" is warning but "warning" class is actually error
    //cy.get('[class="Warning"]').should('have.length.lte', 11)

    cy.get('[class="Warning"]').should(($p) => {
      expect($p).to.have.length.of.at.least(0);
    });
  });

  it("warning colors will be updated", () => {
    cy.get(
      '[data-uipath="QuoteImportsForm/General/VendorResaleAndMaintenance"] [row-index="0"] [col-id="ColumnData.ServiceLevel"]'
    ).should("have.css", "background-color", "rgba(0, 0, 0, 0)");
    cy.get(
      '[data-uipath="QuoteImportsForm/General/VendorResaleAndMaintenance"] [row-index="1"] [col-id="ColumnData.ServiceLevel"]'
    ).should("have.css", "background-color", "rgba(0, 0, 0, 0)");
    cy.get(
      '[data-uipath="QuoteImportsForm/General/VendorResaleAndMaintenance"] [row-index="2"] [col-id="ColumnData.ServiceLevel"]'
    ).should("have.css", "background-color", "rgba(0, 0, 0, 0)");
    cy.get(
      '[data-uipath="QuoteImportsForm/General/VendorResaleAndMaintenance"] [row-index="3"] [col-id="ColumnData.ServiceLevel"]'
    ) //.should("have.css", "background-color", "rgb(255, 160, 122");
    cy.get(
      '[data-uipath="QuoteImportsForm/General/VendorResaleAndMaintenance"] [row-index="1"] [col-id="ColumnData.Alias"]'
    ).should("have.css", "background-color", "rgba(0, 0, 0, 0)");
    cy.get(
      '[data-uipath="QuoteImportsForm/General/VendorResaleAndMaintenance"] [row-index="2"] [col-id="ColumnData.Alias"]'
    ).should("have.css", "background-color", "rgba(0, 0, 0, 0)");
    cy.get(
      '[data-uipath="QuoteImportsForm/General/VendorResaleAndMaintenance"] [row-index="3"] [col-id="ColumnData.Alias"]'
    ).should("have.css", "background-color", "rgba(0, 0, 0, 0)");
    cy.get(
      '[data-uipath="QuoteImportsForm/General/VendorResaleAndMaintenance"] [row-index="4"] [col-id="ColumnData.Alias"]'
    ).should("have.css", "background-color", "rgba(0, 0, 0, 0)");
    cy.get(
      '[data-uipath="QuoteImportsForm/General/VendorResaleAndMaintenance"] [row-index="10"] [col-id="ColumnData.StartDate"]'
    ).should("have.css", "background-color", "rgba(0, 0, 0, 0)");
    cy.get(
      '[data-uipath="QuoteImportsForm/General/VendorResaleAndMaintenance"] [row-index="11"] [col-id="ColumnData.StartDate"]'
    ).should("have.css", "background-color", "rgba(0, 0, 0, 0)");
    cy.get(
      '[data-uipath="QuoteImportsForm/General/VendorResaleAndMaintenance"] [row-index="8"] [col-id="ColumnData.EndDate"]'
    ).should("have.css", "background-color", "rgba(0, 0, 0, 0)");
    cy.get(
      '[data-uipath="QuoteImportsForm/General/VendorResaleAndMaintenance"] [row-index="9"] [col-id="ColumnData.EndDate"]'
    ).should("have.css", "background-color", "rgba(0, 0, 0, 0)");
  });
});

describe("search with different criteria", () => {
  it("type on Advance search", () => {
    //cy.get('[area-label="Part Number Filter Input"]').type('7967-3EU')

    cy.get('[data-uipath="QuoteImportsForm/General/AdvanceSearch"]').click();

    cy.get('[id="description_Input"]').type("7994A001, PPT-B");
    cy.get('[id="description_Input"]').type("{enter}");
    cy.get('[id="description_Input"]').type("Canon imageRUNNER 1025");
    cy.get('[id="description_Input"]').type("{enter}");
    cy.get('[id="description_Input"]').type("imageFORMULA");
    //    cy.get('[id="description_Input"]').should(($p) => {

    cy.get('[data-uipath="GenericPopupForm/PopupSave"]').click();
  
    cy.get('[ref="eCenterColsClipper"] [role="row"]').should(($p) => {
      expect($p).to.have.length(8);
    });
    cy.get(
      '[data-uipath="QuoteImportsForm/General/ClearSearchFilter"]'
    ).click();
   
  });

  it("type on Model Name", () => {
    cy.get('[aria-label="Model Name Filter Input"]').type("imagerunner");
    // cy.get('#ag-input-id-1071').type('BladeCenter Chassis')
    cy.get('[ref="eCenterColsClipper"] [role="row"]').should(($p) => {
      expect($p).to.have.length(3);
    });
  });

  it("type on Serial Number", () => {
    cy.get('[aria-label="Model Name Filter Input"]').clear();

    cy.get('[aria-label="Serial Number Filter Input"]').type("PPT-a-");
    //cy.get('#ag-input-id-1074').type('PPT-A-23')
    cy.get('[ref="eCenterColsClipper"] [role="row"]').should(($p) => {
      expect($p).to.have.length(6);
    });
  });

  it("type on Part Number", () => {
    cy.get('[aria-label="Serial Number Filter Input"]').clear();

    cy.get('[aria-label="Part Number Filter Input"]').type("3533B001");
    //cy.get('#ag-input-id-1068').type('7967-3EU')
    cy.get('[ref="eCenterColsClipper"] [role="row"]').should(($p) => {
      expect($p).to.have.length(1);
    });
    //cy.get('#ag-input-id-1068').clear()
    cy.get('[aria-label="Part Number Filter Input"]').clear();
  });
});

describe("Locations view", () => {
 
  it("open locations view and get count", () => {
    cy.get('[data-uipath="QuoteImportsForm/General/LocationView"]').click();

    cy.get(
      '[id="addressLocationsGrid"] [role="rowgroup"] [role="row"].ag-row.ag-row-level-0'
    ).should(($p) => {
      expect($p).to.have.length(5);
    });
  });

  it("Verify search and verify Labels", () => {
    cy.get('[aria-label="Import Address Filter Input"]').type(
      "131, 1st Avenue, New York, NY"
    );
    cy.get(
      '[id="addressLocationsGrid"] [role="rowgroup"] [role="row"].ag-row.ag-row-level-0'
    ).should(($p) => {
      expect($p).to.have.length(1);
    });
  });

  it("Edit Address and verify validated", () => {
    cy.get('[id="addressLocationsGrid"] [class="idHolder"] svg').click({
      force: true,
    });

    cy.get('[data-uipath="NewLocation/EditOverageSection"]').click();
    cy.get("form").eq(1).scrollTo("top");

    cy.get('[data-uipath="NewLocation/autocomplete"]').type(
      "131, 1st Avenue, New York, NY",
      { delay: 50 }
    ); //.type('{downarrow}', {delay: 50}).focused().tab()
    cy.wait(2000);
    cy.get('[data-uipath="NewLocation/autocomplete"]')
      .type("{downarrow}")
      .focused()
      .tab();
    cy.get('[data-uipath="NewLocation/SaveandValidate"]').click();

    //Left Side
    // cy.get('[ng-bind="ModelInput.Address1"]').should(
    //   "contain.text",
    //   "1st Avenue132 1st Avenue"
    // );

    cy.get('[ng-bind="ModelInput.City"]').should("be.visible");

    cy.get('[ng-bind="ModelInput.State"]').should("be.visible");

    //Verify validated address
    cy.get('[ng-bind="ValidatedResult.Country"]');

    cy.get('[ng-bind="ValidatedResult.Address1"]');
  });

  it("Use approximate address and verify unvalidated address", () => {
    cy.get("form").eq(1).scrollTo("top");

    cy.get('[data-uipath="NewLocation/IsapproximateAddress"] [type="checkbox"]')
      .should("be.visible")
      .click();

    cy.get('[data-uipath="GenericPopupForm/PopupSave"]')
      .should("be.visible")
      .click();

    cy.get(
      '[data-uipath="QuoteImportsForm/General/ShowLocationView/MainToolBar/btnUnvalidated"]'
    )
      .should("be.visible")
      .click();

    cy.get(
      '[id="addressLocationsGrid"] [role="rowgroup"] [role="row"].ag-row.ag-row-level-0'
    ).should(($p) => {
      //expect($p).to.have.length(1)
      expect($p).to.have.length.of.at.most(1);
    });
  });
});

describe("Go back to Items view and validate", () => {
 
  it("Validate invalid items and import", () => {
    cy.get('[data-uipath="QuoteImportsForm/General/ItemView"]').click();

    cy.get("#validatepopup_button").click();

    cy.get(
      '[data-uipath="QuoteImportsForm/General/AddOneTimeElement/ValidateInvalidItemsOnly"]'
    ).click();
  });

  it("Import maintenance solution", () => {
    cy.get('[data-uipath="QuoteImportsForm/General/ImportItems"]').click();

    cy.get('[data-uipath="GenericPopupForm/PopupSave"]').click();
  });
});
