const ExcelJs = require('exceljs');

//https://rahulshettyacademy.com/upload-download-test/index.html

// 1. read the file
// 2. open the workbook
// 3. navigate to the sheet with valid data
// 4. print each and every value in the worksheet

// Create a new workbook instance
// const workbook = new ExcelJs.Workbook();
// let output = {row:-1,column:-1};

// // Read the Excel file
// workbook.xlsx.readFile("C:\\Users\\sneha\\Downloads\\download.xlsx").then(() => {
//     // Get the worksheet by name
//     const worksheet = workbook.getWorksheet('Sheet1');

//     // Iterate through each row and cell to find the value 'Apple'
//     worksheet.eachRow((row, rowNumber) => {
//         row.eachCell((cell, columnNumber) => {
//             if (cell.value === 'Banana') {
//                 output.row = rowNumber;
//                 console.log('Row:', rowNumber);
//                 output.column = columnNumber;
//                 console.log('Column:', columnNumber);
//             }
//         });
//     });

//     // Update the value of a specific cell
//     const cell = worksheet.getCell(output.row, output.column);
//     cell.value = 'Republic';

//     // Write the updated file back to disk
//     return workbook.xlsx.writeFile("C:\\Users\\sneha\\Downloads\\download.xlsx");
// }).then(() => {
//     console.log('File updated successfully.');
// }).catch((error) => {
//     console.error('Error:', error);
// });

async function excelTest(filePath, sheetName, searchValue, newValue) {
    let output = { row: -1, column: -1 };
    const workbook = new ExcelJs.Workbook();
    
    try {
        await workbook.xlsx.readFile(filePath);
        const worksheet = workbook.getWorksheet(sheetName);
        
        worksheet.eachRow((row, rowNumber) => {
            row.eachCell((cell, columnNumber) => {
                if (cell.value === searchValue) {
                    output.row = rowNumber;
                    output.column = columnNumber;
                }
            });
        });

        if (output.row !== -1 && output.column !== -1) {
            const cell = worksheet.getCell(output.row, output.column);
            cell.value = newValue;
            await workbook.xlsx.writeFile(filePath);
            console.log('File updated successfully.');
        } else {
            console.log(`No cell with the value "${searchValue}" found.`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Example usage:
const filePath = "C:\\Users\\sneha\\Downloads\\download.xlsx";
const sheetName = 'Sheet1';
const searchValue = 'Mango';
const newValue = 'banalala';

excelTest(filePath, sheetName, searchValue, newValue);