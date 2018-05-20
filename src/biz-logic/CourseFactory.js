const Winter2019FormatFactory = require("./Winter2019FormatFactory");

let CourseFactory = (module.exports = function() {});

CourseFactory.prototype.create = function(type) {
    if (type === "winter-2019-format")
        return new Winter2019FormatFactory();

};
