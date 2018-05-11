var EventFilter = (module.exports = function() {});
var array = require("lodash/array");

EventFilter.prototype.filter = function(filterableTerms, filterText) {
  if (isEmpty(filterText)) {
    return filterableTerms;
  }

  let filters = split(filterText);

  const diff = array.differenceWith(
    filters,
    filterableTerms,
    equalsIgnoreCase
  );

  return diff.length !== 0
    ? []
    : array.intersectionWith(filterableTerms, filters, equalsIgnoreCase);
};

var equalsIgnoreCase = function(a, b) {
  return a.toUpperCase() === b.toUpperCase();
};

var isEmpty = function(text) {
  return text.trim().length === 0;
};

// return text split by whitespace
var split = function(text) {
  return text.split(/\s+/).filter(el => el.length > 0);
};
