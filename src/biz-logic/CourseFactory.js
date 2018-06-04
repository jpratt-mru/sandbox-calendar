/**
 * Spins up a factory you can then use to create calendar entries. 
 * Each semester, there is a high likelihood that the spreadsheet from
 * the Registrar's Office has a different format, so factories are based
 * on the year/season.
 */

const Winter2019FormatFactory = require("./Winter2019FormatFactory");

let CourseFactory = (module.exports = function() {});

CourseFactory.prototype.create = function(type) {
    if (type === "winter-2019-format")
        return new Winter2019FormatFactory();
    return {}; // TODO: eventually want to return some sort of NullObject pattern thingie
};
