import 'cypress-wait-until';
import 'cypress-file-upload';
import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
import SolutionImport from "../../2.QuoteAPE/SolutionImport/SolutionImport.PageObjects";
import Solutions from "../../2.QuoteAPE/Solutions/Solutions.PageObjects";
import QuickCreateQuote from "../../2.QuoteAPE/CreateQuote/QuickCreateQuote.PageObjects"
import CommonHelperElements from "../../../support/Helpers/CommonHelper.Elements"
import CommonHelper from "../../../support/Helpers/CommonHelper"
import RenewQuote from './G_RenewQuote.cy'
//import '../../../support/commands'
const helper = new CommonHelper()
const ehelper = new CommonHelperElements()
const path = require('path')
let revision_url = null
let addrevision_url = null
const customer_url = Cypress.env('customer_url')


const sol = new Solutions()
const si = new SolutionImport()
const cq = new QuickCreateQuote()
//const ren = new RenewQuote()
describe('Add Revision', () => {

  it("Verify User have rights to Access Service Contract List From Sales Navigator", () => {
    cy.get('[id="ServiceContracts"]').click()
    cy.get('[ref="eCenterColsClipper"]').should('be.visible')
  })


  it("Verify User have rights to Access Service Contract List From Customer", () => {
    cy.task('getCustomerUrl').then((cust_url) => {
      cy.visit(cust_url, { failOnStatusCode: false })
    });
    cy.wait(20000)
    cy.wait(5000)
    cy.get('[data-uipath="Customer/sidebar/Root/servicecontracts"]').should('be.visible').click()
  })

  it("adding new revision", () => {

    
    // cy.visit(Cypress.env('ppttesturl'))
    // cy.wait(10000)
    // cy.get('[id="Username"]').type('shehzad.mahmood');
    // cy.get('[id="Password"]').type('Lahore1!');

    // cy.get('[value="login"]', { timeout: 180000 }).click();
    // cy.wait(2000)

    // cy.wait(10000)
    //customer_url = Cypress.env('customer_url')
    // cy.visit('https://ppttest.servicepathlive.com/Spa/#/customers/id/153068092bb660e6/opportunities')
    // cy.wait(25000)
    //cy.log('====================Customer url in H: '+Cypress.env('customer_url'))
    cy.task('getCustomerUrl').then((cust_url) => {
      cy.visit(cust_url, { failOnStatusCode: false })
    });
    //cy.visit(Cypress.env('customer_url'))
    cy.wait(20000)
    // cy.url().then((url) => {
    //   customer_url = url;
    //   cy.log("Customer URL: " + customer_url);
    // });
    cy.wait(5000)
    cy.get('[data-uipath="Customer/sidebar/Root/servicecontracts"]').should('be.visible').click()
    cy.wait(14000)

    cy.get('[data-uipath="Grid"] [row-index="0"] [type="checkbox"]').click()
    cy.wait(1000)
    cy.get('[data-uipath="AddRevision"]').click()
    cy.wait(2000)
    cy.get('[name="OpportunityIdglookup_Input_input"]').type('376540-DO_NOT_USE_ForAutomationOnly').wait(2000).type('{downarrow}').focused().tab()

    //cy.get('[id= "OpportunityIdglookup_Input_listbox"]').contains('376120-DO_NOT_USE_ForAutomationOnly').click()

    cy.get('[data-uipath="GenericPopupForm/PopupSave"]').click()
    cy.wait(25000)
    //cy.reload()
    //cy.wait(20000)    

    cy.url().then((url) => {
      addrevision_url = url;
      cy.log("Add revision url:" + addrevision_url);
    });
  })

  it("Verify user can cloned the revision Quote", () => {
    cy.url().then((url) => {
      const orignalId = url.split('/')
      var primaryQuoteId = orignalId[7]
    })

    cy.get('data-uipath="QuoteDetail/QuoteCloneBtn"').click()
    cy.url().then((url) => {
      const clonedId = url.split('/')
      var clonedQuoteId = clonedId[7]
      expect(primaryQuoteId).not.equal(clonedQuoteId);
    })
  })

  it("User add a maintenance solution from solution imports", () => {
      cy.get('[data-uipath="QuoteDetail/QuoteName"] label').should(($p) => {
      expect($p).to.contain('Cypress Test Quote: 0 - Revision')
    })

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
    si.getUploadBtn().click()
    cy.wait(5000)
    const mnt_file = 'sP - TestMaintimportAddRev.xls'

    si.getFile().attachFile(mnt_file)
    cy.wait(2000)
    si.getSaveBtnOnUploadPopup().click()
    cy.wait(5000)
    //cy.reload()
    //cy.wait(15000)
    si.getRowVisibility('Action')
    si.getGridVisibility()

  });
  it("User updates all the values", function () {

    cy.get('.ag-body-horizontal-scroll-viewport').scrollTo('center')

    //Serial Numbers Update
    cy.get('[data-uipath="QuoteImportsForm/General/VendorResaleAndMaintenance"] [row-index="0"] [col-id="ColumnData.Alias"]').dblclick().clear().type('PPT-C-' + Math.floor(Math.random() * 30000) + 1).type('{enter}')
    cy.get('[data-uipath="QuoteImportsForm/General/VendorResaleAndMaintenance"] [row-index="1"] [col-id="ColumnData.Alias"]').dblclick().clear().type('PPT-C-' + Math.floor(Math.random() * 30000) + 1).type('{enter}')
    cy.get('[data-uipath="QuoteImportsForm/General/VendorResaleAndMaintenance"] [row-index="2"] [col-id="ColumnData.Alias"]').dblclick().clear().type('PPT-C-' + Math.floor(Math.random() * 30000) + 1).type('{enter}')
  })

  it("User presses validate all", () => {
    cy.get('#validatepopup_button').click()
    cy.wait(2000)
    cy.get('#ValidateAllItems_Click').click()
    cy.wait(4000)
    //cy.reload()
    //cy.wait(15000)
  });

  it("Import maintenance solution", () => {

    cy.wait(4000)
    cy.get('#ImportItems').click()
    cy.wait(6000)

    cy.get('[data-uipath="SelectQuoteSolution/isLocked/ChooseExistingSolution"] input').should('be.visible').click()
    cy.wait(2000)
    cy.get('[id="tcStartupNavItemId1_TreeComboBoxButton"]').click()
    cy.wait(2000)
    cy.get('[id="tcStartupNavItemId1_TreeComboBoxPopup_Tree"] [role="treeitem"]').contains('Maintenance Solution Upload').click()
    cy.wait(1000)

    cy.get('[data-uipath="GenericPopupForm/PopupSave"]').click()
    cy.wait(5000)
    //cy.reload()
    //cy.wait(15000)
  })

  it("Verify products after import", () => {
    cy.wait(2000)
    cy.get('[data-uipath="QuoteDetail/sidebar/Root/solutionslist"]').click()
    cy.wait(10000)

    cy.get('[data-uipath="QuantitySolutionTable"] [role="rowgroup"] [role="row"].ag-row.ag-row-level-0').should(($p) => {
      expect($p).to.have.length(3)
    })
  })

  it("Adding expired item from APB", () => {

    cy.contains("Vendor Products", { timeout: 60000 }).should('be.visible').click();
    cy.wait(3000)
    cy.get('[data-uipath= "Vendor/CatalogueLookup"] select').then(function (dropdown) {
      var ddl = dropdown.data('kendoDropDownList');
      cy.log(ddl)
      ddl.open();
      cy.wait(2500)
      cy.get('[id="vendorCmbCatalogueforBrowser_listbox"][data-role="staticlist"] [role="option"]').contains("Canon").click()

    });
    cy.wait(2500)

    //Adding Expired product
    cy.get('[data-uipath="Vendor/VendorCategoryTree/SearchTextBox"] [id="VendorCategoryTree_txtbox_Input"]', { timeout: 60000 })
      .clear()
      .click({ force: true }).focused()
      .type('2534B003AA', { force: true })
      .should('have.value', '2534B003AA')
    cy.wait(1500)
    cy.get('[data-uipath="Vendor/VendorCategoryTree/SearchButton"]').click({ force: true })
    
    cy.wait(2000)
    cy.get('[data-uipath="Vendor/VendorCategoryTree"] [data-role="treeview"]', { timeout: 60000 }).then(function (tr) {
      var treelist = tr.data("kendoTreeView");
      var exp = treelist.expand("li");
    });
    cy.wait(2000)

    cy.get('[data-uipath="PlusButton"]', { timeout: 10000 }).eq(0).click()

    cy.wait(2000)

    cy.get('[data-uipath= "ResaleMaintAddVendor/SelectSLA"] select').then(function (dropdown) {
      var ddl = dropdown.data('kendoDropDownList');
      cy.log(ddl)
      ddl.open();
      cy.get(ddl.list.get(0)).find('[role="option"]').contains('Test-SP05').click()
    });

    cy.wait(1000)

    cy.get('[data-uipath="ResaleMaintAddVendor/AddressLocationLookupUC"] input').eq(0).clear().type('133', { delay: 50 }).wait(3000).type('{downarrow}').type('{downarrow}').focused().tab()

    cy.get('[data-uipath="GenericPopupForm/PopupSave"]').click()
    cy.wait(3000)

  })

  it("Adding active item from APB", () => {
    cy.get('[data-uipath="Vendor/VendorCategoryTree/SearchTextBox"] [id="VendorCategoryTree_txtbox_Input"]', { timeout: 60000 })
      .clear()
      .click({ force: true }).focused()
      .type('4605B002', { force: true })
      .should('have.value', '4605B002')
    cy.wait(2500)
    cy.get('[data-uipath="Vendor/VendorCategoryTree/SearchButton"]').click({ force: true })
    cy.wait(3000)
    cy.get('[data-uipath="Vendor/VendorCategoryTree"] [data-role="treeview"]', { timeout: 60000 }).then(function (tr) {
      var treelist = tr.data("kendoTreeView");
      var exp = treelist.expand("li");
    });
    cy.wait(2000)

    cy.get('[data-uipath="PlusButton"]', { timeout: 10000 }).eq(0).click()
    cy.wait(2000)

    cy.get('[data-uipath= "ResaleMaintAddVendor/SelectSLA"] select').then(function (dropdown) {
      var ddl = dropdown.data('kendoDropDownList');
      cy.log(ddl)
      ddl.open();
      cy.get(ddl.list.get(0)).find('[role="option"]').contains('Test-SP05').click()

    });

    cy.wait(1000)

    cy.get('[data-uipath="ResaleMaintAddVendor/AddressLocationLookupUC"] input').eq(0).clear().type('133', { delay: 50 }).wait(3000).type('{downarrow}').type('{downarrow}').focused().tab()

    cy.get('[data-uipath="GenericPopupForm/PopupSave"]').click()
    cy.wait(3000)
    cy.wait(2000)
    cy.get('[data-uipath="ProductBrowser/APB_BackButton"]', { timeout: 10000 }).click()

  })

  it("Verify Location view after import", () => {
    cy.get('[data-uipath="GroupByLocation"]').click()
    cy.wait(2500)
  })

  it("Search with different criteria on No Groupings view", () => {
    cy.get('[data-uipath="NoGrouping"]').click()
    cy.wait(6000)
    cy.get('[aria-label="Model Name Filter Input"]').type('320')
    // cy.get('#ag-input-id-1071').type('BladeCenter Chassis')
    cy.get('[data-uipath="QuantitySolutionTable"] [role="rowgroup"] [role="row"].ag-row.ag-row-level-0').should(($p) => {
      expect($p).to.have.length(3)
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

    cy.get('[aria-label="Part Number Filter Input"]').type('7994A001')
    //cy.get('#ag-input-id-1068').type('7967-3EU')
    cy.get('[data-uipath="QuantitySolutionTable"] [role="rowgroup"] [role="row"].ag-row.ag-row-level-0').should(($p) => {
      expect($p).to.have.length(1)
    })
    //cy.get('#ag-input-id-1068').clear()
    cy.get('[aria-label="Part Number Filter Input"]').clear()

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
    cy.get('[id="description_Input"]').type('PPT-A-')
    cy.get('[id="description_Input"]').type('9842A002AA')

    cy.get('[data-uipath="GenericPopupForm/PopupSave"]').click()


    // cy.get('#ag-input-id-1071').type('BladeCenter Chassis')
    cy.get('[data-uipath="QuantitySolutionTable"] [role="rowgroup"] [role="row"].ag-row.ag-row-level-0').should(($p) => {
      expect($p).to.have.length(1)
    })
    //cy.get('#ag-input-id-1071').clear()
    cy.get('[data-uipath="ClearIcon"]').click()

  })


  it("Verify Warning and Eligibility icons", () => {
    cy.get('[data-uipath="NoGrouping"]').click()
    cy.wait(6000)

    // cy.get('[aria-label="Line Number Filter Input"]').type('5.')
    cy.get('[class="Notice"]').should('have.length', '0')
    cy.get('[class="Warning"]').should('have.length.gte', 0)  // class "Warning" is warning but "warning" class is actually error
  })

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

  it("Verify user should be able to update in Line items", () => {
    //SLA update
    cy.get(
      '[data-uipath="QuoteImportsForm/General/VendorResaleAndMaintenance"] [row-index="3"] [col-id="ColumnData.ServiceLevel"]'
    ).dblclick()
  
    cy.get(".ag-rich-select-row")
      .contains("Test-SP05")
      .click({ timeout: 60000 });
  
    //Quantity Update
    cy.get(
      '[data-uipath="QuoteImportsForm/General/VendorResaleAndMaintenance"] [row-index="4"] [col-id="ColumnData.Quantity"]'
    )
      .dblclick()
      .clear()
      .type("1");
  
    //Serial number update
  
    cy.get(
      '[data-uipath="QuoteImportsForm/General/VendorResaleAndMaintenance"] [row-index="1"] [col-id="ColumnData.Alias"]'
    )
      .dblclick()
      .clear()
      .type("PPT-A-" + Math.floor(Math.random() * 3000000) + 1);
  
  })
  
  
  it("Enable additional services from bulk operations", () => {

    //Adding another product from bulk operation
    cy.get('[aria-label="Part Number Filter Input"]').clear().type('9842A002AA')

    cy.wait(2000)
    cy.get('[data-uipath="QuantitySolutionTable"] [role="rowgroup"] [role="row"].ag-row.ag-row-level-0').should(($p) => {
      expect($p).to.have.length(1)
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



//Add product from product explorer
it("Verify user should able to Add products in Solution", () => {
  cy.contains("Vendor Products", { timeout: 60000 }).should('be.visible').click();
  cy.wait(3000)
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
  .type('8967B002AA', { force: true })
  .should('have.value', '8967B002AA')
cy.wait(2500)
cy.get('[data-uipath="Vendor/VendorCategoryTree/SearchButton"]').click({ force: true })

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
  cy.get(ddl.list.get(0)).find('[role="option"]').contains('Test-SP02').click({force: true})

});

cy.get('[data-uipath= "ResaleMaintAddVendor/AddressLocationLookupUC"]').click().type('134, 1st Avenue, New York, NY, 10009, United States').click({force: true})

cy.wait(1000)

cy.get('[data-uipath="GenericPopupForm/PopupSave"]').click({force: true})
cy.wait(5000)

cy.get('[aria-label="Part Number Filter Input"]').type('8967B002AA')
cy.get('[data-uipath="QuantitySolutionTable"] [role="rowgroup"] [role="row"].ag-row.ag-row-level-0').should(($p) => {
  expect($p).to.have.length(1)
})
})


  it("Verify after adding products from APB", () => {
    cy.get('[data-uipath="QuantitySolutionTable"] [role="rowgroup"] [role="row"].ag-row.ag-row-level-0').should(($p) => {
      expect($p).to.have.length(6)
    })
  })

    it("Verify Discounts for line item reflect in revision quote",()=>{
      cy.get('#Quote_Pricing').click()
      cy.get(' [row-index="1"] [col-id="ColumnData.RecurringDiscountPercent"]').should('contain.text','10')
    })

    it("Verify Discounts given for any line item (not price override) should reflect in renewal quote when added from product explorer using same location/SLA",()=>{
        cy.contains("Vendor Products", { timeout: 60000 }).should('be.visible').click();
        cy.wait(3000)
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
        .type('8967B002AA', { force: true })
        .should('have.value', '8967B002AA')
      cy.wait(2500)
      cy.get('[data-uipath="Vendor/VendorCategoryTree/SearchButton"]').click({ force: true })
      
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
        cy.get(ddl.list.get(0)).find('[role="option"]').contains('Test-SP02').click({force: true})
      
      });
      
      cy.get('[data-uipath= "ResaleMaintAddVendor/AddressLocationLookupUC"]').click().type('134, 1st Avenue, New York, NY, 10009, United States').click({force: true})
      
      cy.wait(1000)
      
      cy.get('[data-uipath="GenericPopupForm/PopupSave"]').click({force: true})
      cy.wait(5000)
      
      cy.get('[aria-label="Part Number Filter Input"]').type('8967B002AA')
      cy.get('[data-uipath="QuantitySolutionTable"] [role="rowgroup"] [role="row"].ag-row.ag-row-level-0').should(($p) => {
        expect($p).to.have.length(1)
      })
      
      
      cy.get('#Quote_Pricing').click()
      cy.get(' [row-index="1"] [col-id="ColumnData.RecurringDiscountPercent"]').should('contain.text','10')
    })

    

  it("Run revision workflow", () => {

    cy.get('[data-uipath="Quote_SendForESOApproval"]').click()

    cy.get('[id="Comment_Input"].s-textarea-input').eq(0).type('Testing - sent for financial approval..')

    cy.get('[data-uipath="SubmitOperation_EntityOperation"]').first().click()
    cy.wait(10000)
    // cy.get('[data-uipath="Quote_SendForTechnicalReview"]').click()
    // cy.wait(4000)
    cy.get('[data-uipath="QuoteDetail/sidebar/Root/approvals"]').click()
    cy.wait(10000)

    //Workflow - Pricing Team Lead
    cy.get('[id="ApproveTask"]').eq(1).click()
    cy.wait(4000)
    cy.get('[id="Comments_Input"].s-textarea-input').eq(0).type('Approved on behalf of Pricing Team Lead... (Automated Approval by Cypress)')
    cy.get('[data-uipath="GenericPopupForm/PopupSave"]').click()
    cy.wait(5000)


    //Workflow - Sales Operation VP
    // cy.get('[id="ApproveTask"]').eq(5).click()
    // cy.wait(4000)
    // cy.get('[id="Comments_Input"].s-textarea-input').eq(0).type('Approved on behalf of Sales Operation VP.. (Automated Approval by Cypress)')
    // cy.get('[data-uipath="GenericPopupForm/PopupSave"]').click()
    // cy.wait(5000)

    // cy.get('[data-uipath="Quote_QuoteReady"]').click()
    // cy.wait(5000)
    // cy.get('[data-uipath="Quote_SendForValidation"]').click()
    // cy.wait(5000)
    // cy.get('[data-uipath="Quote_ConvertToOrder"]').click()
    // cy.wait(7000)

    //cy.get('[data-uipath="Order_SendToCustomer"]').click()
    //cy.wait(5000)

    // Field Service VP
    cy.get('[id="ApproveTask"]').eq(0).click()
    cy.wait(4000)
    cy.get('[id="Comments_Input"].s-textarea-input').eq(0).type('Approved on behalf of Field service VP... (Automated Approval by Cypress)')
    cy.get('[data-uipath="GenericPopupForm/PopupSave"]').click()
    cy.wait(5000)

    cy.get('[id="ApproveTask"]').eq(1).click()
    cy.wait(4000)
    cy.get('[id="Comments_Input"].s-textarea-input').eq(0).type('Approved on behalf of Field service VP... (Automated Approval by Cypress)')
    cy.get('[data-uipath="GenericPopupForm/PopupSave"]').click()
    cy.wait(5000)

 
    it("Verify User can update line item through bulk operation", () => {
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
      cy.get('[data-uipath="uiBulkOperation/isLocked/SelectedProduct"] input').should('be.visible').click()
      cy.wait(1500)
      cy.get('[data-uipath="GenericPopupForm/PopupSave"]').click()
      cy.wait(2000)
    
      cy.get('[ng-model="BulkOperation.ApplyQuantity"]').click()
      cy.get('[ng-model="BulkOperation.Quantity"]').type('2')
    
      cy.get('[data-uipath="GenericPopupForm/PopupSave"]').click()
      cy.wait(4000)
    
    })

    it("Verify All the Domain Events should be log in Time line", () => {
      cy.get('[aria-label="Part Number Filter Input"]').clear().type('7994A001')
      cy.wait(2000)
     // cy.get('[id="Quote_Timeline"]').click()
      cy.get('[id="div-EventText"] [id="divInfoBar"]').should('include.text','Lineitems Updated')
    })

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
        ddl.open()
        cy.get(ddl.list.get(0)).find('[role="option"]').contains('First Call with ParkView').click()
      })
  
      cy.get('[data-uipath="MoveItemsUC/Actions"] select').then(function (dropdown) {
        var ddl = dropdown.data('kendoDropDownList');
        ddl.open()
        cy.get(ddl.list.get(0)).find('[role="option"]').contains('Enable').click()
  
        cy.get('[data-uipath="GenericPopupForm/PopupSave"]').click()
      })
      cy.wait(5000)
    })


    

    it("ESO Service Approval", ()=>{
      cy.get('[class="cm-left-col"]').contains('Services').click()
    })

    it("Quote ready", () => {

      cy.get('[data-uipath="Quote_QuoteReady"]').click()
      cy.wait(5000)
    })

    it("Send for validation", () => {
      cy.get('[data-uipath="Quote_SendForValidation"]').click()
      cy.wait(5000)
    })

    it("Convert to Order", () => {
      cy.get('[data-uipath="Quote_SendForOrderApprovals"]').click()
      cy.get('[id="Quote_SendForOrderApprovals"] [id="Comment_Input"].s-textarea-input').eq(0).type('Send for Order Approval)')
      cy.get('[id="Quote_SendForOrderApprovals"] [data-uipath="SubmitOperation_EntityOperation"]').click()
      cy.get('[data-uipath="Quote_ConvertToOrder"]').click()
      cy.wait(15000)
      cy.get('[id="GotoOrder"]').click()
    })
  
    it("Confirm Order", () => {
      cy.get('[data-uikey="Order_Confirm"]').click()
      cy.wait(15000)
    })

  })

  it("Renew quote and sync", () => {
    cy.task('getCustomerUrl').then((cust_url) => {
      cy.visit(cust_url, { failOnStatusCode: false })
    });
    
    cy.wait(20000)
    cy.get('[data-uipath="Customer/sidebar/Root/quotes"]').should('be.visible').click( { failOnStatusCode: false } )

    cy.wait(15000)
    cy.get('[data-uipath="Customers/Quote/Grid"] [row-index="1"] [col-id="AgreementName"]').contains('Cypress Test Quote: 0 - Renewal').should('be.visible').click()
    cy.wait(8000)

    cy.get('[id="SyncFromServiceContract"]').eq(0).should('be.visible').click()
    

  })

  it("Verify products in renew quote after sync from contract", () => {
    cy.get('[data-uipath="QuantitySolutionTable"] [role="rowgroup"] [role="row"].ag-row.ag-row-level-0').should(($p) => {
      expect($p).to.have.length(12)
    })
    })


























  // it("Verify that the new revision is created", () => {
  //   cy.visit(contract_url)
  //   //cy.get('[data-uipath="ServiceContractDetail/sidebar/Root/revisions"]').click()
  //   cy.wait(20000)

  //   // cy.get('[data-uipath="ServiceContractDetail/sidebar/Root/revisions"]').click()
  //   // cy.wait(5000)

  //   cy.get('[id="orderApprovalsGrid"] [col-id="Status"]').should('contain.text', 'Pending')
  //   cy.get('[id="orderApprovalsGrid"] [col-id="CreatedBy"]').should('contain.text', 'shehzad mehmood.sp')
  //   //cy.get('[id="orderApprovalsGrid"] [col-id="LastModifiedBy"]').should('contain.text', 'shehzad mehmood.sp')

  // });

  it.skip("Cancel the revision", () => {
    // cy.visit(revision_url)
    // cy.wait(20000)
    //cy.get('[id="orderApprovalsGrid"] [col-id="Status"]').contains('Pending').click()
    //cy.wait(2000)

    cy.get('[data-uipath="Cancel"]').click()
    cy.wait(4000)
    // cy.get('[id="ExitRevision"]').click()
    // cy.wait(2000)

    //cy.reload()
    //cy.wait(30000)
    cy.get('[id="orderApprovalsGrid"] [col-id="Status"]').should('contain.text', 'Cancelled')

  });

  it.skip("Creating another revision of general type", () => {
    // cy.visit(revision_url)
    //cy.wait(30000)

    // cy.get('[data-uipath="ServiceContractDetail/sidebar/Root/revisions"]').click()
    // cy.wait(5000)

    cy.get('[id="NewRevision"]').eq(0).click()
    cy.wait(2000)
    cy.get('[data-uipath="MoveItemsUC/Username"] input').type('General Type Revision-2')

    cy.get('[id="RevisionTypes"] select').then(function (dropdown) {
      var ddl = dropdown.data('kendoDropDownList');
      //cy.log(ddl)
      ddl.open()
      cy.get(ddl.list.get(0)).find('[role="option"]').contains('General').click()

      cy.get('[data-uipath="GenericPopupForm/PopupSave"]').click()
      cy.wait(4000)
    });
  })

  it.skip("Updating product of general revision", () => {

    cy.get('[data-uipath="ServiceContractDetail/sidebar/Root/solutionslist"]').click()
    cy.wait(6000)
    si.containsSolutionName('Maintenance Solution Upload').click()
    cy.wait(4000)

    cy.get('[aria-label="Line Number Filter Input"]').clear().type('3.1')
    cy.wait(2000)
    cy.get('[data-uipath="QuantitySolutionTable"] [role="rowgroup"] [role="row"]').should(($p) => {
      expect($p).to.have.length(3)
    })
    cy.get('[data-uipath="QuantitySolutionTable"] [row-index="0"] [col-id="LineNumber"]').eq(0).click()
    cy.wait(3000)

    cy.get('[data-uipath="AddressLocationLookup"] [id="gcbAddressglookup_inlinelbl"]').click()
    cy.wait(2000)
    cy.get('[id="gcbAddressglookup"] input').eq(0).type('128 1st Avenue')
    cy.wait(2000)
    //cy.get('[id="gcbAddressglookup_Input_listbox"]').contains('100 Saturn Parkway, Spring Hill, TN, 37174, United States').click()

    cy.get('[data-uipath="AddressLocationLookup/SaveBtn"]').click()
    cy.wait(3000)

  })


  it.skip("Deleting product of general revision", () => {
    cy.wait(2000)
    cy.get('[aria-label="Line Number Filter Input"]').clear().type('2.1')
    cy.wait(4000)
    cy.get('[data-uipath="QuantitySolutionTable"] [role="rowgroup"] [role="row"]').should(($p) => {
      expect($p).to.have.length(8)
    })
    cy.get('[data-uipath="QuantitySolutionTable"] [row-index="0"] [col-id="LineNumber"]').eq(0).click()
    cy.wait(2000)

    cy.get('[data-uipath="QuantitySolutionTable"] [row-index="0"] [type="checkbox"]').eq(0).check()
    cy.wait(2000)
    cy.get('[data-uipath="DeleteLineItemBtn"]').click()
    cy.wait(2000)

    cy.get('[data-uipath="YesBtn"]', { timeout: 60000 }).click();
    cy.wait(5000)
  })

  it.skip("Verify the product is updated and the background color is changed", () => {
    //    cy.get('[data-uipath="QuantitySolutionTable"] [row-index="0"] [type="checkbox"]').eq(0).click()
    cy.get('[aria-label="Part Number Filter Input"]').clear().type('0640B002')
    cy.wait(3000)

    cy.get('[row-id="1"]')
      .should("have.css", "background-color", "rgb(255, 238, 217)")

    cy.get('[aria-label="Part Number Filter Input"]').clear()
    cy.wait(3000)
  })

  it.skip("Verify the product is deleted and the background color is changed", () => {

    cy.get('[aria-label="Line Number Filter Input"]').clear().type('2.1')
    cy.wait(2000)
    cy.get('[row-index="1"]')
      .should("have.css", "background-color", "rgb(245, 245, 245)")

  })

  it.skip("Confirm revision of general type", () => {
    cy.get('[data-uipath="Confirm"]').click()
    cy.wait(4000)
  })

  it.skip("Creating revision of type add revision", () => {

    cy.visit(customer_url)
    cy.wait(30000)

    cy.get('[data-uipath="Customer/sidebar/Root/servicecontracts"]').click()
    cy.wait(4000)

    cy.get('[data-uipath="Grid"] [role="row"] [col-id="SupplierName"]').contains('shehzad mehmood.sp').click()
    cy.wait(5000)

    cy.get('[data-uipath="AddRevision"]').click()
    cy.wait(5000)

    cy.get('[data-uipath = "OpportunityId"] input').eq(0).type('servicePath Test Opportunity')

    cy.get('[data-uipath="GenericPopupForm/PopupSave"]').click()
    cy.wait(30000)

    //cy.reload()
    //cy.wait(35000)
    // cy.get('[data-uipath="ServiceContractDetail/sidebar/Root/revisions"]').click()
    // cy.wait(5000)

    // cy.get('[id="NewRevision"]').eq(0).click()
    // cy.wait(2000)
    // cy.get('[data-uipath="MoveItemsUC/Username"] input').type('Add Type Revision-1')

    // cy.get('[data-uipath="OpportunityId"] select').then(function (dropdown) {
    //   var ddl = dropdown.data('kendoDropDownList');
    //   //cy.log(ddl)
    //   ddl.open()
    //   cy.get(ddl.list.get(0)).find('[role="option"]').contains('Add Revision').click()

    //   cy.get('[id="OpportunityIdglookup"]').type('servicePath Test Opportunity')

    //   cy.get('[id= "OpportunityIdglookup_Input_listbox"]').contains('servicePath Test Opportunity').click()
    //   cy.get('[data-uipath="GenericPopupForm/PopupSave"]').click()
    //   cy.wait(3000)
    // });
  })

  it.skip("Adding vendor product from ABP on add revision type", () => {

    //cy.get('[data-uipath="ServiceContractDetail/sidebar/Root/solutionslist"]').click({force : true})
    cy.wait(6000)
    si.containsSolutionName('Maintenance Solution Upload').click()
    cy.wait(4000)


    cy.wait(2000)
    cy.contains("Vendor Products", { timeout: 60000 }).click();
    cy.wait(3500)
    //Cypress.Commands.SetChoiceGroupValueByName('Vendor/CatalogueLookup','AA_SeleniumCat')
    cy.get('[data-uipath= "Vendor/CatalogueLookup"] select').then(function (dropdown) {
      var ddl = dropdown.data('kendoDropDownList');
      //cy.log(ddl)
      ddl.open();
      cy.wait(3000)
      cy.get('[id="vendorCmbCatalogueforBrowser_listbox"][data-role="staticlist"] [role="option"]').contains("HP").first().click()

    });
    cy.wait(2000)

    cy.get('[data-uipath="Vendor/VendorCategoryTree/SearchTextBox"] [id="VendorCategoryTree_txtbox_Input"]', { timeout: 60000 })
      .clear()
      .click({ force: true }).focused()
      .type("3C10602A", { force: true })
      .should('have.value', "3C10602A")
    cy.wait(2500)
    cy.get('[data-uipath="Vendor/VendorCategoryTree/SearchButton"]').click({ force: true })
    cy.get('[data-uipath="Vendor/VendorCategoryTree"] [role="treeitem"]').eq(0).should('contain.text', "HP3Com PhonesNBXV3001R3Com NBX V3001R Redundant Platform")
    cy.wait(2000)
    cy.get('[data-uipath="Vendor/VendorCategoryTree"] [data-role="treeview"]', { timeout: 60000 }).then(function (tr) {
      var treelist = tr.data("kendoTreeView");
      var exp = treelist.expand("li");
    });
    cy.wait(2000)

    cy.get('[data-uipath="PlusButton"]', { timeout: 10000 }).eq(0).click()
    cy.wait(3000)

    //  cy.get('[data-uipath="ProductBrowser/APB_BackButton"]', { timeout: 10000 }).click()

    //Popup - add vendor product
    cy.get('[data-uipath="MoveItemsUC/Quantity"] input').clear({ force: true }).type('2', { force: true })

    //    cy.get('#StartDate').click();
    //choose previous month
    //cy.contains('Prev').click();
    //choose next month 
    //cy.contains('Next').click();
    //choose date 24
    //    cy.contains('24').click();
    //cy.get('[id="StartDate_Input"]').type('24-Jun-2021')

    //cy.get('[id="ChargeFromDate_Input"]').type('24-Jun-2021')
    //    cy.get('#EndDate').click();
    //choose previous month
    //cy.contains('Prev').click();
    //choose next month 
    //cy.contains('Next').click();
    //choose date 24
    //    cy.contains('24').click();
    //cy.get('[id="EndDate_Input"]').type('24-Jul-2021')

    cy.get('[data-uipath="MoveItemsUC/ColumnType"] select').then(function (dropdown) {
      var ddl = dropdown.data('kendoDropDownList');
      //cy.log(ddl)
      ddl.open()
      cy.get(ddl.list.get(0)).find('[role="option"]').contains('Full-7x24xND').click()

    })
    cy.wait(2000)
    cy.get('[name="gcbAddressUCglookup_Input_input"]').type('128 1st Avenue')
    cy.wait(2000)
    cy.get('[data-uipath="GenericPopupForm/PopupSave"]').click()
    cy.wait(6000)
  })

  it.skip("Verify the product is added and the background color is changed", () => {

    cy.get('[row-index="0"]')
      .should("have.css", "background-color", "rgb(229, 242, 219)")

  })


});
