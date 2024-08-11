import { When, Given, Then } from "@badeball/cypress-cucumber-preprocessor";

let products = ['iphone X', 'Nokia Edge', 'Blackberry'];
const homePage = new HomePage();
const shopPage = new ShopPage();

Given('I open ecommerce page', () => {
    cy.visit(`${Cypress.env('url')}angularpractice/`);
})

When('I add items to cart', () => {
    homePage.getShopTab().click();
    shopPage.getFooter().scrollIntoView();
    cy.selectMultipleProducts(data.products);
    shopPage.getCheckout().click();
});

When('validate the total prices', () => {
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
})

Then('select the country submit and verify thankyou message', () => {
    shopPage.getCartCheckout().click();
    shopPage.getCountyDropDown().type('Ind');
    cy.get('.suggestions ul').each(($el) => {
        const place = $el.text().trim();
        cy.log(place);
        if (place === ('India')) {
            cy.wrap($el).find('a').click();
        }
    });


    shopPage.getCheckbox().click({ force: true });
    shopPage.getPurcahseBtn().click();
    shopPage.getSuccessMessage().should('contain', 'Thank you! Your order will be delivered');
});

When('I fill form details', () => {
    homePage.getNameEditBox().type(data.name);
    homePage.getEmailEditBox().type(data.email);
    homePage.getGender().select(data.gender);
});


Then('validate the forms behaviour', () => {
    homePage.getTwoWayDataBindingEditBox().should('have.value', data.name);
    homePage.getNameEditBox().should('have.attr', 'minlength', '2');
    homePage.getEmploymentStatus().should('be.disabled');
});

Then('I select the shop page',()=>{
    homePage.getShopTab().click();
})