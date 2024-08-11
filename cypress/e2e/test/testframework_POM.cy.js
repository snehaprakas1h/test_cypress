/// <reference types="cypress"/>
import HomePage from "./pageobjects/homepage";
import ShopPage from "./pageobjects/ShopPage";

describe("test framework test suite", () => {

    let products = ['iphone X', 'Nokia Edge', 'Blackberry'];
    const homePage = new HomePage();
    const shopPage = new ShopPage();

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
            homePage.getNameEditBox().type(data.name);
            homePage.getEmailEditBox().type(data.email);
            homePage.getGender().select(data.gender);

            homePage.getTwoWayDataBindingEditBox().should('have.value', data.name);
            homePage.getNameEditBox().should('have.attr', 'minlength', '2');
            homePage.getEmploymentStatus().should('be.disabled');
        })
    });

    it.only('e commerce website', () => {
        cy.get('@userdata').then((data) => {

            homePage.getShopTab().click();
            shopPage.getFooter().scrollIntoView();
            cy.selectMultipleProducts(data.products);
            shopPage.getCheckout().click();
            var sum = 0;
            // Get the price elements and calculate the sum
            cy.get('tr td:nth-child(4) strong').each(($el) => {
                let priceText = $el.text();
                cy.log(priceText);
                let price = Number(priceText.replace(/[^0-9]/g, '')); // Use Number to convert the cleaned text to a number
                sum += price;
            }).then(() => {
                cy.log(sum); // Log the computed sum

                // Verify the computed sum with the displayed total amount
                cy.get('h3 > strong').then((element) => {
                    let amountText = element.text();
                    cy.log(amountText); // Log the amount text for debugging
                    let total = Number(amountText.replace(/[^0-9]/g, '')); // Extract and convert the displayed total amount
                    expect(total).to.eq(sum); // Compare the computed sum with the displayed total amount
                });
            });

            // shopPage.getCartCheckout().click();
            // shopPage.getCountyDropDown().type('Ind');
            // cy.get('.suggestions ul').each(($el)=>{
            //     const place = $el.text().trim();
            //     cy.log(place);
            //     if(place===('India')){
            //         cy.wrap($el).find('a').click();
            //     }
            // });


            // shopPage.getCheckbox().click({force:true});
            // shopPage.getPurcahseBtn().click();
            // shopPage.getSuccessMessage().should('contain','Thank you! Your order will be delivered');
        })
    });

    
})
