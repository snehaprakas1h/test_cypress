/// <reference types="cypress" />

describe('My first test suite',()=>{
    beforeEach(()=>{
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');
    });
    it('My first test case',()=>{
       
        cy.get('.search-keyword').as('search');

        cy.get('@search').type('ca');
        //cy.get('.product:visible').should('have.length',4);
        cy.get('.products-wrapper .product').should('have.length',4);
        //parent child chaining
        cy.get('.products').as('products');
        cy.get('@products').find('.product').should('have.length',4);
        cy.get('@products').find('.product').each(($el)=>{
            const textveg = $el.find('h4.product-name').text();
            if(textveg.includes('Capsicum')){
                cy.wrap($el).find('button').click();
            };
        });

        cy.get('.brand.greenLogo').should('have.text','GREENKART');
        cy.get('.brand').then(function(logo){
            cy.log(logo.text()); //text is not cypress command
            cy.wrap(logo).should('have.text','GREENKART'); //resolving promise
        });

        cy.get('a.cart-icon img').click();
        //cy.get('div.cart-preview  div.action-block  button').click();
        cy.contains('proceed',{matchCase:false}).click();
        cy.contains('place order',{matchCase:false}).click();
    });
})