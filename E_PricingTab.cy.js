import 'cypress-wait-until';
import 'cypress-file-upload';
import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
import SolutionImport from "../../2.QuoteAPE/SolutionImport/SolutionImport.PageObjects";
import Solutions from "../../2.QuoteAPE/Solutions/Solutions.PageObjects";
import QuickCreateQuote from "../../2.QuoteAPE/CreateQuote/QuickCreateQuote.PageObjects"
import CommonHelperElements from "../../../support/Helpers/CommonHelper.Elements"
import CommonHelper from "../../../support/Helpers/CommonHelper"
import Pricing from '../../2.QuoteAPE/QuoteVerifications/Pricing/Pricing.PageObjects';
import Discounts from "../../2.QuoteAPE/Discounts/Discounts.PageObjects";
//change
//import '../../../support/commands'
const helper = new CommonHelper()
const ehelper = new CommonHelperElements()
const price = new Pricing()
const disc = new Discounts()
const path = require('path')

// beforeEach(() => {
//   cy.restoreLocalStorage();
//   Cypress.Cookies.preserveOnce('OidcAuth');
// });

// afterEach(() => {
//   cy.saveLocalStorage();
// });

// before(() => {
//   cy.clearCookies()
//   cy.clearLocalStorageSnapshot();
//   cy.clearLocalStorage()
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

describe("Verify pricing tab", () => {

  it.skip("Verify costs and prices of Default", () => {
    

    cy.get('[data-uipath="QuoteDetail/sidebar/Root/pricing"]').click()
   

    // cy.get('#txtorganizationSearch_Input').type('AMD OS2380WAL4DGI')
    
    price.getPricingGroupTree().contains('Default').click()
  
    //cy.get('[data-uipath="QuotesPricing/PricingGroupsTreeUIKey"]').contains('Default').click()

    //price.getRecurringUnitCost(1, '$3.90')
    //price.getRecurringTotalCost(1, '$3.90')
    price.getRecurringUnitListPrice(2, '$5.60')
    price.getRecurringUnitPrice(2, '$4.90')
    price.getRecurringUnitAdjustedPrice(2, '$4.90')
    price.getRecurringTotalAdjustedPrice(2, '$4.90')
    price.getRecurringDiscountPercent(2, '0')
    price.getRecurringListDiscountPercent(2, '12.50 %')
    //price.getRecurringMarginPercent(1, '20.41 %')

    //price.getRecurringUnitCost(2, '$4.00')
    //price.getRecurringTotalCost(2, '$12.00')
    price.getRecurringUnitListPrice(3, '4.50')
    price.getRecurringUnitPrice(3, '$4.50')
    price.getRecurringUnitAdjustedPrice(3, '$4.50')
    price.getRecurringTotalAdjustedPrice(3, '$13.50')
    price.getRecurringDiscountPercent(3, '0')
    price.getRecurringListDiscountPercent(3, '0')
    //price.getRecurringMarginPercent(2, '11.11 %')
    /*cy.get('[col-id="ColumnData.RecurringUnitCost"] [row-index="1"]').should('contain.text', '$145.83')
    cy.get('[col-id="ColumnData.RecurringTotalCost"] [row-index="1"]').should('contain.text', '$145.83')
    cy.get('[col-id="ColumnData.RecurringUnitPrice"] [row-index="1"]').should('contain.text', '$291.67')
    cy.get('[col-id="ColumnData.RecurringUnitAdjustedPrice"] [row-index="1"]').should('contain.text', '$300.00')
    cy.get('[col-id="ColumnData.RecurringTotalAdjustedPrice"] [row-index="1"]').should('contain.text', '$300.00')

    cy.get('[col-id="ColumnData.RecurringUnitCost"] [row-index="3"]').should('contain.text', '$187.50')
    cy.get('[col-id="ColumnData.RecurringTotalCost"] [row-index="3"]').should('contain.text', '$187.50')
    cy.get('[col-id="ColumnData.RecurringUnitPrice"] [row-index="3"]').should('contain.text', '$375.00')
    cy.get('[col-id="ColumnData.RecurringUnitAdjustedPrice"] [row-index="3"]').should('contain.text', '$375.00')
    cy.get('[col-id="ColumnData.RecurringTotalAdjustedPrice"] [row-index="3"]').should('contain.text', '$375.00')
    */
  })

  it.skip("Verify costs and prices of AMD OS2380WAL4DGI", () => {

    cy.get('[data-uipath="QuotesPricing/SearchTextBox"] input').type('Canon 9842A002AA')
    

    price.getPricingGroupTree().contains('Canon 9842A002AA').click()
    

    //price.getRecurringUnitCost(1, '$145.83')
    //price.getRecurringTotalCost(1, '$145.83')
    price.getRecurringUnitListPrice(1, '$177.67')
    price.getRecurringUnitPrice(1, '$131.65')
    price.getRecurringUnitAdjustedPrice(1, '$112.25')
    price.getRecurringTotalAdjustedPrice(1, '$112.25')
    price.getRecurringDiscountPercent(1, '14.74 %')
    price.getRecurringListDiscountPercent(1, '36.82 %')
    //price.getRecurringMarginPercent(1, '51.39 %')

    //price.getRecurringUnitCost(2, '$187.50')
    //price.getRecurringTotalCost(2, '$187.50')
    price.getRecurringUnitListPrice(2, '$90.30')
    price.getRecurringUnitPrice(2, '$66.91')
    price.getRecurringUnitAdjustedPrice(2, '$66.91')
    price.getRecurringTotalAdjustedPrice(2, '$66.91')
    price.getRecurringDiscountPercent(2, '0')
    price.getRecurringListDiscountPercent(2, '25.90 %')
    //price.getRecurringMarginPercent(2, '62.87 %')
  })

  it.skip("Verify costs and prices of US", () => {

    //  cy.get('[data-uipath="QuoteDetail/sidebar/Root/pricing"]').click()

    cy.get('[data-uipath="QuotesPricing/PricingGroupsTreeUIKey"]').contains('United States').click()

    //price.getRecurringUnitCost(1, '$104.17')
    //price.getRecurringTotalCost(1, '$312.51')
    price.getRecurringUnitListPrice(1, '$84.61')
    price.getRecurringUnitPrice(1, '$62.69')
    price.getRecurringUnitAdjustedPrice(1, '$50.00')
    price.getRecurringTotalAdjustedPrice(1, '$150.00')
    price.getRecurringDiscountPercent(1, '20.24 %')
    price.getRecurringListDiscountPercent(1, '40.90 %')
    //price.getRecurringMarginPercent(1, '47.92 %')

    //price.getRecurringUnitCost(2, '$312.50')
    //price.getRecurringTotalCost(2, '$312.50')
    price.getRecurringUnitListPrice(2, '$84.39')
    price.getRecurringUnitPrice(2, '$62.53')
    price.getRecurringUnitAdjustedPrice(2, '$62.53')
    price.getRecurringTotalAdjustedPrice(2, '$62.53')
    price.getRecurringDiscountPercent(2, '0')
    price.getRecurringListDiscountPercent(2, '25.90 %')
    //price.getRecurringMarginPercent(2, '70.01 %')

    //price.getRecurringUnitCost(3, '$354.17')
    //price.getRecurringTotalCost(3, '$1,062.51')
    price.getRecurringUnitListPrice(6, '$17.33')
    price.getRecurringUnitPrice(6, '$6.37')
    price.getRecurringUnitAdjustedPrice(6, '$5.50')
    price.getRecurringTotalAdjustedPrice(6, '$16.50')
    price.getRecurringDiscountPercent(6, '13.66 %')
    price.getRecurringListDiscountPercent(6, '68.27 %')
    //price.getRecurringMarginPercent(3, '70.01 %')

    //price.getRecurringUnitCost(4, '$437.50')
    //price.getRecurringTotalCost(4, '$437.50')
    price.getRecurringUnitListPrice(11, '$101.62')
    price.getRecurringUnitPrice(11, '$75.30')
    price.getRecurringUnitAdjustedPrice(11, '$100.00')
    price.getRecurringTotalAdjustedPrice(11, '$100.00')
    price.getRecurringDiscountPercent(11, '-32.80 %')
    price.getRecurringListDiscountPercent(11, '1.59 %')
    //price.getRecurringMarginPercent(4, '70.01 %')

    /*    cy.get('[col-id="ag-Grid-AutoColumn"] [row-index="0"]').should('contain.text', 'Sev Level-7x24(3)')
        cy.get('[col-id="ag-Grid-AutoColumn"] [row-index="4"]').should('contain.text', 'Sev Level-Labor RTS(3)')
    
        cy.get('[col-id="ColumnData.RecurringUnitCost"] [row-index="1"]').should('contain.text', '$145.83')
        cy.get('[col-id="ColumnData.RecurringTotalCost"] [row-index="1"]').should('contain.text', '$145.83')
        cy.get('[col-id="ColumnData.RecurringUnitPrice"] [row-index="1"]').should('contain.text', '$291.67')
        cy.get('[col-id="ColumnData.RecurringUnitAdjustedPrice"] [row-index="1"]').should('contain.text', '$300.00')
        cy.get('[col-id="ColumnData.RecurringTotalAdjustedPrice"] [row-index="1"]').should('contain.text', '$300.00')
    
        cy.get('[col-id="ColumnData.RecurringUnitCost"] [row-index="2"]').should('contain.text', '$187.50')
        cy.get('[col-id="ColumnData.RecurringTotalCost"] [row-index="2"]').should('contain.text', '$187.50')
        cy.get('[col-id="ColumnData.RecurringUnitPrice"] [row-index="2"]').should('contain.text', '$375.00')
        cy.get('[col-id="ColumnData.RecurringUnitAdjustedPrice"] [row-index="2"]').should('contain.text', '$375.00')
        cy.get('[col-id="ColumnData.RecurringTotalAdjustedPrice"] [row-index="2"]').should('contain.text', '$375.00')
    
        cy.get('[col-id="ColumnData.RecurringUnitCost"] [row-index="3"]').should('contain.text', '$187.50')
        cy.get('[col-id="ColumnData.RecurringTotalCost"] [row-index="3"]').should('contain.text', '$187.50')
        cy.get('[col-id="ColumnData.RecurringUnitPrice"] [row-index="3"]').should('contain.text', '$375.00')
        cy.get('[col-id="ColumnData.RecurringUnitAdjustedPrice"] [row-index="3"]').should('contain.text', '$375.00')
        cy.get('[col-id="ColumnData.RecurringTotalAdjustedPrice"] [row-index="3"]').should('contain.text', '$375.00')
    
    
        cy.get('[col-id="ColumnData.RecurringUnitCost"] [row-index="5"]').should('contain.text', '$145.83')
        cy.get('[col-id="ColumnData.RecurringTotalCost"] [row-index="5"]').should('contain.text', '$145.83')
        cy.get('[col-id="ColumnData.RecurringUnitPrice"] [row-index="5"]').should('contain.text', '$291.67')
        cy.get('[col-id="ColumnData.RecurringUnitAdjustedPrice"] [row-index="5"]').should('contain.text', '$300.00')
        cy.get('[col-id="ColumnData.RecurringTotalAdjustedPrice"] [row-index="5"]').should('contain.text', '$300.00')
    
        cy.get('[col-id="ColumnData.RecurringUnitCost"] [row-index="6"]').should('contain.text', '$187.50')
        cy.get('[col-id="ColumnData.RecurringTotalCost"] [row-index="6"]').should('contain.text', '$187.50')
        cy.get('[col-id="ColumnData.RecurringUnitPrice"] [row-index="6"]').should('contain.text', '$375.00')
        cy.get('[col-id="ColumnData.RecurringUnitAdjustedPrice"] [row-index="6"]').should('contain.text', '$375.00')
        cy.get('[col-id="ColumnData.RecurringTotalAdjustedPrice"] [row-index="6"]').should('contain.text', '$375.00')
    
        cy.get('[col-id="ColumnData.RecurringUnitCost"] [row-index="7"]').should('contain.text', '$187.50')
        cy.get('[col-id="ColumnData.RecurringTotalCost"] [row-index="7"]').should('contain.text', '$187.50')
        cy.get('[col-id="ColumnData.RecurringUnitPrice"] [row-index="7"]').should('contain.text', '$375.00')
        cy.get('[col-id="ColumnData.RecurringUnitAdjustedPrice"] [row-index="7"]').should('contain.text', '$375.00')
        cy.get('[col-id="ColumnData.RecurringTotalAdjustedPrice"] [row-index="7"]').should('contain.text', '$375.00')
        */
  })

  it("Apply discount on additional services - Default pricing group", () => {

    cy.get('[data-uipath="QuoteDetail/sidebar/Root/pricing"]').should('be.visible').click()
    

    disc.getDiscountButton().click();
    
    // insert values in discount
    // disc.getOneTimeDiscountValue().first().type("0");

    disc.getRecurringDiscountValue().first().should('be.visible');
    // Click on apply button
    disc.getApplyButton().click();
    
  })
  it("Validate that Average MRR and TCV values got updated after discount ", () => {
    
    cy.get(':nth-child(1) > .qtotalLabel').click()
    cy.CheckLogin()
    
    cy.get('.k-formatted-value').should('be.visible')
    cy.get('[data-uipath="GenericPopupForm/PopupCancel"]').click()
  })

  it("Apply discount from the grid - US Pricing Group", () => {

    cy.get('[data-uipath="QuotesPricing/PricingGroupsTreeUIKey"]').contains('United States').should('be.visible').click()

    //    cy.get('[data-uipath="QuoteDetail/sidebar/Root/pricing"]').click()
    

    cy.get('.ag-center-cols-viewport').scrollTo('right')
   
    cy.get('[row-index="1"] > [aria-colindex="13"]').click().dblclick().type('10').type('{enter}');

    cy.get('[row-index="2"] > [aria-colindex="13"]').click().dblclick().type('10').type('{enter}');
    
    cy.get('[row-index="5"] > [aria-colindex="13"]').click().dblclick().type('10').type('{enter}');
    

    cy.get('[row-index="6"] > [aria-colindex="13"]').click().dblclick().type('10').type('{enter}');
   
    cy.get('[row-index="7"] > [aria-colindex="13"]').click().dblclick().type('10').type('{enter}');
    
    
    cy.get('[row-index="12"] > [aria-colindex="13"]').click().dblclick().type('25').type('{enter}');
    
    cy.get('[row-index="13"] > [aria-colindex="13"]').click().dblclick().type('25').type('{enter}');
    
  })


})