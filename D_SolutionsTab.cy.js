import 'cypress-wait-until';
import 'cypress-file-upload';
import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
import SolutionImport from "../../2.QuoteAPE/SolutionImport/SolutionImport.PageObjects";
import Solutions from "../../2.QuoteAPE/Solutions/Solutions.PageObjects";
import QuickCreateQuote from "../../2.QuoteAPE/CreateQuote/QuickCreateQuote.PageObjects"
import CommonHelperElements from "../../../support/Helpers/CommonHelper.Elements"
import CommonHelper from "../../../support/Helpers/CommonHelper"
//import '../../../support/commands'
const helper = new CommonHelper()
const ehelper = new CommonHelperElements()
const path = require('path')

// beforeEach(() => {
//   cy.restoreLocalStorage();
//   Cypress.Cookies.preserveOnce('OidcAuth');
// });

// afterEach(() => {
//   cy.saveLocalStorage();
// });

// before(() => {
//   cy.clearLocalStorageSnapshot();
// });

// beforeEach(() => {
//   cy.restoreLocalStorage();
//   Cypress.Cookies.preserveOnce('OidcAuth');
// });

// afterEach(() => {
//   cy.saveLocalStorage();
// });

const sol = new Solutions()
const si = new SolutionImport()
const cq = new QuickCreateQuote()

describe("Verify solution screen after import", () => {

  it("Verify No Grouping view after import", () => {
    

    cy.get('[data-uipath="QuoteDetail/sidebar/Root/solutionslist"]').click()
    cy.wait(8000)
    
    si.containsSolutionName('Solution').click()
    cy.wait(6000)

    cy.get('[data-uipath="SolutionsList/LeftPanel/RemoveSolutionBtn"]').click()
    cy.wait(2000)
    
    cy.get('[data-uipath="YesBtn"]', { timeout: 60000 }).click();
    cy.wait(5000)

    si.containsSolutionName('Maintenance Solution Upload').click()
    cy.wait(6000)


    cy.get('[data-uipath="NoGrouping"]').click()
    //   cy.get('[class="ag-paging-row-summary-panel"]').contains('of 9')
    cy.get('[data-uipath="QuantitySolutionTable"] [role="rowgroup"] [role="row"].ag-row.ag-row-level-0').should(($p) => {
      expect($p).to.have.length(12)
    })
  })

  it("User presses validate all", () => {
    cy.get('#validatepopup_button').click()
    cy.wait(2000)
    cy.get('#ValidateAllItems_Click').click()
    cy.wait(4000)
    //cy.reload()
    //cy.wait(15000)
  });

  it.skip("Update Quantity and verify the TCV value", ()=>{
    cy.get('[data-uipath="QuoteDetail/sidebar/Root/solutionslist"]').click()
    cy.wait(8000)
    cy.get('[row-index="1"] [col-id="Quantity"]').dblclick().clear().type('1')
    cy.wait(8000)
    cy.get('[row-index="1"] [col-id="ServiceLevel"]').click()
    cy.get('.popup-metric').click()
    cy.get('[title="11,964.53"]').should('have.value','11,964.53')
    cy.get('[data-uipath="GenericPopupForm/PopupCancel"]').click()


    // TCV value check after SLA update
    // cy.get('[row-index="1"] [col-id="ServiceLevel"]').dblclick()
    // cy.get('.ag-rich-select-row').contains("Test-SP05").click({ timeout: 60000 })
    // cy.wait(8000)
    // cy.get('[row-index="1"] [col-id="Quantity"]').dblclick().clear().type('1')
    // cy.get('.popup-metric').click()
    // cy.get('[title="11,964.53"]').should('have.value','11,964.53')
    // cy.get('[title="11,964.53"]').dblclick().clear().type('1')
    // cy.get('[data-uipath="GenericPopupForm/PopupCancel"]').click()

    // // Reprice Quote and validate TCV value
    // cy.get('#RepriceQuote').click()
    // cy.get('#RepriceQuote').contains('Click Here').click()
    // cy.get('.popup-metric').click()
    // cy.get('[title="11,964.53"]').should('have.value','11,964.53')
  })

  it("Verify Location view after import", () => {

    cy.get('[data-uipath="GroupByLocation"]').click()
    cy.wait(2500)
    //  cy.get('[class="ag-paging-row-summary-panel"]').contains('of 15')

  })
  it("Verify Component View view after import", () => {

    cy.get('[data-uipath="ComponentView"]').click()
    cy.wait(2500)
    //   cy.get('[class="ag-paging-row-summary-panel"]').contains('of 10')

  })

  it("Search with different criteria on No Groupings view", () => {
    cy.get('[data-uipath="NoGrouping"]').click()
    cy.wait(6000)
    cy.get('[aria-label="Model Name Filter Input"]').type('10')
    // cy.get('#ag-input-id-1071').type('BladeCenter Chassis')
    cy.get('[data-uipath="QuantitySolutionTable"] [role="rowgroup"] [role="row"].ag-row.ag-row-level-0').should(($p) => {
      expect($p).to.have.length(2)
    })
    //cy.get('#ag-input-id-1071').clear()
    cy.get('[aria-label="Model Name Filter Input"]').clear()


    cy.get('[aria-label="Serial Number Filter Input"]').type('PPT-B')
    //cy.get('#ag-input-id-1074').type('PPT-A-23')
    cy.get('[data-uipath="QuantitySolutionTable"] [role="rowgroup"] [role="row"].ag-row.ag-row-level-0').should(($p) => {
      expect($p).to.have.length(2)
    })
    //cy.get('#ag-input-id-1074').clear()
    cy.get('[aria-label="Serial Number Filter Input"]').clear()
    cy.wait(2000)

    cy.get('[aria-label="Part Number Filter Input"]').type('2582B001AA')
    //cy.get('#ag-input-id-1068').type('7967-3EU')
    cy.get('[data-uipath="QuantitySolutionTable"] [role="rowgroup"] [role="row"].ag-row.ag-row-level-0').should(($p) => {
      expect($p).to.have.length(1)
    })
    //cy.get('#ag-input-id-1068').clear()
    cy.get('[aria-label="Part Number Filter Input"]').clear()

  })

  it.skip("Search on Locations view", () => {
    cy.get('[data-uipath="GroupByLocation"]').click()
    cy.wait(8000)
    cy.get('[aria-label="Line Number Filter Input"]').type('1.')
    //cy.get('#ag-input-id-1074').type('PPT-A-23')
    cy.get('[data-uipath="QuantitySolutionTable"] [role="rowgroup"] [role="row"]').should(($p) => {
      expect($p).to.have.length(4)
    })
    //cy.get('#ag-input-id-1074').clear()
    cy.get('[aria-label="Line Number Filter Input"]').clear()

  })

  it.skip("Search on Components view", () => {
    cy.get('[data-uipath="ComponentView"]').click()
    cy.wait(8000)
    cy.get('[aria-label="Line Number Filter Input"]').type('2.')
    //cy.get('#ag-input-id-1074').type('PPT-A-23')
    cy.get('[data-uipath="QuantitySolutionTable"] [role="rowgroup"] [role="row"].ag-row.ag-row-level-0').should(($p) => {
      expect($p).to.have.length(4)
    })
    //cy.get('#ag-input-id-1074').clear()
    cy.get('[aria-label="Line Number Filter Input"]').clear()

  })
  it("Advanced Search with different criteria", () => {

    cy.get('[data-uipath="ComponentView"]').click()
    cy.wait(8000)
    cy.get('[data-uipath="SearchIcon"]').click()
    //cy.waitUntil()
    cy.wait(4000)
    cy.get('[data-uipath="AdvanceFilter/Description"]').should('be.visible');
    //cy.get('label').should('contain.text', "Advanced search allows user to search for multiple values(comma-separated or on separate lines)")

    cy.get('[id="description_Input"]').type('1.2')
    cy.get('[id="description_Input"]').type('{enter}')
    cy.get('[id="description_Input"]').type('PPT-B-')
    cy.get('[data-uipath="GenericPopupForm/PopupSave"]').click()


    // cy.get('#ag-input-id-1071').type('BladeCenter Chassis')
    cy.get('[data-uipath="QuantitySolutionTable"] [role="rowgroup"] [role="row"].ag-row.ag-row-level-0').should(($p) => {
      expect($p).to.have.length(3)
    })
    //cy.get('#ag-input-id-1071').clear()
    cy.get('[data-uipath="ClearIcon"]').click()

  })




  it("Verify Warning and Eligibility icons", () => {
    cy.get('[data-uipath="NoGrouping"]').click()
    cy.wait(6000)

    // cy.get('[aria-label="Line Number Filter Input"]').type('5.')
    cy.get('[class="Notice"]').should('have.length', '1')
    cy.get('[class="Warning"]').should('have.length.gte', 1)  // class "Warning" is warning but "warning" class is actually error
  })

  // it("Verify components tab for a product", () => {
  //   cy.get('[aria-label="Part Number Filter Input"]').type('7994A001')
  //   //cy.get('#ag-input-id-1068').type('7967-3EU')
  //   cy.get('[data-uipath="QuantitySolutionTable"] [role="rowgroup"] [role="row"].ag-row.ag-row-level-0').should(($p) => {
  //     expect($p).to.have.length(1)
  //   })
  //   cy.get('[data-uipath="QuantitySolutionTable"] [row-index="0"] [type="checkbox"]').eq(0).click()
  //   cy.wait(3000)

  //   cy.get('[id = "Components"]').click()
  //   cy.wait(4000)
  //   //cy.get('.ag-body-horizontal-scroll-viewport').eq(2).scrollTo('center')
  //   //cy.wait(2000)

  //   cy.get('[data-uipath="StoragekTab/QuantitySolutionTable"] [row-index="0"] [col-id="ProductId.Name"]').should(($p) => {
  //     expect($p).to.contain('Canon imageCLASS D320 Printer')
  //   })

  //   cy.get('[data-uipath="StoragekTab/QuantitySolutionTable"] [row-index="0"] [col-id="FromDateF"]').should(($p) => {
  //     expect($p).to.contain('06-Dec-2021')
  //   })

  //   cy.get('[data-uipath="StoragekTab/QuantitySolutionTable"] [row-index="0"] [col-id="ToDateF"]').should(($p) => {
  //     expect($p).to.contain('05-Jun-2022')
  //   })

  //   cy.get('[data-uipath="StoragekTab/QuantitySolutionTable"] [row-index="1"] [col-id="ProductId.Name"]').should(($p) => {
  //     expect($p).to.contain('Canon imageFORMULA Scanner DR-6010')
  //   })

  //   cy.get('[data-uipath="StoragekTab/QuantitySolutionTable"] [row-index="1"] [col-id="FromDateF"]').should(($p) => {
  //     expect($p).to.contain('06-Dec-2021')
  //   })

  //   cy.get('[data-uipath="StoragekTab/QuantitySolutionTable"] [row-index="1"] [col-id="ToDateF"]').should(($p) => {
  //     expect($p).to.contain('05-Jun-2022')
  //   })

  // })

  it("Enable additional services from the grid", () => {

    cy.get('[aria-label="Part Number Filter Input"]').type('7994A001')
    //cy.get('#ag-input-id-1068').type('7967-3EU')
    cy.get('[data-uipath="QuantitySolutionTable"] [role="rowgroup"] [role="row"].ag-row.ag-row-level-0').should(($p) => {
      expect($p).to.have.length(1)
    })
    cy.get('[data-uipath="QuantitySolutionTable"] [row-index="0"] [type="checkbox"]').eq(0).click()
    cy.wait(3000)
    cy.get('[id = "Additional Services"]').click()
    cy.wait(4000)

    cy.get('[data-uipath="QuantitySolutionTable"] [row-index="0"] [col-id="Name"]').should(($p) => {
      expect($p).to.contain('DO NOT USE - Direct')
    })

    cy.wait(1000)
    cy.get('[data-uipath="QuantitySolutionTable"] [row-index="0"] [col-id="IsSelected"] [type="checkbox"]').eq(0).click()

    cy.wait(3000)

    //    cy.get('[aria-label="Line Number Filter Input"]').clear()

  })

  // it("Verify Backline vendor tab", () => {

  //   cy.get('[id = "Subcontractor"]').click()
  //   cy.wait(4000)

  //   cy.get('[data-uipath="QuantitySolutionTable"] [row-index="0"] [col-id="SubcontractorId.Name"]').should(($p) => {
  //     expect($p).to.contain('DO NOT USE (For Automation)')
  //   })

  //   cy.get('[data-uipath="QuantitySolutionTable"] [row-index="0"] [col-id="Cost"]').should(($p) => {
  //     expect($p).to.contain('1')
  //   })

  //   cy.get('[data-uipath="QuantitySolutionTable"] [row-index="0"] [col-id="Price"]').should(($p) => {
  //     expect($p).to.contain('1.05')
  //   })

  //   cy.get('[data-uipath="QuantitySolutionTable"] [row-index="0"] [col-id="PriceOverride"]').should(($p) => {
  //     expect($p).to.contain('2.25')
  //   })

  //   cy.get('[aria-label="Part Number Filter Input"]').clear()

  // })

  // it("Fix warnings and then validate", () => {

  //   cy.get('.ag-body-horizontal-scroll-viewport').scrollTo('right')
  //  // cy.get('[data-uipath="QuantitySolutionTable"] [row-index="0"] [col-id="ServiceLevel"]').dblclick()
  //   //cy.get('.ag-virtual-list-viewport').scrollTo('top')
  //   cy.wait(2500)
  // //  cy.get('.ag-rich-select-row').contains("Full-7x24xNBD").click({ timeout: 60000 })

  // //  cy.get('[data-uipath="QuantitySolutionTable"] [row-index="1"] [col-id="ServiceLevel"]').dblclick()
  //   //cy.get('.ag-virtual-list-viewport').scrollTo('top')
  // //  cy.wait(2500)
  //  // cy.get('.ag-rich-select-row').contains("Full-7x24xNBD").click({ timeout: 60000 })

  //   cy.get('[data=uipath="Elements"]').click()
  //   cy.get('[id="ValidateInvalidItemsOnly"]').click()

  //   cy.get('[class="Warning"]').should(($p) => {
  //     expect($p).to.have.length(2)
  //   })
  // })

  it("Enable additional services from bulk operations", () => {

    //Adding another product from bulk operation
    cy.get('[aria-label="Part Number Filter Input"]').clear().type('0640B002')

    cy.wait(2000)
    cy.get('[data-uipath="QuantitySolutionTable"] [role="rowgroup"] [role="row"].ag-row.ag-row-level-0').should(($p) => {
      expect($p).to.have.length(3)
    })
    cy.get('[data-uipath="QuantitySolutionTable"] [row-index="0"] [type="checkbox"]').eq(0).click()
    cy.wait(3000)

    cy.get('[data-uipath="UIBulkOperation"]').click()
    cy.wait(3000)
    cy.contains('Enable/Disable Additional Service').click()
    //cy.wait(3000)
    cy.get('[data-uipath="GenericPopupForm/PopupSave"]').click()
    cy.wait(2000)
    cy.get('[data-uipath="MoveItemsUC/ColumnType"] select').then(function (dropdown) {
      var ddl = dropdown.data('kendoDropDownList');
      //cy.log(ddl)
      ddl.open()
      cy.get(ddl.list.get(0)).find('[role="option"]').contains('First Call with ParkView').click()
    })

    //cy.get('[data-uipath="MoveItemsUC/ColumnType"]').contains('First Call').click()
    cy.get('[data-uipath="MoveItemsUC/Actions"] select').then(function (dropdown) {
      var ddl = dropdown.data('kendoDropDownList');
      //cy.log(ddl)
      ddl.open()
      cy.get(ddl.list.get(0)).find('[role="option"]').contains('Enable').click()

      cy.get('[data-uipath="GenericPopupForm/PopupSave"]').click()
      // cy.get('[id="StartDate_Input"]').type('01-Dec-21')
      // cy.get('[id="EndDate_Input"]').type('01-Dec-21')
      //cy.get('[data-uipath="MoveItemsUC/Actions"]').contains('Enable').click()
    })
    cy.wait(5000)

  })


  // it("Add component from solution explorer", () => {

  //   //Select line item for component

  //   cy.get('[aria-label="Part Number Filter Input"]').type('BJS450')
  //   cy.get('[data-uipath="QuantitySolutionTable"] [role="rowgroup"] [role="row"].ag-row.ag-row-level-0').should(($p) => {
  //     expect($p).to.have.length(3)
  //   })
  //   cy.get('[data-uipath="QuantitySolutionTable"] [row-index="0"] [type="checkbox"]').eq(0).click()
  //   cy.wait(3000)

  //   cy.get('[data-uipath="Vendor/VendorCategoryTree/SearchTextBox"] [id="VendorCategoryTree_txtbox_Input"]', { timeout: 60000 })
  //   .clear()
  //   .click({ force: true }).focused()
  //   .type('2534B003AA', { force: true })
  //   .should('have.value', '2534B003AA')
  //   cy.wait(1500)
  //   cy.get('[data-uipath="Vendor/VendorCategoryTree/SearchButton"]').click({ force: true })

  //   cy.wait(2000)
  //   cy.get('[data-uipath="Vendor/VendorCategoryTree"] [data-role="treeview"]', { timeout: 60000 }).then(function (tr) {
  //       var treelist = tr.data("kendoTreeView");
  //       var exp = treelist.expand("li");
  //   })

  //   cy.wait(2000)
  //   cy.get('[data-uipath="PlusButton"]', { timeout: 10000 }).eq(0).click()
  //   cy.wait(2000)

  //   cy.get('[data-uipath= "ResaleMaintAddVendor/SelectSLA"] select').then(function (dropdown) {
  //   var ddl = dropdown.data('kendoDropDownList');
  //   cy.log(ddl)
  //   ddl.open();
  //   cy.get(ddl.list.get(0)).find('[role="option"]').contains('Test-SP05').click()
  //   })
  //   cy.get('[data-uipath="GenericPopupForm/PopupSave"]').click()

  // })


  it.skip("Enable additional services of multiple products from the grid", () => {

    cy.get('[aria-label="Line Number Filter Input"]').clear().type('5.')
    cy.wait(3000)
    // cy.get('[type="checkbox"]').eq(0).then(function (fn) {
    //   cy.wait(2000)
    //   var res = fn.is(":checked");
    //   if (res == "true") {
    //     cy.log("checkbox is already checked..!!!")
    //   }
    //    else {
    //     cy.log("checkbox is unchecked");
    //     cy.get('[type="checkbox"]').eq(0).click();
    //   }

    // });

    cy.get('[data-uipath="QuantitySolutionTable"] [role="rowgroup"] [role="row"]').should(($p) => {
      expect($p).to.have.length(8)
      // 

    })
    cy.wait(1000)
    //cy.get('[data-uipath="QuantitySolutionTable"] [row-index="0"] [type="checkbox"]').eq(0).uncheck()//.click()
    cy.get('[data-uipath="QuantitySolutionTable"] [row-index="0"] [type="checkbox"]').eq(0).check()

    cy.get('[data-uipath="QuantitySolutionTable"] [row-index="0"] [col-id="LineNumber"]').eq(0).click()
    cy.wait(2000)
    cy.get('[id = "Additional Services"]').click()
    cy.wait(2000)
    cy.get('[data-uipath="QuantitySolutionTable"] [col-id="IsSelected"] [type="checkbox"]').eq(0).check()
    cy.get('[data-uipath="QuantitySolutionTable"] [col-id="IsSelected"] [type="checkbox"]').eq(1).check()

    // cy.get('[aria-label="Line Number Filter Input"]').clear()
    cy.wait(1000)
    cy.get('[data-uipath="QuantitySolutionTable"] [row-index="1"] [type="checkbox"]').eq(0).click()

    cy.get('[data-uipath="QuantitySolutionTable"] [row-index="1"] [col-id="LineNumber"]').eq(0).click()
    cy.wait(2000)
    cy.get('[id = "Additional Services"]').click()
    cy.wait(2000)
    cy.get('[data-uipath="QuantitySolutionTable"] [col-id="IsSelected"] [type="checkbox"]').eq(0).check()
    cy.get('[data-uipath="QuantitySolutionTable"] [col-id="IsSelected"] [type="checkbox"]').eq(1).check()

    cy.get('[aria-label="Line Number Filter Input"]').clear()


  })

  it.skip("Verify component tab", () => {

    cy.get('[data-uipath="NoGrouping"]').click()
    cy.wait(3000)

    cy.get('[aria-label="Line Number Filter Input"]').clear().type('2.1')
    cy.wait(2000)
    //cy.get('[data-uipath="QuantitySolutionTable"] [row-id="0"] [col-id="LineNumber"]').eq(0).click()

    cy.wait(1000)
    cy.get('[data-uipath="QuantitySolutionTable"] [row-index="0"] [type="checkbox"]').eq(0).click()
    cy.wait(5000)

    cy.get('[id="Components"]').click()
    cy.wait(5000)
    cy.get('[data-uipath="StoragekTab/QuantitySolutionTable"] [role="rowgroup"] [role="row"]').should(($p) => {
      expect($p).to.have.length(3)
    })

  })
 })
