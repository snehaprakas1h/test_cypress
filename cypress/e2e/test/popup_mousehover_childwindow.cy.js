/// <reference types="cypress"/>
import 'cypress-iframe'

describe('alerts, popups and child windows', () => {
    beforeEach(() => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
    });

    it('popup', () => {
        cy.get('#alertbtn').click();
        cy.get("[value='Confirm']").click();
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Hello , share this practice page and share your knowledge');
        });
        cy.on('window:confirm', (str) => {
            expect(str).to.equal('Hello , Are you sure you want to confirm?');
        })
    });

    it('child tabs and windows', () => {
        cy.get('#opentab').invoke('removeAttr', 'target').click();

        cy.origin('https://www.qaclickacademy.com', () => {
            cy.get("#navbarSupportedContent a[href*='about']").click();
            cy.get('.section-title.mt-50 h2').should('contain', 'Welcome');
        });
    });

    it('webtable and data handling', () => {
        {
            cy.get('.left-align #product tr').each(($el) => {
                let courseTitle = $el.text();
                if (courseTitle.includes("Python Language")) {
                    cy.wrap($el).find('td').last().then(price => {
                        let price1 = price.text();
                        expect(price1).to.equal('25');
                    })
                }
            })
        }
    });

    it('mouse hover', () => {
        cy.get('.mouse-hover-content').invoke('show');
        cy.contains('Top').click();
        cy.url().should('include', 'top');
    });

    it('child tab', () => {
        cy.get('#opentab').then(($el) => {
            const url = $el.prop('href');
            cy.visit(url)
            cy.origin(url, () => {
                cy.get("#navbarSupportedContent a[href*='about']").click();
            })
        })
    });

    it.only('frames',()=>{
        cy.frameLoaded('#courses-iframe');
        cy.iframe().find('a[href*="mentorship"]').eq(0).click();
        cy.wait(3000);
        cy.iframe().find("h1[class*='pricing-title']").should('have.length',2);
    })
})