var array = require("lodash/array");
var _ = require("lodash");

const TimeConflictDetector = require("./TimeConflictDetector");
const timeConflictDetector = new TimeConflictDetector();

var InstructorDoubleBookingIssueDetector = (module.exports = function() {});

InstructorDoubleBookingIssueDetector.prototype.desc = function() {
  return "instructor double booking";
};

InstructorDoubleBookingIssueDetector.prototype.warnings = function(schedule) {
  let allEvents = schedule.events();

  return buildWarningList(allEvents);
};

var buildWarningList = function(allEvents) {
  let warningList = [];
  allEvents.forEach(function(event) {
    const issueList = conflictsFor(event, allEvents);

    if (issueList.length !== 0) {
      issueList.forEach(issue => warningList.push(issue));
    }
  });
  return array.uniqWith(warningList, (a, b) => a.crns === b.crns);
};

var conflictsFor = function(eventUnderTest, allEvents) {
  if (allEvents.length <= 1) {
    return [];
  }

  let conflicts = [];
  allEvents.forEach(function(event) {
    if (hasConflict(eventUnderTest, event)) {
      let conflictingCrns = [eventUnderTest.crn, event.crn].sort().join(".");

      let conflict = {
        crns: conflictingCrns,
        desc: eventUnderTest.instructor + " has a time conflict"
      };
      conflicts.push(conflict);
    }
  });

  return conflicts;
};

var hasConflict = function(eventUnderTest, event) {
  if (eventUnderTest.instructor !== event.instructor) {
    return false;
  }

  if (_.isEqual(eventUnderTest, event)) {
    return false;
  }

  return timeConflictDetector.hasConflict(eventUnderTest, event);
};
