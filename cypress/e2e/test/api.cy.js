/// <reference types="cypress"/>

describe('my api test suite', () => {

    it('api tests', () => {

        cy.visit('https://rahulshettyacademy.com/angularAppdemo/');
        cy.intercept({
            method: 'GET',
            url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'
        }, {
            statusCode: 200,
            body: [{
                "book_name": "Learn Appium Automation with Java",
                "isbn": "Priya",
                "aisle": "895623"
            },
            {
                "book_name": "Learn Appium Automation with Java",
                "isbn": "Priya1",
                "aisle": "8956231"
            }]
        }).as('bookRetrieval');

        cy.get('.btn.btn-primary').click();
        cy.wait('@bookRetrieval').then((interception) => {
            cy.get('tr').should('have.length', interception.response.body.length + 1);
        })

        // cy.wait("@bookretrievals").then((interception) => {
        //     cy.get("tr").should("have.length", interception.response.body.length + 1); 
        //   });
        //cy.get('p').should('have.text','Oops only 1 Book available');


    });


})