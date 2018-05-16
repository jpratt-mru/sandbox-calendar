// used to create unique list of issues
const lodashArray = require("lodash/array");

const RoomApi = require("../api/RoomsApi");
const roomApi = new RoomApi();

var RoomCapacityIssueDetector = (module.exports = function() {});


RoomCapacityIssueDetector.prototype.warnings = function(schedule) {
  const allEvents = schedule.events();

  return issuesFor(allEvents);
};



//
// helpers
//

let issuesFor = function(allEvents) {

  return onlyUnique(issues(allEvents));

};

let issues = function(allEvents) {


  return allEvents.filter(hasCapacityConflict).map(conflictDescriptionFor);


};



// note that "this" is coming in via the map call in timeCloflictsBetween()
// the crns attribute is being used to remove duplicate warnings; for example,
// we don't want to have both a conflict between course A and course B *AND* course B and course A
let conflictDescriptionFor = function(event) {
  return {
    desc: `${event.room} can hold ${roomApi.capacity(event.room)}, but is booked for ${event.course} which has a section capacity of ${event.sectionCapacity}`
  };
};

let onlyUnique = function(issueList) {
  return lodashArray.uniqWith(
    issueList,
    (a, b) => a.desc === b.desc
  );
};

let hasCapacityConflict = function(event) {
  if (!event.room || !event.sectionCapacity) return false;

  return !roomApi.canHold(event.room, event.sectionCapacity);
};
