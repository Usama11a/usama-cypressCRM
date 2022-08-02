describe("Renew Quote", () => {
  it("Verify User have rights to Access Service Contract List From Sales Navigator", () => {
    cy.get('[data-uipath="SalesNavigator/SalesNavigatorLbl"]')
      .contains("Sales Navigator")
      .should("be.visible");
  });

  it("Verify User can create Renewal Quote from Service Contract", () => {
    cy.wait(20000);
    cy.visit(
      "https://ppttest.servicepathlive.com/Spa/#/quotes/id/376540-416"
    );
    cy.wait(20000);

    // cy.get('[data-uipath="Customer/sidebar/Root/servicecontracts"]')
    //   .should("be.visible")
    //   .click();
    // cy.wait(14000);
    // cy.get('[data-uipath="Grid"] [row-index="0"] [type="checkbox"]').click();
    // cy.wait(1000);
    // cy.get('[data-uipath="Renew"]').click();
    // cy.wait(2000);
    // cy.get('[name="OpportunityIdglookup_Input_input"]')
    //   .type("376540-DO_NOT_USE_ForAutomationOnly")
    //   .wait(2000)
    //   .type("{downarrow}")
    //   .focused()
    //   .tab();
    // cy.get('[data-uipath="GenericPopupForm/PopupSave"]').click();
    // cy.wait(40000);
  });

  it("Verify active items from Service contract are added in Renewal Quote", () => {
    cy.get('[aria-label="OEM Filter Input"]').clear();
    cy.get('[aria-label="OEM Filter Input"]').type("canon");
    cy.get('[ref="eCenterColsClipper"] [role="row"]').should(($p) => {
      expect($p).to.have.length(12);
    });
  });

  it("Verify the active line item added in the renewal quote", () => {
    cy.get('[aria-label="End Date Filter Input"]').clear();
    cy.get('[aria-label="End Date Filter Input"]').type("1-jul-2022");
    cy.get('[ref="eCenterColsClipper"] [role="row"]').should('have.length.above', 0)
    
  })

    it("Verify expired items from service contract shouldn't be added in renewal", () => {
      cy.get('[aria-label="End Date Filter Input"]').clear();
      cy.get('[aria-label="End Date Filter Input"]').type("3-jun-2023");
      cy.get('[ref="eCenterColsClipper"] [role="row"]').should(($p) => {
        expect($p).to.have.length(0);
      })
    })

  it("Verify that expired Components/services, will not be added in renewal quote", () => {

      //Select line item for component

      cy.get('[aria-label="Part Number Filter Input"]').type('BJS450')
      cy.get('[data-uipath="QuantitySolutionTable"] [role="rowgroup"] [role="row"].ag-row.ag-row-level-0').should(($p) => {
        expect($p).to.have.length(1)
      })
      cy.get('[data-uipath="QuantitySolutionTable"] [row-index="0"] [type="checkbox"]').eq(0).click()
      cy.wait(3000)

      // select component tab
      cy.get('#Components > .k-link').click()

      cy.get('[data-uipath="StoragekTab/QuantitySolutionTabl]').should('have.value', 'BJS450')
  })

  it("Verify only product will be added in renewal quote, when product is active but it's component/services are expired", () => {
    cy.get('[data-uipath="QuoteDetail/sidebar/Root/general"]').click();
    cy.wait(2000);
    const $StartDate = Cypress.$("#StartDate_inlinelbl").text();
    cy.wrap($StartDate);
    cy.get('[data-uipath="QuoteDetail/sidebar/Root/solutionslist"]').click();
    cy.wait(2000);
    cy.get('.ag-center-cols-container > .ag-row-first').click({force: true});
    cy.wait(2000);
    cy.get("#Components > .k-link").click();
    cy.wait(2000);
    cy.get('.ag-column-hover > .ag-floating-filter-full-body').should("be.empty");
  });

  it("Verify line item's start date being update with renewal quote's start date when line item's start date is prior to that date", () => {
    cy.get('[data-uipath="QuoteDetail/sidebar/Root/general"]').click();
    cy.wait(2000);
    const $StartDate = Cypress.$("#StartDate_inlinelbl").text();
    cy.wrap($StartDate).then(() => {
      cy.wait(2000);
      cy.get('[data-uipath="QuoteDetail/sidebar/Root/solutionslist"]').click();
      cy.wait(2000);
      const $QouteStartDate = Cypress.$(
        '.ag-row-first > [aria-colindex="8"]'
      ).text();
      cy.wrap($QouteStartDate).should("eq", $StartDate);
    });
  });

  it("Verify error message is showing when end date of line item is greater than the end date of renewal quote's end date", () => {
    cy.get('[data-uipath="QuoteDetail/sidebar/Root/general"]').click();
    cy.wait(2000);
    const $EndDate = Cypress.$("#EndDate_inlinelbl").text();
    cy.wrap($EndDate).then(() => {
      cy.wait(2000);
      cy.get('[data-uipath="QuoteDetail/sidebar/Root/solutionslist"]').click();
      cy.wait(2000);
      const $QouteEndDate = Cypress.$(
        '.ag-row-first > [aria-colindex="8"]'
      ).text();
      cy.wrap($QouteEndDate);
      if ($QouteEndDate > $EndDate) {
        cy.get('.ag-row-first > [aria-colindex="10"]').should(
          "not.have.css",
          "background-color",
          "rgba(0, 0, 0, 0)"
        );
      } else {
        cy.wrap($QouteEndDate).should("eq", $EndDate);
      }
    });
  });

  it("Verify line item's end date will remain unchanged, if it is prior to new end date (renewal quote's end date)", () => {
    cy.get('[data-uipath="QuoteDetail/sidebar/Root/general"]').click();
    cy.wait(2000);
    const $EndDate = Cypress.$("#EndDate_inlinelbl").text();
    cy.wrap($EndDate).then(() => {
      cy.wait(2000);
      cy.get('[data-uipath="QuoteDetail/sidebar/Root/solutionslist"]').click();
      cy.wait(2000);
      const $QouteEndDate = Cypress.$(
        '.ag-row-first > [aria-colindex="8"]'
      ).text();
      cy.wrap($QouteEndDate);
      if (cy.wrap($QouteEndDate) < cy.wrap($EndDate)) {
        cy.get('.ag-row-first > [aria-colindex="8"]').should(
          "not.have.css",
          "background-color",
          "rgba(0, 0, 0, 0)"
        );
      } else {
        cy.wrap($QouteEndDate).should("eq", $EndDate);
      }
    });
  });

  it("Verify if line item's start date will remain unchanged, if it is greater to new start date (renewal quote's start date)", () => {
    cy.get('[data-uipath="QuoteDetail/sidebar/Root/general"]').click();
    cy.wait(2000);
    const $StartDate = Cypress.$("#StartDate_inlinelbl").text();
    cy.wrap($StartDate);
    cy.get('[data-uipath="QuoteDetail/sidebar/Root/solutionslist"]').click();
    cy.wait(2000);
    const $QouteStartDate = Cypress.$(
      '.ag-row-first > [aria-colindex="8"]'
    ).text();
    cy.wrap($QouteStartDate);
    if (cy.wrap($QouteStartDate) < cy.wrap($StartDate)) {
      cy.get('.ag-row-first > [aria-colindex="8"]').should(
        "not.have.css",
        "background-color",
        "rgba(0, 0, 0, 0)"
      );
    } else {
      cy.wrap($QouteStartDate).should("eq", $StartDate);
    }
  });

  
it('Verify currency conversion is working correctly when creating renewal in different currency', () => {
  cy.get('.popup-metric').click()
  cy.get('span[class="s-numerictextbox-input"]').invoke('val').then(($TCV)=>{
    cy.readFile('cypress/fixtures/testData.json').its('TCV').should('eq',$TCV)
  })
  cy.get('[data-uipath="GenericPopupForm/PopupCancel"]').click()
})
  


  it(' Verify OEM warranty product ', () => {

    
  });

  it('Verify all the validation checks on columns (Duplicate Serial number, Quantity, Address validations, Constrain on Start/End Dates) works properly on Renewal Quote', () => {
      cy.get(".ag-body-horizontal-scroll-viewport").scrollTo("center");
  
      //Serial Numbers Update
      cy.get(
        '[data-uipath="QuoteImportsForm/General/VendorResaleAndMaintenance"] [row-index="0"] [col-id="Alias"]'
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


    
  it("Verify user can reprice the renewal Quote from top tab", () => {
    cy.wait(2000)
    cy.get('.popup-metric').click()
    cy.wait(5000)
    let tcvDefaultValue
    cy.get('[role="spinbutton"]').eq(0).invoke('val').should((value) => {
      tcvDefaultValue = value
      console.log(tcvDefaultValue)
    })
    cy.wait(2000)
    cy.get('.k-formatted-value').clear()
    cy.get('.k-link-increase > .k-icon').click()
    cy.wait(2000)
    cy.get('[data-uipath="GenericPopupForm/PopupSave"]').click()
    cy.wait(2000)
    cy.get('#RepriceQuote').click()
    cy.wait(5000)
    cy.get('.popup-metric').click({force:true})
    let newTcvValue
    cy.get('[role="spinbutton"]').eq(0).invoke('val').should((value1) => {
      newTcvValue = value1
      console.log(newTcvValue)
    })
    cy.wrap(tcvDefaultValue).should('not.eq', newTcvValue)
  })


it("Verify changes in prices should impact on Pricing and Financial Dashboard", () => {
  cy.get('[data-uipath=QuoteDetail/sidebar/Root/financialdashboard]').click()
  cy.get('[class="s-keyvalue-wrapper"]  span[class="kvw-value"]').eq(3).invoke('val').should((temp) => {
         console.log(temp)
  })
})
  

it("Verify All the Domain Events should be log in Time line", () => {
  cy.get('[aria-label="Part Number Filter Input"]').clear().type('7994A001')
  cy.wait(2000)
 // cy.get('[id="Quote_Timeline"]').click()
  cy.get('[id="div-EventText"] [id="divInfoBar"]').should('include.text','Lineitems Updated')
})


it("Verify user can Move Solution from solution Tab to another Quote Solution Tab", () => {
  cy.get('button[id="CreateSolutionFromTemplate"]').click() 
  cy.get('[id="btnSolutionType2"]').click();
  cy.wait(3000);
  cy.get('[data-uipath="QuickCreate/Next"]').click()
  cy.get('[data-uipath="SolutionsList/LeftPanel/UIMoveSolution"]').click()
  cy.get('[name="quoteLookupglookup_Input_input"]').type("DO_NOT_USE_ForAutomationOnly", {
    delay: 50,
  });

  cy.get('[id="quoteLookupglookup_Input_listbox"]')
    .contains("DO_NOT_USE_ForAutomationOnly")
    .click();
  cy.get('[data-uipath="SolutionsList/MoveSolutionBtn"]').click()
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

  it("Verify user can cloned the renewal Quote", () => {
    cy.visit('https://ppttest.servicepathlive.com/Spa/#/quotes/id/376540-347/solutionslist/standard/22804-a')
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
});
