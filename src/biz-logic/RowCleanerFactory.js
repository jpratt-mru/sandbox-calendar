const Winter2019FormatSpreadsheetRowCleaner = require("./Winter2019FormatSpreadsheetRowCleaner");

let RowCleanerFactory = (module.exports = function() {});

RowCleanerFactory.prototype.create = function(type) {
    if (type === "winter-2019-format")
        return new Winter2019FormatSpreadsheetRowCleaner();

};
