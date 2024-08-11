const { defineConfig } = require("cypress");
const fs = require('fs');
const ExcelJS = require('exceljs');
const excelToJson = require("convert-excel-to-json");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  preprocessor,
} = require("@badeball/cypress-cucumber-preprocessor/browserify");

async function readExcel(worksheet, searchValue, output) {
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, columnNumber) => {
      if (cell.value === searchValue) {
        output.row = rowNumber;
        output.column = columnNumber;
      }
    });
  });
}

async function setupNodeEvents(on, config) {
  // Adding Cucumber preprocessor plugin
  await addCucumberPreprocessorPlugin(on, config);

  // Setting up the file preprocessor
  on("file:preprocessor", preprocessor(config));

  // Adding Mochawesome reporter plugin
  require('cypress-mochawesome-reporter/plugin')(on);

  // Task to convert Excel to JSON
  on('task', {
    excelToJsonConverter(filePath) {
      const result = excelToJson({
        source: fs.readFileSync(filePath)
      });
      return result;
    }
  });

  // Task to read and write to an Excel file
  on('task', {
    async writeExcel({ filePath, sheetName, change, searchValue, newValue }) {
      const workbook = new ExcelJS.Workbook();
      try {
        await workbook.xlsx.readFile(filePath);
        const worksheet = workbook.getWorksheet(sheetName);

        let output = { row: -1, column: -1 };
        await readExcel(worksheet, searchValue, output);

        if (output.row !== -1 && output.column !== -1) {
          const cell = worksheet.getCell(output.row + change.rowChange, output.column + change.colChange);
          cell.value = newValue;

          // Return the result of the writeFile operation
          return workbook.xlsx.writeFile(filePath)
            .then(() => {
              console.log('File updated successfully.');
              return true;
            })
            .catch((error) => {
              console.error('Error writing file:', error);
              return false;
            });
        } else {
          console.log(`No cell with the value "${searchValue}" found.`);
          return false;
        }
      } catch (error) {
        console.error('Error:', error);
        return false;
      }
    }
  });

  // Return the config object as it might have been modified by the plugin
  return config;
}

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.js',
    defaultCommandTimeout: 10000,
    downloadsFolder: 'cypress/downloads',
    setupNodeEvents,
    env: {
      url: "https://rahulshettyacademy.com/"
    },
  },
});
