/// <reference types="cypress"/>

describe("test framework test suite", () => {

    let products = ['iphone X','Nokia Edge','Blackberry'];

    beforeEach(() => {
        cy.visit(`${Cypress.env('url')}angularpractice/`);
    });

    before(() => {
        cy.fixture("example").then((data) => {
            cy.wrap(data).as('userdata');
        });
    })

    it('sign in for practice website', () => {
        cy.get('@userdata').then((data) => {
            cy.get(".form-group input[name='name']").type(data.name);
            cy.get(".form-group input[name='email']").type(data.email);
            cy.get('#exampleFormControlSelect1').select(data.gender);

            cy.get("h4 input[name='name']").should('have.value', data.name);
            cy.get(".form-group input[name='name']").should('have.attr', 'minlength', '2');
            cy.get('#inlineRadio3').should('be.disabled');
        })
    });

    it.only('e commerce website', () => {
        cy.get('@userdata').then((data) => {
        cy.get("a[href*='shop']").click();
        cy.get('.py-5.bg-dark').scrollIntoView();
        cy.selectMultipleProducts(data.products);
        })
    })
})
