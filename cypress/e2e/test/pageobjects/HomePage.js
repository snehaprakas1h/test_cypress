class HomePage{

    getNameEditBox(){
        return cy.get(".form-group input[name='name']");
    }

    getEmailEditBox(){
        return cy.get(".form-group input[name='email']")
    }

    getTwoWayDataBindingEditBox(){
        return cy.get("h4 input[name='name']");
    }

    getEmploymentStatus(){
        return cy.get('#inlineRadio3');
    }

    getGender(){
        return cy.get('#exampleFormControlSelect1');
    }

    getShopTab(){
        return cy.get("a[href*='shop']");
    }

}
export default HomePage;