/// <reference types="cypress"/>

import { default as neatCsv } from "neat-csv";

describe('my api jwt token suite', () => {

    it('token test', () => {
        let productName;
        let orderNumber;
        cy.loginAPI().then( () =>{
            cy.visit('https://rahulshettyacademy.com/client/', {
                onBeforeLoad: function (window) {
                    window.localStorage.setItem('token', Cypress.env('token'));
                }
            })
        })
        cy.get(".card-body b").first().then((text)=>{
            productName= text.text();
            cy.log(productName);
        })
        cy.get(".card-body [class*='fa-shopping-cart']").first().click();
        cy.get("[routerlink*='/cart']").click();
        cy.get(".wrap.cf .totalRow").last().click();
        cy.get('.form-group > .input').type('Ind');
        cy.get('.ta-results button').each(($el) => {
            const actualPlace = $el.text();
            if (actualPlace === (' India')) {
                cy.wrap($el).click();
            }
        })

        cy.get('.actions  a').click();
        cy.wait(2000);
        cy.get(".order-summary button").first().click();

        cy.get('.em-spacer-1 .ng-star-inserted').then((orderNo)=>{
            orderNumber = orderNo.text().split(" ")[2];
            cy.log(orderNumber);
        })

        const filePath = Cypress.config('fileServerFolder')+'\\cypress\\downloads\\order-invoice_testnarnia1.csv';

        cy.readFile(filePath).then(async(text)=>{
            const csv = await neatCsv(text);
            console.log(csv);
            cy.log(csv[0]['Product Name']);
            if(csv[0]['Product Name']===productName){
                expect(true).to.be.true;
            }

            expect(csv[0]['Invoice Number']).to.be.eq(orderNumber);
        })

        cy.readFile(filePath).then((text)=>{
            expect(text).to.include(productName);
        })

    })
});