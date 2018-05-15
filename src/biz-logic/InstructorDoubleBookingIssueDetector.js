const lodashArray = require("lodash/array");
//
// use moment library https://momentjs.com
// to display days of week nicely
//
const moment = require("moment");
const TimeConflictDetector = require("./TimeConflictDetector");

const timeConflictDetector = new TimeConflictDetector();


let InstructorDoubleBookingIssueDetector = (module.exports = function() {});


InstructorDoubleBookingIssueDetector.prototype.warnings = function(schedule) {
  const allEvents = schedule.events();

  return warningListFor(allEvents);
};

let warningListFor = function(allEvents) {
  let warningList = [];

  allEvents.forEach(function(event) {
    const issueList = conflictsFor(event, allEvents);

    if (issuesFoundIn(issueList)) {
      issueList.forEach(issue => warningList.push(issue));
    }
  });

  return lodashArray.uniqWith(
    warningList,
    (a, b) => a.desc === b.desc
  );
};


let issuesFoundIn = function(issueList) {
  return issueList.length !== 0;
};

let conflictsFor = function(eventBeingTested, allEvents) {

  if (allEvents.length <= 1) return [];

  let conflicts = [];
  allEvents.forEach(function(event) {
    if (hasConflict(eventBeingTested, event)) {
      let dayOfWeek = moment(eventBeingTested.start).format("dddd");
      let conflict = {
        desc: eventBeingTested.instructor + " has a time conflict on " + dayOfWeek
      };
      conflicts.push(conflict);
    }
  });

  return conflicts;
};

let hasConflict = function(event, otherEvent) {

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
