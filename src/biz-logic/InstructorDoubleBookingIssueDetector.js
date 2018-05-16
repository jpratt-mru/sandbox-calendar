// used to create unique list of issues
const lodashArray = require("lodash/array");

// use https://momentjs.com to help display days of week nicely
const moment = require("moment");

const TimeConflictDetector = require("./TimeConflictDetector");
const timeConflictDetector = new TimeConflictDetector();



let InstructorDoubleBookingIssueDetector = (module.exports = function() {});

InstructorDoubleBookingIssueDetector.prototype.warnings = function(schedule) {
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
  let issueList = [];

  allEvents.forEach(event =>
    issuesBetween(event, allEvents).forEach(issue =>
      issueList.push(issue)
    )
  );

  return issueList;
};

let issuesBetween = function(eventBeingTested, allEvents) {

  if (allEvents.length <= 1) return [];

  return timeConflictsBetween(eventBeingTested, allEvents);
};

let timeConflictsBetween = function(eventBeingTested, allEvents) {
  return allEvents
    .filter(event => hasTimeConflict(eventBeingTested, event))
    .map(conflictDescriptionFor, eventBeingTested);
};


// note that "this" is coming in via the map call in timeCloflictsBetween()
// the crns attribute is being used to remove duplicate warnings; for example,
// we don't want to have both a conflict between course A and course B *AND* course B and course A
let conflictDescriptionFor = function(event) {
  let dayOfWeek = moment(event.start).format("dddd");
  return {
    crns: [event.crn, this.crn].sort().join('.'),
    desc: `${event.instructor} has a time conflict on ${dayOfWeek} with ${event.course}-${event.section} and ${this.course}-${this.section}`
  };
};

let onlyUnique = function(issueList) {
  return lodashArray.uniqWith(
    issueList,
    (a, b) => a.crns === b.crns
  );
};

let hasTimeConflict = function(event, otherEvent) {

  if (event.id === otherEvent.id) {
    return false;
  }

  if (event.instructor !== otherEvent.instructor) {
    return false;
  }

  if (event.instructor === "TBA" || otherEvent.instructor === "TBA") {
    return false;
  }

  return timeConflictDetector.hasConflict(event, otherEvent);
};
