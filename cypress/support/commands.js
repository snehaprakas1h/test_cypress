// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('selectMultipleProducts', (products) => {
    cy.get('h4.card-title').each(($el) => {
        // if($el.text().includes('Blackberry')){
        //     cy.get('button.btn.btn-info').eq(index).click();
        // }
        let productName = $el.text().trim();
        if (products.includes(productName)) {
            cy.wrap($el).parent().parent().find('button.btn.btn-info').click();
        }
    })
});

Cypress.Commands.add('loginAPI', () => {
    cy.request('POST', 'https://rahulshettyacademy.com/api/ecom/auth/login',
         { "userEmail": "testnarnia1@gmail.com", "userPassword": "Test@123" })
         .then((response)=>{
            expect(response.status).to.eq(200);
            Cypress.env('token',response.body.token);
         })

})