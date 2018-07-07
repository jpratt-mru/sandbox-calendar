const Fall2018FormatHtmlParser = require("./Fall2018FormatHtmlParser.js");

let HtmlParserFactory = (module.exports = function() {});

HtmlParserFactory.prototype.create = function(type) {
    if (type === "fall-2018-format")
        return new Fall2018FormatHtmlParser();

};
