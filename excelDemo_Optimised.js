const ExcelJS = require('exceljs');

//https://rahulshettyacademy.com/upload-download-test/index.html

async function writeExcel(filePath, sheetName, change, searchValue, newValue) {
    const workbook = new ExcelJS.Workbook();

    try {
        // Read the Excel file
        await workbook.xlsx.readFile(filePath);
        const worksheet = workbook.getWorksheet(sheetName);
        
        // Initialize output object to store the cell position
        let output = { row: -1, column: -1 };
        readExcel(worksheet, searchValue, output);

        if (output.row !== -1 && output.column !== -1) {
            // Adjust the cell position based on the change parameter
            const cell = worksheet.getCell(output.row + change.rowChange, output.column + change.colChange);
            cell.value = newValue;
            await workbook.xlsx.writeFile(filePath);
            console.log('File updated successfully.');
        } else {
            console.log(`No cell with the value "${searchValue}" found.`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

async function readExcel(worksheet, searchValue, output) {
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, columnNumber) => {
            if (cell.value === searchValue) {
                output.row = rowNumber;
                output.column = columnNumber;
            }
        });
    });
};

// Example usage:
const filePath = "C:\\Users\\sneha\\Downloads\\download.xlsx";
const sheetName = 'Sheet1';
const searchValue = 'Mango';
const newValue = 350;
const change = { rowChange: 0, colChange: 2 };

writeExcel(filePath, sheetName, change, searchValue, newValue);
