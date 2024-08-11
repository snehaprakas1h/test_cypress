///<reference types="cypress"/>

describe('calendar', () => {
    beforeEach(() => {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/offers');
    });

    it('to select date from calendar component', () => {
        const monthNumber = '6';
        const dateNumber = '27';
        const yearNumber = '2027';
        const expectedList = [monthNumber,dateNumber,yearNumber];
        cy.get('.react-date-picker__inputGroup').click();
        cy.get('.react-calendar__navigation__label').click();
        cy.get('.react-calendar__navigation__label').click();
        cy.contains('button',yearNumber).then((year)=>{
            cy.wrap(year).click();
        });

        cy.get('.react-calendar__tile.react-calendar__year-view__months__month').eq(monthNumber-1).click();
        cy.contains("abbr", new RegExp(`^${dateNumber}$`)).click();

        cy.get('.react-date-picker__inputGroup__input').each(($el,index)=>{
            cy.wrap($el).invoke('val').should('eq',expectedList[index]);
        })

    })
})