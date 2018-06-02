let EventFilter = (module.exports = function() {});

EventFilter.prototype.eventMatchesAllFilterText = function(event, filterText) {
  if (!event) return false;

  if (isEmpty(filterText)) return true;

  return filterTextMatchesAtLeastOnePropertyValue(event, filterText);
};

EventFilter.prototype.eventMatchesAnyFilterText = function(event, filterText) {
  if (!event) return false;

  if (isEmpty(filterText)) return true;

  return filterTextMatchesAtLeastOnePropertyValueOr(event, filterText);
};

let isEmpty = function(text) {
  return !text || text.trim().length === 0;
};

let filterTextMatchesAtLeastOnePropertyValue = function(event, filterText) {
  let filters = split(filterText);

  return filters.every(filter =>
    filterFoundInAtLeastOnePropertyValue(event, filter)
  );
};

let filterTextMatchesAtLeastOnePropertyValueOr = function(event, filterText) {
  let filters = split(filterText);

  return filters.some(filter =>
    filterFoundInAtLeastOnePropertyValue(event, filter)
  );
};

// return text split by whitespace
let split = function(text) {
  return text.split(/\s+/).filter(token => token.length > 0);
};

let filterFoundInAtLeastOnePropertyValue = function(event, filter) {
  for (let property in event) {
    if (property === "id") continue;
    let lowerCasePropertyValue = String(event[property]).toLowerCase();
    let lowerCaseFilter = filter.toLowerCase();

    if (contains(lowerCasePropertyValue, lowerCaseFilter)) {
      return true;
    }
  }
  return false;
};

let contains = function(a, b) {
  return a.indexOf(b) !== -1;
};
