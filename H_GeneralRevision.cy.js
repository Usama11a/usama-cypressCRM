import 'cypress-wait-until';
import 'cypress-file-upload';
import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
import SolutionImport from "../../2.QuoteAPE/SolutionImport/SolutionImport.PageObjects";
import Solutions from "../../2.QuoteAPE/Solutions/Solutions.PageObjects";
import QuickCreateQuote from "../../2.QuoteAPE/CreateQuote/QuickCreateQuote.PageObjects"
import CommonHelperElements from "../../../support/Helpers/CommonHelper.Elements"
import CommonHelper from "../../../support/Helpers/CommonHelper"
//import RenewQuote from './G_RenewQuote'
//import '../../../support/commands'
const helper = new CommonHelper()
const ehelper = new CommonHelperElements()
const path = require('path')
let revision_url = null
let generalrevision_url = null
const customer_url = Cypress.env('customer_url')
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
//const ren = new RenewQuote()
describe('Create general revision', () => {

  it("opening a service contract from customer", () => {

    
    // cy.visit(Cypress.env('ppttesturl'))
    // cy.wait(10000)
    // cy.get('[id="Username"]').type('shehzad.mahmood');
    // cy.get('[id="Password"]').type('Lahore1!');

    // cy.get('[value="login"]', { timeout: 180000 }).click();
    // cy.wait(2000)

     cy.wait(10000)
    //customer_url = Cypress.env('customer_url')
    // cy.visit('https://ppttest.servicepathlive.com/Spa/#/customers/id/153068092bb660e6/opportunities')
    // cy.wait(25000)
    //cy.log('====================Customer url in H: '+Cypress.env('customer_url'))
    cy.task('getCustomerUrl').then((cust_url) => {
      cy.visit(cust_url, { failOnStatusCode: false })
    });
    //cy.visit(Cypress.env('customer_url'))
    cy.wait(25000)
    // cy.url().then((url) => {
    //   customer_url = url;
    //   cy.log("Customer URL: " + customer_url);
    // });
    //cy.wait(10000)

    cy.get('[data-uipath="Customer/sidebar/Root/servicecontracts"]').should('be.visible').click()
    cy.wait(20000)

    cy.get('[data-uipath="Grid"] [row-index="0"] [col-id="Name"]').contains('Cypress Test Quote: 0').click()

    cy.wait(12000)
    //cy.get('[data-uipath="AddRevision"]').click()
    //cy.wait(2000)
    //cy.reload()
    //cy.wait(20000)    

    cy.url().then((url) => {
      generalrevision_url = url;
      cy.log("General revision url:" + generalrevision_url);
    });
  })

  it("adding a general revision from service contract", () => {

    //cy.get('[data-uipath="ServiceContractDetail/sidebar/Root/revisions"]').should('be.visible').click()
    cy.wait(5000)

    cy.get('[id="NewRevision"]').eq(0).click()
    cy.wait(2000)
    cy.get('[data-uipath="MoveItemsUC/Username"] input').type('General Type Revision-1')

    cy.get('[id="RevisionTypes"] select').then(function (dropdown) {
      var ddl = dropdown.data('kendoDropDownList');
      //cy.log(ddl)
      ddl.open()
      cy.get(ddl.list.get(0)).find('[role="option"]').contains('General').click()

      cy.get('[data-uipath="GenericPopupForm/PopupSave"]').click()
      cy.wait(4000)
    });
  });


  it("Removing serial number of general revision", () => {
    
    cy.wait(4000)
    cy.get('[aria-label="Part Number Filter Input"]').clear().type('DR-C225')
    cy.wait(2000)
    cy.get('.ag-body-horizontal-scroll-viewport').eq(0).scrollTo('center')
    cy.wait(2000)

    cy.get('[data-uipath="QuantitySolutionTable"] [role="rowgroup"] [role="row"].ag-row.ag-row-level-0').should(($p) => {
      expect($p).to.have.length(1)
    })
    //cy.get('[data-uipath="QuantitySolutionTable"] [row-index="0"] [col-id="Alias"]').dblclick()
    cy.wait(1000)
    
    cy.get('[data-uipath="QuantitySolutionTable"] [row-index="0"] [col-id="Alias"]').dblclick().clear().type('{enter}')
    cy.wait(3000)


  })
  it("Updating product qty of general revision", () => {

    //cy.get('[data-uipath="ServiceContractDetail/sidebar/Root/solutionslist"]').click()
    //cy.wait(6000)
    //si.containsSolutionName('Maintenance Solution Upload').click()
    
    // cy.get('[data-uipath="QuantitySolutionTable"] [role="rowgroup"] [role="row"].ag-row.ag-row-level-0').should(($p) => {
    //   expect($p).to.have.length(1)
    // })
    //cy.get('[data-uipath="QuantitySolutionTable"] [row-index="0"] [type="checkbox"]').eq(0).click()
    cy.wait(1000)

    cy.get('[data-uipath="QuantitySolutionTable"] [row-index="0"] [col-id="Quantity"]').dblclick().clear().type('4').type('{enter}')
    cy.wait(3000)

  })

  it("Updating product SLA of general revision", () => {

    cy.get('.ag-body-horizontal-scroll-viewport').eq(0).scrollTo('right')
    cy.wait(2000)

    cy.get('[data-uipath="QuantitySolutionTable"] [row-index="0"] [col-id="ServiceLevel"]').dblclick()
    cy.wait(1000)
    cy.get('.ag-rich-select-row').contains("Test-SP02").click({ timeout: 60000 })
    cy.wait(3000)


  })

  it("Updating product address of general revision", () => {

    cy.get('[data-uipath="AddressLocationLookup"] [id="gcbAddressglookup_inlinelbl"]').click()
    cy.wait(2000)
    cy.get('[id="gcbAddressglookup"] input').eq(0).clear().type('133', { delay: 50 }).wait(3000).type('{downarrow}').type('{downarrow}').focused().tab()
    cy.wait(3000)

    cy.get('[data-uipath="AddressLocationLookup/SaveBtn"]').click()
    cy.wait(5000)

  })


  it("Verify the product is updated and the background color is changed", () => {
    //    cy.get('[data-uipath="QuantitySolutionTable"] [row-index="0"] [type="checkbox"]').eq(0).click()
    cy.get('[aria-label="Part Number Filter Input"]').clear({force: true}).type('DR-C225')
    cy.wait(3000)

    cy.get('[data-uipath="QuantitySolutionTable"] [role="rowgroup"] [role="row"].ag-row.ag-row-level-0').should(($p) => {
      expect($p).to.have.length.of.at.least(1)
      expect($p).to.have.length.of.at.most(2)
    })

    cy.get('[data-uipath="QuantitySolutionTable"] [role="rowgroup"] [row-index="0"]').eq(0)
      .should("have.css", "background-color", "rgb(255, 238, 217)")

    //cy.get('[aria-label="Part Number Filter Input"]').clear()
    cy.wait(3000)
  })

  it("Verify changes tab", () => {
    cy.get('[data-uipath="QuantitySolutionTable"] [row-index="0"] [type="checkbox"]').eq(0).click()
    cy.wait(3000)
    cy.get('[id="Changes"]').should('be.visible').click()
    cy.wait(4000)

    cy.get('[ng-bind="item.After"]').eq(0).should('contain.text', '4')
    cy.get('[ng-bind="item.After"]').eq(2).should('contain.text', 'Test-SP02')   // Should be at place eq(2)
    cy.get('[ng-bind="item.After"]').eq(1).should('contain.text', '133, 1st Avenue')
    
  })

  it("adding backline vendor from bulk operation", () => {
    
    cy.wait(4000)
    cy.get('[aria-label="Part Number Filter Input"]').clear().type('7994A001')
    cy.wait(2000)
    cy.get('.ag-body-horizontal-scroll-viewport').eq(0).scrollTo('center')
    cy.wait(2000)

    cy.get('[data-uipath="QuantitySolutionTable"] [role="rowgroup"] [role="row"].ag-row.ag-row-level-0').should(($p) => {
      //expect($p).to.have.length(1)
    })
    //cy.get('[data-uipath="QuantitySolutionTable"] [row-index="0"] [col-id="Alias"]').dblclick()
    cy.wait(1000)

    cy.get('[data-uipath="QuantitySolutionTable"] [row-index="0"] [type="checkbox"]').eq(0).click()
    cy.wait(3000)
    
    cy.get('[data-uipath="UIBulkOperation"]').click()
    cy.wait(3000)
    cy.contains('Send to Backline Vendor').click()
    cy.wait(3000)
    cy.get('[data-uipath="uiBulkOperation/isLocked/SelectedProduct"] input').should('be.visible').click()
    cy.wait(1500)
    cy.get('[data-uipath="GenericPopupForm/PopupSave"]').click()
    cy.wait(2000)

    cy.get('[data-uipath="MoveItemsUC/SearchTextBox"] input').type('DO NOT USE (For Automation)')
    cy.wait(2000)
    cy.get('[data-uipath="MoveItemsUC/SearchBtn"]').click()
    cy.wait(2000)

    cy.get('[data-uipath="PlusButton"]').click()



    cy.get('[name="SubcontractorSupportModelProducts"] select').then(function (dropdown) {
      var ddl = dropdown.data('kendoDropDownList');
      //cy.log(ddl)
      ddl.open()
      cy.wait(1500)
      cy.get(ddl.list.get(0)).find('[role="option"]').contains('Backline and Onsite Parts').click()
      cy.wait(2000)
    })

      cy.get('[data-uipath="GenericPopupForm/PopupSave"]').click()
      cy.wait(4000)
  
  })

  // it("Verify subcontractor grid", () => {

  //   cy.get('[data-uipath="ServiceContractDetail/sidebar/Root/subcontractor"]').click({ force: true })
  //   cy.wait(4000)
  //   cy.get('[data-uipath="QuantitySolutionTable"] [col-id="SubcontractorId.Name"]').contains('DO NOT USE (For Automation)').click()
  //   cy.wait(2000)
  //   cy.get('[data-uipath="QuantitySolutionTable"] [col-id="SubcontractorId.Name"]').should('contain.text', 'DO NOT USE (For Automation)')
  //   cy.get('[data-uipath="QuantitySolutionTable"] [col-id="NoOfItems"]').should('contain.text', '2')
  //   cy.get('[data-uipath="QuantitySolutionTable"] [col-id="Coverage"]').should('contain.text', '100%')
  //   cy.get('[data-uipath="QuantitySolutionTable"] [col-id="PricingStrategyValue"]').should('contain.text', '5% Margin')
  //   //  cy.get('[data-uipath="QuantitySolutionTable"] [col-id="StatusValue"]').should('contain.text', 'Awarded')
  // })

  // it("Update cost from the grid", () => {

  //   cy.get('[id="SubcontractorItems"] [row-id="0"] [col-id="PriceOverride"]').click().click().dblclick().clear().type('10.55').type('{enter}')
  //   cy.get('[id="SubcontractorItems"] [row-id="1"] [col-id="Cost"]').click().click().dblclick().clear().type('5').type('{enter}')
  //   //cy.get('[id="SubcontractorItems"] [row-id="1"] [col-id="TotalCost"]').click().click().dblclick().clear().type('500')
  //   //cy.get('[id="SubcontractorItems"] [row-id="4"] [col-id="Cost"]').click().click().dblclick().clear().type('350')
  //   //cy.get('[id="SubcontractorItems"] [row-id="5"] [col-id="Cost"]').click().click().dblclick().clear().type('450').type('{enter}')
  //   //cy.get('[id="SubcontractorItems"] [row-id="5"] [col-id="Quantity"]').click().click().dblclick().clear().type('2').type('{enter}')
  // })

  // it("Verify costs and prices after update", () => {

  //   cy.get('[id="SubcontractorItems"] [row-id="1"] [col-id="Cost"]').should('contain.text', 'US $5')
  //   cy.get('[id="SubcontractorItems"] [row-id="1"] [col-id="Price"]').should('contain.text', 'US $5.26')
  
  // })

  it("Award Vendor", () => {
    cy.get('[data-uipath="QuantitySolutionTable"] [col-id="StatusValue"]:eq(1)').then(function (status) {
      //  const len = status.length;

      const res = status.text()
      cy.log("Resource status value: " + res)
      if (res == "") {
        // Delete products
        // cy.get('.s-checkbox-all').click();
        cy.get('[class="button"]').contains('Award Vendor').click()
        cy.wait(4000)
        cy.get('[data-uipath="QuantitySolutionTable"] [col-id="StatusValue"]').should('contain.text', 'Awarded')
      }
    })
  })

  it("Verify Backline vendor tab", () => {

    cy.get('[data-uipath="ServiceContractDetail/sidebar/Root/solutionslist"]').click()
    cy.wait(8000)
    cy.get('[aria-label="Part Number Filter Input"]').clear().type('7994A001')
    cy.wait(2000)
    cy.get('.ag-body-horizontal-scroll-viewport').eq(0).scrollTo('center')
    cy.wait(2000)

    cy.get('[data-uipath="QuantitySolutionTable"] [role="rowgroup"] [role="row"].ag-row.ag-row-level-0').should(($p) => {
      //expect($p).to.have.length(1)
    })
    //cy.get('[data-uipath="QuantitySolutionTable"] [row-index="0"] [col-id="Alias"]').dblclick()
    cy.wait(1000)

    cy.get('[data-uipath="QuantitySolutionTable"] [row-index="0"] [type="checkbox"]').eq(0).click()
    cy.wait(3000)
    
    // cy.get('[id = "Subcontractor"]').click()
    // cy.wait(4000)

    // cy.get('[data-uipath="QuantitySolutionTable"] [row-index="0"] [col-id="SubcontractorId.Name"]').should(($p) => {
    //   expect($p).to.contain('DO NOT USE (For Automation)')
    // })

    // cy.get('[data-uipath="QuantitySolutionTable"] [row-index="0"] [col-id="Cost"]').should(($p) => {
    //   expect($p).to.contain('5')
    // })

    // cy.get('[data-uipath="QuantitySolutionTable"] [row-index="0"] [col-id="Price"]').should(($p) => {
    //   expect($p).to.contain('5.26')
    // })

//    cy.get('[aria-label="Part Number Filter Input"]').clear()

  })

  it("Adding Components after import", () => {

    cy.wait(2000)
    cy.get('[id = "Components"]').click()
    cy.wait(4000)
    //cy.get('[data-uipath="ComponentView"]').click()
    cy.wait(2500)
    cy.contains("Vendor Products", { timeout: 60000 }).should('be.visible').click();
    cy.wait(3000)
    //Cypress.Commands.SetChoiceGroupValueByName('Vendor/CatalogueLookup','AA_SeleniumCat')
    cy.get('[data-uipath= "Vendor/CatalogueLookup"] select').then(function (dropdown) {
      var ddl = dropdown.data('kendoDropDownList');
      cy.log(ddl)
      ddl.open();
      cy.wait(2500)
      cy.get('[id="vendorCmbCatalogueforBrowser_listbox"][data-role="staticlist"] [role="option"]').contains("Canon").click()

    });
    cy.wait(2500)
   
    cy.get('[data-uipath="Vendor/VendorCategoryTree/SearchTextBox"] [id="VendorCategoryTree_txtbox_Input"]', { timeout: 60000 })
    .clear()
    .click({ force: true }).focused()
    .type('9842A002AA', { force: true })
    .should('have.value', '9842A002AA')
  cy.wait(2500)
  cy.get('[data-uipath="Vendor/VendorCategoryTree/SearchButton"]').click({ force: true })
  //cy.get('[data-uipath="QuickSearch/SearchProductTree"] [role="treeitem"] .k-item').its('length').should('eq', 1)
  //cy.get('[data-uipath="QuickSearch/SearchProductTree"] [role="treeitem"] .TreeLevelTwo').should('have.length', 1)
  //cy.get('[data-uipath="Vendor/VendorCategoryTree"] [role="treeitem"]').eq(0).should('contain.text', name)
  cy.wait(3000)
  cy.get('[data-uipath="Vendor/VendorCategoryTree"] [data-role="treeview"]', { timeout: 60000 }).then(function (tr) {
    var treelist = tr.data("kendoTreeView");
    var exp = treelist.expand("li");
  });
  cy.wait(2000)

  cy.get('[data-uipath="PlusButton"]', { timeout: 10000 }).eq(0).click()
  cy.wait(3000)

  cy.get('[data-uipath= "ResaleMaintAddVendor/SelectSLA"] select').then(function (dropdown) {
    var ddl = dropdown.data('kendoDropDownList');
    cy.log(ddl)
    ddl.open();
    cy.wait(2500)
    //cy.get('[id="select_localdatacomb_select_ServiceLevel_SLAList-list"][data-role="staticlist"] [role="option"]').contains("Canon").click()
    cy.get(ddl.list.get(0)).find('[role="option"]').contains('Test-SP03').click({force: true})

  });

  cy.wait(1000)

  //cy.get('[data-uipath="ResaleMaintAddVendor/AddressLocationLookupUC"] input').eq(0).clear().type('133', { delay: 50 }).wait(3000).type('{downarrow}').type('{downarrow}').focused().tab()

  cy.get('[data-uipath="GenericPopupForm/PopupSave"]').click({force: true})
  cy.wait(5000)
  
  cy.get('[data-uipath="ProductBrowser/APB_BackButton"]', { timeout: 10000 }).click()
  cy.wait(1000)  
})

it("Verify component added from APB", () => {

  cy.get('[data-uipath="StoragekTab/QuantitySolutionTable"] [row-index="0"] [col-id="ProductId.Name"]').should(($p) => {
    expect($p).to.contain('Canon imageFORMULA Scanner DR-5010')
  })


})

it("Enable additional services from the grid", () => {

  cy.wait(3000)
  cy.get('[aria-label="Part Number Filter Input"]').clear().type('2160B002AA')
  cy.wait(2000)

  cy.get('[data-uipath="QuantitySolutionTable"] [role="rowgroup"] [role="row"].ag-row.ag-row-level-0').should(($p) => {
    //expect($p).to.have.length(1)
    expect($p).to.have.length.of.at.least(1)
    expect($p).to.have.length.of.at.most(3)
  })
  //cy.get('[data-uipath="QuantitySolutionTable"] [row-index="0"] [col-id="Alias"]').dblclick()
  cy.wait(1000)

  cy.get('[data-uipath="QuantitySolutionTable"] [row-index="0"] [type="checkbox"]').eq(0).click()
  cy.wait(3000)
  cy.get('[data-uipath="QuantitySolutionTable"] [row-index="0"] [col-id="SKU"]').eq(0).should('be.visible').click({ multiple: true })
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

  it("Confirm revision of general type", () => {
    cy.get('[data-uipath="Quote_Confirm"]').click()
    cy.wait(4000)

    cy.get('[id="orderApprovalsGrid"] [col-id="Status"]').should('contain.text', 'Confirmed')
  })

})











//   // it("Verify that the new revision is created", () => {
//   //   cy.visit(contract_url)
//   //   //cy.get('[data-uipath="ServiceContractDetail/sidebar/Root/revisions"]').click()
//   //   cy.wait(20000)

//   //   // cy.get('[data-uipath="ServiceContractDetail/sidebar/Root/revisions"]').click()
//   //   // cy.wait(5000)

//   //   cy.get('[id="orderApprovalsGrid"] [col-id="Status"]').should('contain.text', 'Pending')
//   //   cy.get('[id="orderApprovalsGrid"] [col-id="CreatedBy"]').should('contain.text', 'shehzad mehmood.sp')
//   //   //cy.get('[id="orderApprovalsGrid"] [col-id="LastModifiedBy"]').should('contain.text', 'shehzad mehmood.sp')

//   // });

//   it.skip("Cancel the revision", () => {
//     // cy.visit(revision_url)
//     // cy.wait(20000)
//     //cy.get('[id="orderApprovalsGrid"] [col-id="Status"]').contains('Pending').click()
//     //cy.wait(2000)

//     cy.get('[data-uipath="Cancel"]').click()
//     cy.wait(4000)
//     // cy.get('[id="ExitRevision"]').click()
//     // cy.wait(2000)

//     //cy.reload()
//     //cy.wait(30000)
//     cy.get('[id="orderApprovalsGrid"] [col-id="Status"]').should('contain.text', 'Cancelled')

//   });

//   it.skip("Creating another revision of general type", () => {
//     // cy.visit(revision_url)
//     //cy.wait(30000)

//     // cy.get('[data-uipath="ServiceContractDetail/sidebar/Root/revisions"]').click()
//     // cy.wait(5000)

//     cy.get('[id="NewRevision"]').eq(0).click()
//     cy.wait(2000)
//     cy.get('[data-uipath="MoveItemsUC/Username"] input').type('General Type Revision-2')

//     cy.get('[id="RevisionTypes"] select').then(function (dropdown) {
//       var ddl = dropdown.data('kendoDropDownList');
//       //cy.log(ddl)
//       ddl.open()
//       cy.get(ddl.list.get(0)).find('[role="option"]').contains('General').click()

//       cy.get('[data-uipath="GenericPopupForm/PopupSave"]').click()
//       cy.wait(4000)
//     });
//   })

//   it.skip("Updating product of general revision", () => {

//     cy.get('[data-uipath="ServiceContractDetail/sidebar/Root/solutionslist"]').click()
//     cy.wait(6000)
//     si.containsSolutionName('Maintenance Solution Upload').click()
//     cy.wait(4000)

//     cy.get('[aria-label="Line Number Filter Input"]').clear().type('3.1')
//     cy.wait(2000)
//     cy.get('[data-uipath="QuantitySolutionTable"] [role="rowgroup"] [role="row"]').should(($p) => {
//       expect($p).to.have.length(3)
//     })
//     cy.get('[data-uipath="QuantitySolutionTable"] [row-index="0"] [col-id="LineNumber"]').eq(0).click()
//     cy.wait(3000)

//     cy.get('[data-uipath="AddressLocationLookup"] [id="gcbAddressglookup_inlinelbl"]').click()
//     cy.wait(2000)
//     cy.get('[id="gcbAddressglookup"] input').eq(0).type('128 1st Avenue')
//     cy.wait(2000)
//     //cy.get('[id="gcbAddressglookup_Input_listbox"]').contains('100 Saturn Parkway, Spring Hill, TN, 37174, United States').click()

//     cy.get('[data-uipath="AddressLocationLookup/SaveBtn"]').click()
//     cy.wait(3000)

//   })


//   it.skip("Deleting product of general revision", () => {
//     cy.wait(2000)
//     cy.get('[aria-label="Line Number Filter Input"]').clear().type('2.1')
//     cy.wait(4000)
//     cy.get('[data-uipath="QuantitySolutionTable"] [role="rowgroup"] [role="row"]').should(($p) => {
//       expect($p).to.have.length(8)
//     })
//     cy.get('[data-uipath="QuantitySolutionTable"] [row-index="0"] [col-id="LineNumber"]').eq(0).click()
//     cy.wait(2000)

//     cy.get('[data-uipath="QuantitySolutionTable"] [row-index="0"] [type="checkbox"]').eq(0).check()
//     cy.wait(2000)
//     cy.get('[data-uipath="DeleteLineItemBtn"]').click()
//     cy.wait(2000)

//     cy.get('[data-uipath="YesBtn"]', { timeout: 60000 }).click();
//     cy.wait(5000)
//   })

//   it.skip("Verify the product is updated and the background color is changed", () => {
//     //    cy.get('[data-uipath="QuantitySolutionTable"] [row-index="0"] [type="checkbox"]').eq(0).click()
//     cy.get('[aria-label="Part Number Filter Input"]').clear().type('0640B002')
//     cy.wait(3000)

//     cy.get('[row-id="1"]')
//       .should("have.css", "background-color", "rgb(255, 238, 217)")

//     cy.get('[aria-label="Part Number Filter Input"]').clear()
//     cy.wait(3000)
//   })

//   it.skip("Verify the product is deleted and the background color is changed", () => {

//     cy.get('[aria-label="Line Number Filter Input"]').clear().type('2.1')
//     cy.wait(2000)
//     cy.get('[row-index="1"]')
//       .should("have.css", "background-color", "rgb(245, 245, 245)")

//   })

//   it.skip("Confirm revision of general type", () => {
//     cy.get('[data-uipath="Confirm"]').click()
//     cy.wait(4000)
//   })

//   it.skip("Creating revision of type add revision", () => {

//     cy.visit(customer_url)
//     cy.wait(30000)

//     cy.get('[data-uipath="Customer/sidebar/Root/servicecontracts"]').click()
//     cy.wait(4000)

//     cy.get('[data-uipath="Grid"] [role="row"] [col-id="SupplierName"]').contains('shehzad mehmood.sp').click()
//     cy.wait(5000)

//     cy.get('[data-uipath="AddRevision"]').click()
//     cy.wait(5000)

//     cy.get('[data-uipath = "OpportunityId"] input').eq(0).type('servicePath Test Opportunity')

//     cy.get('[data-uipath="GenericPopupForm/PopupSave"]').click()
//     cy.wait(30000)

//     cy.reload()
//     cy.wait(35000)
//     // cy.get('[data-uipath="ServiceContractDetail/sidebar/Root/revisions"]').click()
//     // cy.wait(5000)

//     // cy.get('[id="NewRevision"]').eq(0).click()
//     // cy.wait(2000)
//     // cy.get('[data-uipath="MoveItemsUC/Username"] input').type('Add Type Revision-1')

//     // cy.get('[data-uipath="OpportunityId"] select').then(function (dropdown) {
//     //   var ddl = dropdown.data('kendoDropDownList');
//     //   //cy.log(ddl)
//     //   ddl.open()
//     //   cy.get(ddl.list.get(0)).find('[role="option"]').contains('Add Revision').click()

//     //   cy.get('[id="OpportunityIdglookup"]').type('servicePath Test Opportunity')

//     //   cy.get('[id= "OpportunityIdglookup_Input_listbox"]').contains('servicePath Test Opportunity').click()
//     //   cy.get('[data-uipath="GenericPopupForm/PopupSave"]').click()
//     //   cy.wait(3000)
//     // });
//   })

//   it.skip("Adding vendor product from ABP on add revision type", () => {

//     //cy.get('[data-uipath="ServiceContractDetail/sidebar/Root/solutionslist"]').click({force : true})
//     cy.wait(6000)
//     si.containsSolutionName('Maintenance Solution Upload').click()
//     cy.wait(4000)


//     cy.wait(2000)
//     cy.contains("Vendor Products", { timeout: 60000 }).click();
//     cy.wait(3500)
//     //Cypress.Commands.SetChoiceGroupValueByName('Vendor/CatalogueLookup','AA_SeleniumCat')
//     cy.get('[data-uipath= "Vendor/CatalogueLookup"] select').then(function (dropdown) {
//       var ddl = dropdown.data('kendoDropDownList');
//       //cy.log(ddl)
//       ddl.open();
//       cy.wait(3000)
//       cy.get('[id="vendorCmbCatalogueforBrowser_listbox"][data-role="staticlist"] [role="option"]').contains("HP").first().click()

//     });
//     cy.wait(2000)

//     cy.get('[data-uipath="Vendor/VendorCategoryTree/SearchTextBox"] [id="VendorCategoryTree_txtbox_Input"]', { timeout: 60000 })
//       .clear()
//       .click({ force: true }).focused()
//       .type("3C10602A", { force: true })
//       .should('have.value', "3C10602A")
//     cy.wait(2500)
//     cy.get('[data-uipath="Vendor/VendorCategoryTree/SearchButton"]').click({ force: true })
//     cy.get('[data-uipath="Vendor/VendorCategoryTree"] [role="treeitem"]').eq(0).should('contain.text', "HP3Com PhonesNBXV3001R3Com NBX V3001R Redundant Platform")
//     cy.wait(2000)
//     cy.get('[data-uipath="Vendor/VendorCategoryTree"] [data-role="treeview"]', { timeout: 60000 }).then(function (tr) {
//       var treelist = tr.data("kendoTreeView");
//       var exp = treelist.expand("li");
//     });
//     cy.wait(2000)

//     cy.get('[data-uipath="PlusButton"]', { timeout: 10000 }).eq(0).click()
//     cy.wait(3000)

//     //  cy.get('[data-uipath="ProductBrowser/APB_BackButton"]', { timeout: 10000 }).click()

//     //Popup - add vendor product
//     cy.get('[data-uipath="MoveItemsUC/Quantity"] input').clear({ force: true }).type('2', { force: true })

//     //    cy.get('#StartDate').click();
//     //choose previous month
//     //cy.contains('Prev').click();
//     //choose next month 
//     //cy.contains('Next').click();
//     //choose date 24
//     //    cy.contains('24').click();
//     //cy.get('[id="StartDate_Input"]').type('24-Jun-2021')

//     //cy.get('[id="ChargeFromDate_Input"]').type('24-Jun-2021')
//     //    cy.get('#EndDate').click();
//     //choose previous month
//     //cy.contains('Prev').click();
//     //choose next month 
//     //cy.contains('Next').click();
//     //choose date 24
//     //    cy.contains('24').click();
//     //cy.get('[id="EndDate_Input"]').type('24-Jul-2021')

//     cy.get('[data-uipath="MoveItemsUC/ColumnType"] select').then(function (dropdown) {
//       var ddl = dropdown.data('kendoDropDownList');
//       //cy.log(ddl)
//       ddl.open()
//       cy.get(ddl.list.get(0)).find('[role="option"]').contains('Full-7x24xND').click()

//     })
//     cy.wait(2000)
//     cy.get('[name="gcbAddressUCglookup_Input_input"]').type('128 1st Avenue')
//     cy.wait(2000)
//     cy.get('[data-uipath="GenericPopupForm/PopupSave"]').click()
//     cy.wait(6000)
//   })

//   it.skip("Verify the product is added and the background color is changed", () => {

//     cy.get('[row-index="0"]')
//       .should("have.css", "background-color", "rgb(229, 242, 219)")

//   })


// });
