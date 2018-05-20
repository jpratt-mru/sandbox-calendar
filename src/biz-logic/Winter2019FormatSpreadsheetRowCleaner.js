import XLSX from 'xlsx';

let Winter2019FormatSpreadsheetRowCleaner = (module.exports = function() {});


Winter2019FormatSpreadsheetRowCleaner.prototype.clean = function(macoWorksheet) {

    const noHeaderRowRemoved = macoWorksheet.filter((row, index) => index > 0);
    console.log("AFTER NO HEADER FILTER: ", noHeaderRowRemoved);

    const noTimePresentRowsRemoved = noHeaderRowRemoved.filter(row => row["__EMPTY_13"]);
    console.log("AFTER NO TIME FILTER: ", noTimePresentRowsRemoved);

    const previousCourseCopiedIfCourseFieldBlank = noTimePresentRowsRemoved.map((currRow, index, array) => {
        if (!currRow.hasOwnProperty("__EMPTY")) {
            const prevRow = array[index - 1];
            currRow["__EMPTY"] = prevRow["__EMPTY"];
        }
        return currRow;
    });
    console.log("AFTER PREVIOUS COURSE FILTER: ", previousCourseCopiedIfCourseFieldBlank);

    const previousCourseCopiedIfSectionFieldBlank = noTimePresentRowsRemoved.map((currRow, index, array) => {
        if (!currRow.hasOwnProperty("__EMPTY_3")) {
            const prevRow = array[index - 1];
            currRow["__EMPTY_3"] = prevRow["__EMPTY_3"];
        }
        return currRow;
    });
    console.log("AFTER PREVIOUS COURSE FILTER: ", previousCourseCopiedIfSectionFieldBlank);

    return previousCourseCopiedIfSectionFieldBlank;
};
