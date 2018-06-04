/**
 * 
 * Utility methods to filter things out from a classroom event collection
 * based on the text.
 * 
 * Filters can be "and" filters (so each token in the text must partially
 * match for a match to be true), or "or" filters (so at least one token must
 * partially match for the match to be true).
 * 
 * Matches are made against all property values in the event collection except
 * for id.
 * 
 */

let EventFilter = (module.exports = function() {});

/**
 * 
 * This is our AND filter utility.
 * 
 * If the event doesn't exist, returns false - you can't have a match if you
 * don't exist yourself.
 * 
 */
EventFilter.prototype.eventMatchesAllFilterText = function(event, filterText) {
  if (!event) return false;

  if (isEmpty(filterText)) return true;

  return filterTextPartiallyMatchesAllPropertyValues(event, filterText);
};


/**
 * 
 * This is our OR filter utility.
 * 
 * If the event doesn't exist, returns false - you can't have a match if you
 * don't exist yourself.
 * 
 */
EventFilter.prototype.eventMatchesAnyFilterText = function(event, filterText) {
  if (!event) return false;

  if (isEmpty(filterText)) return true;

  return filterTextPartiallyMatchesAtLeastOnePropertyValue(event, filterText);
};



let isEmpty = function(text) {
  return !text || text.trim().length === 0;
};


let filterTextPartiallyMatchesAllPropertyValues = function(event, filterText) {
  const filters = split(filterText);

  return filters.every(filter =>
    filterFoundInAtLeastOnePropertyValue(event, filter)
  );
};


let filterTextPartiallyMatchesAtLeastOnePropertyValue = function(event, filterText) {
  const filters = split(filterText);

  return filters.some(filter =>
    filterFoundInAtLeastOnePropertyValue(event, filter)
  );
};


/**
 * 
 * Split text into tokens across any kind of whitespace.
 * 
 */
let split = function(text) {
  return text.split(/\s+/).filter(token => token.length > 0);
};


/**
 * 
 * As long as a filter is found *somewhere*, in *some* property value of an
 * event, we return true.
 * 
 * The only exception to this is the id property - the user doesn't know (and
 * doesn't want to know) about that.
 * 
 */
let filterFoundInAtLeastOnePropertyValue = function(event, filter) {
  const { id, ...idFilteredOutEvent } = event;

  const valuesInEvent = Object.keys(idFilteredOutEvent).map(k => idFilteredOutEvent[k]);
  return valuesInEvent.some(value => contains(value, filter));
};


let contains = function(a, b) {
  return a.toLowerCase().indexOf(b.toLowerCase()) !== -1;
};
