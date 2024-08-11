/// <reference types="cypress"/>

describe('my api test suite', () => {

    it('api tests', () => {

        cy.visit('https://rahulshettyacademy.com/angularAppdemo/');
        cy.intercept('GET','https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty',req=>{
            req.url = 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shineshetty'
            req.continue((res)=>{
                expect(res.statusCode).to.eq(404);
            });
        }).as('dummyurl');

        cy.get('.btn.btn-primary').click();
        cy.wait('@dummyurl');

    });

    it.only('api tests request',()=>{
        cy.request('POST','http://216.10.245.166/Library/Addbook.php',{
            "name": "Le3a3rn Appium Automation with Java1",
            "isbn": "bc3d1",
            "aisle": "223371",
            "author": "Joh3n3 f1oe"
        })
    .then((response)=>{
        expect(response.body).to.have.property('Msg','successfully added');
        expect(response.status).to.eq(200);
    })

})
})