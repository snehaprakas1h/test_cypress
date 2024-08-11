class ShopPage{

    getFooter(){
        return cy.get('.py-5.bg-dark');
    }

    getCheckout(){
        return cy.get('.nav-link.btn.btn-primary');
    }

    getCartCheckout(){
        return cy.get('.btn.btn-success');
    }

    getCountyDropDown(){
        return cy.get('#country');
    }

    getCheckbox(){
        return cy.get('.checkbox.checkbox-primary input');
    }

    getPurcahseBtn(){
        return cy.get('.ng-untouched > .btn');
    }

    getSuccessMessage(){
        return cy.get('.alert');
    }

    
}
export default ShopPage;