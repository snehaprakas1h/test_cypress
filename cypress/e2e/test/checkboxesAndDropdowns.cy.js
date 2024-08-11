/// <reference types="cypress"/>

describe('automate check boxes and dropdowns', () => {

    beforeEach(() => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
    });

    it('checkboxes example', () => {
        cy.get('#checkBoxOption1').check();
        cy.get('#checkBoxOption1').should('be.checked').and('have.value', 'option1');
        cy.get('#checkBoxOption1').uncheck().should('not.be.checked');
        cy.get("input[type='checkbox']").check(['option1', 'option2']);
    });

    it('static dropdown', () => {
        cy.get('#dropdown-class-example').select('option1').should('have.value','option1');
    });

    it('dynamic dropdown',()=>{
        cy.get('#autocomplete').type('ind');
        cy.get('.ui-menu-item-wrapper').each(($el)=>{
            const actualPlace = $el.text();
            if(actualPlace===("India")){
                cy.wrap($el).click();
            }
        });
        cy.get('#autocomplete').should('have.value','India');
    });

    it('visibility of elements',()=>{
        cy.get('#displayed-text').should('be.visible');
        cy.get('#hide-textbox').click();
        cy.get('#displayed-text').should('not.be.visible');
        cy.get('#show-textbox').click();
        cy.get('#displayed-text').should('be.visible');
    });

    it.only('radiobuttons',()=>{
        cy.get('[value="radio2"]').check().should('be.checked');
    })

    

});