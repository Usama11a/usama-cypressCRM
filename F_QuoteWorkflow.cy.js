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

// before(() => {
//   cy.clearCookies()
//   cy.clearLocalStorageSnapshot();
//   cy.clearLocalStorage()
// });
// before(() => {
//   cy.clearLocalStorageSnapshot();
// });

// beforeEach(() => {

//   Cypress.Cookies.preserveOnce('OidcAuth');
//   cy.restoreLocalStorage();


//  cy.window().then(win => {
//   if (win) {
//     cy.log('W****** window found ************');
//     if (win.signalRConnection) {
//       cy.log('------------------------- signalRConnection found ----------------');
//       win.signalRConnection();
//     }
//   }
//  });

// });

// afterEach(() => {
//   cy.saveLocalStorage();
// });

const sol = new Solutions()
const si = new SolutionImport()
const cq = new QuickCreateQuote()


describe('Quote workflow', () => {

  it("Sent quote for financial approval", () => {

    

    cy.get('[data-uipath="Quote_SendForESOApproval"]').click()

    cy.get('[id="Comment_Input"].s-textarea-input').eq(0).type('Testing - sent for financial approval..')

    cy.get('[data-uipath="SubmitOperation_EntityOperation"]').first().click()
    cy.wait(10000)

  })

  it("Approvals Screen: approved by Pricing Analyst III", () => {
    cy.get('[data-uipath="QuoteDetail/sidebar/Root/approvals"]').click()
    cy.wait(2000)

    //Workflow - Pricing Analyst III
    cy.get('[id="ApproveTask"]').eq(0).click()
    cy.wait(4000)

    cy.get('[id="Comments_Input"].s-textarea-input').eq(0).type('Approved on behalf of Pricing Analyst III.. (Automated Approval by Cypress)')

    cy.get('[data-uipath="GenericPopupForm/PopupSave"]').click()
    cy.wait(5000)
  })

  // it("Approvals Screen: approved by Pricing Team Lead", () => {
  //   //Workflow - Pricing Team Lead
  //   cy.get('[id="ApproveTask"]').eq(1).click()
  //   cy.wait(4000)

  //   cy.get('[id="Comments_Input"].s-textarea-input').eq(0).type('Approved on behalf of Pricing Team Lead.. (Automated Approval by Cypress)')

  //   cy.get('[data-uipath="GenericPopupForm/PopupSave"]').click()
  //   cy.wait(5000)
  // })

  it("Approvals Screen: approved by Pricing Manager", () => {
    cy.get('[data-uipath="QuoteDetail/sidebar/Root/approvals"]').click()
    cy.wait(2000)

    //Workflow - Pricing Manager
    cy.get('[id="ApproveTask"]').eq(2).click()
    cy.wait(4000)

    cy.get('[id="Comments_Input"].s-textarea-input').eq(0).type('Approved on behalf of Pricing Manager.. (Automated Approval by Cypress)')

    cy.get('[data-uipath="GenericPopupForm/PopupSave"]').click()
    cy.wait(5000)
  })

  it("Approvals Screen: approved by Sr Pricing Manager", () => {
    //Workflow - Sr Pricing Manager
    cy.get('[id="ApproveTask"]').eq(3).click()
    cy.wait(4000)

    cy.get('[id="Comments_Input"].s-textarea-input').eq(0).type('Approved on behalf of Sr. Pricing Manager.. (Automated Approval by Cypress)')

    cy.get('[data-uipath="GenericPopupForm/PopupSave"]').click()

    cy.wait(5000)
  })

  it("Approvals Screen: approved by Sales Operation VP", () => {
    cy.get('[data-uipath="QuoteDetail/sidebar/Root/approvals"]').click()
    cy.wait(2000)

    //Workflow - Sales Operation VP
    cy.get('[id="ApproveTask"]').eq(5).click()
    cy.wait(4000)

    cy.get('[id="Comments_Input"].s-textarea-input').eq(0).type('Approved on behalf of Sales Operation VP.. (Automated Approval by Cypress)')

    cy.get('[data-uipath="GenericPopupForm/PopupSave"]').click()
    cy.wait(5000)
  })

  //Workflow - Field Service VP 
  it("Approval Services Screen: Approval by Field Service VP", ()=>{
    cy.get('[class="cm-left-col"]').contains('Services').click()
    cy.get('[id="ApproveTask"]').eq(0).click()
    cy.wait(4000)
    cy.get('[id="Comments_Input"].s-textarea-input').eq(0).type('Approved on behalf of Pricing Analyst III.. (Automated Approval by Cypress)')
    cy.get('[data-uipath="GenericPopupForm/PopupSave"]').click()
    cy.wait(5000)
  })
      
    it("Approval Services Screen: Approval by Field Supply Chain VP", () => {
      cy.get('[id="ApproveTask"]').eq(1).click()
      cy.wait(4000)
      
      cy.get('[id="Comments_Input"].s-textarea-input').eq(0).type('Approved on behalf of Pricing Team Lead.. (Automated Approval by Cypress)')
      
      cy.get('[data-uipath="GenericPopupForm/PopupSave"]').click()
      cy.wait(5000)
    })

    it("Approvals Service Screen: Verify SLA Required Button", () => {
      //Workflow - Pricing Team Lead
      cy.get('.cell-required').eq(0).should('have.css','background-color', 'rgb(255, 247, 232)')
      cy.wait(4000)
    })


  it("Quote ready", () => {

    cy.get('[data-uipath="Quote_QuoteReady"]').click()
    cy.wait(5000)
  })

  it("Send for validation", () => {
    cy.get('[data-uipath="Quote_SendForValidation"]').click()
    cy.wait(5000)
  })

    //Update approximate address
    // it("Update approximate address before", () => {

    //   cy.get('[data-uipath="QuoteDetail/sidebar/Root/solutionslist"]').click()
    //   cy.wait(8000)
    //   cy.get('[aria-label="Part Number Filter Input"]').type('BJS450')
    //   cy.get('[data-uipath="QuantitySolutionTable"] [row-index="0"] [type="checkbox"]').eq(0).click()
    //   cy.wait(3000)
  
    //   cy.get('[data-uipath="AddressLocationLookup"] [id="gcbAddressglookup_inlinelbl"]').click()
    //   cy.wait(2000)
    //   cy.get('[id="gcbAddressglookup"] input').clear().type('134, 1st Avenue, New York, NY, 10009, United States')
    //   cy.wait(3000)
    //   cy.get('[data-uipath="AddressLocationLookup/SaveBtn"]').click()
    // })

  it("Validate approximate address", () => {
    cy.get('[data-uipath="QuoteDetail/sidebar/Root/solutionslist"]').click()
    cy.wait(8000)
   
    cy.get('[aria-label="Part Number Filter Input"]').type('BJS450')
    cy.get('[data-uipath="QuantitySolutionTable"] [row-index="0"] [type="checkbox"]').eq(0).click()
    cy.wait(3000)

    cy.get('[data-uipath="AddressLocationLookup"] [id="gcbAddressglookup_inlinelbl"]').click()
    cy.wait(2000)
    //cy.get('[id="gcbAddressglookup"] input').eq(0).clear().type('134', { delay: 50 }).wait(3000).type('{downarrow}').type('{downarrow}').focused().tab()
    //cy.wait(3000)

    //cy.get('[data-uipath="AddressLocationLookup/SaveBtn"]').click()
    //cy.wait(3000)
  })

  //saving tcv price for renewal quote flow
it("Save TCV for Renewal quote scenarios", ()=>{
  cy.get('.popup-metric').click()
  cy.get('span[class="s-numerictextbox-input"]').invoke('val').then(($TCV)=>{
    TCV = (TCV*1.43)
    cy.writeFile('cypress/fixtures/testData.json', {'TCV':$TCV})
  })
  cy.get('[data-uipath="GenericPopupForm/PopupCancel"]').click()
})

  //send for order approval 
  it("Send for order approval", () => {
    //cy.get('[data-uipath="Quote_SendForOrderApprovals"]').click()
    cy.contains("Send For Order Approval").click()
    cy.get('[id="Quote_SendForOrderApprovals"] [id="Comment_Input"].s-textarea-input').eq(0).type('Send for Order Approval)')
    cy.get('[id="Quote_SendForOrderApprovals"] [data-uipath="SubmitOperation_EntityOperation"]').click()
  })

    // it("Approval Business Operation: Approval by Field Service VP", ()=>{
    // cy.get('.lbl-Pending').contains('Pending').click()
    // cy.get('[id="ApproveTask"]').eq(0).click()
    //   cy.get('[data-uipath="GenericPopupForm/PopupSave"]').click()
    //   cy.wait(5000)
    // })

  it("Convert to Order",()=>{
    cy.contains("Convert To Order").click()
    //cy.get('[data-uipath="Quote_ConvertToOrder"]').click()
    cy.wait(9000)

  })

  it.skip("Sent to Customer", () => {

    cy.contains('Confirm Order').click()
    cy.wait(5000)
  })

  it("Confirm Order", () => {
    cy.get('[data-ui="Order_Confirm"]').click()
    cy.wait(15000)

    cy.get('body').then($body => {
      if ($body.find('[id="ReviseOrder"]').length > 0) {
        cy.get('[id="ReviseOrder"]').then($btn => {
          if ($btn.is(':visible')) {
            cy.visit(Cypress.env('ppttesturl') + '/Spa/#/customers');

          }
        })
      }
    })
  })
})
