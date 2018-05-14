var EventFilter = (module.exports = function() {});

EventFilter.prototype.eventMatchesFilterText = function(event, filterText) {
  return event
    ? isEmpty(filterText) ||
        filterTextMatchesAtLeastOnePropertyValue(event, filterText)
    : false;
};

var filterTextMatchesAtLeastOnePropertyValue = function(event, filterText) {
  let filters = split(filterText);

  return filters.every(filter =>
    filterFoundInAtLeastOnePropertyValue(event, filter)
  );
};

var filterFoundInAtLeastOnePropertyValue = function(event, filter) {
  for (let property in event) {
    let lowerCasePropertyValue = String(event[property]).toLowerCase();
    let lowerCaseFilter = filter.toLowerCase();
    if (lowerCasePropertyValue.indexOf(lowerCaseFilter) !== -1) {
      return true;
    }
  }
  return false;
};

var isEmpty = function(text) {
  return !text || text.trim().length === 0;
};

// return text split by whitespace
var split = function(text) {
  return text.split(/\s+/).filter(el => el.length > 0);
};
