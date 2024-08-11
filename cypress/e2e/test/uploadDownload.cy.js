/// <reference types="cypress"/>

describe('upload download test', () => {
    it('verify excel upload download test', () => {

        cy.visit('https://rahulshettyacademy.com/upload-download-test/index.html');

        //file download in cypress
        cy.get('#downloadButton').click();

        //{ filePath, sheetName, change, searchValue, newValue }
        const filePath = Cypress.config('fileServerFolder')+'\\cypress\\downloads\\download.xlsx';
        //const filePath = "C:\\Users\\sneha\\Downloads\\download.xlsx";
        const sheetName = 'Sheet1';
        const searchValue = 'Mango';
        const newValue = 380;
        const change = { rowChange: 0, colChange: 2 };
        cy.task('writeExcel', { filePath: filePath, sheetName: sheetName, change: change,
             searchValue: searchValue, newValue: newValue });

        //file upload in cypress

        cy.get('#fileinput').selectFile(filePath); //select file works when type=file attribute is present
        //.sc-jsEeTM.itluUR.rdt_TableRow #cell-4-undefined div:nth-child(1) 
        //div[`id=row-${change.rowChange}`] div[id='cell-4-undefined'] div[data-tag='allowRowEvents']
        //div[id='row-0'] div[id='cell-4-undefined'] div[data-tag='allowRowEvents']
        //div[id='row-0'] div[id='cell-4-undefined'] div[data-tag='allowRowEvents']
        cy.wait(2000);
        cy.get(`div[id='row-${change.rowChange}'] div[id='cell-4-undefined'] div[data-tag='allowRowEvents']`).should('have.text',newValue);
        
    })
})