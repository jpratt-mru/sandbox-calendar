var EventFilter = (module.exports = function() {});
var array = require("lodash/array");
var string = require("lodash/string");

EventFilter.prototype.filter = function(filterableTerms, filterText) {
  if (!filterableTerms) {
    return [];
  }

  if (isEmpty(filterText)) {
    return filterableTerms;
  }

  let filters = split(filterText);

  return filters.every(filter => contains(filterableTerms, filter));
};

var contains = function(collection, item) {
  const hasAtLeastOne = collection.some(
    e => e.toLowerCase().indexOf(item.toLowerCase()) !== -1
  );
  console.log(
    "item: ",
    item,
    " is in collection ",
    collection,
    " => ",
    hasAtLeastOne
  );
  return collection.some(e =>
    e.toLowerCase().indexOf(item.toLowerCase() !== -1)
  );
};

var isEmpty = function(text) {
  return text.trim().length === 0;
};

// return text split by whitespace
var split = function(text) {
  return text.split(/\s+/).filter(el => el.length > 0);
};
