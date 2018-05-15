var array = require("lodash/array");
const Moment = require("moment");
const MomentRange = require("moment-range");

const moment = MomentRange.extendMoment(Moment);

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
  return warningList;
};

var conflictsFor = function(eventUnderTest, allEvents) {
  if (allEvents.length <= 1) {
    return [];
  }

  let conflicts = [];
  allEvents.forEach(function(event) {
    if (hasConflict(eventUnderTest, event)) {
      let conflict = {
        crns: eventUnderTest.crn + "."+ event.crn,
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
  if (eventUnderTest.crn === event.crn) {
    return false;
  }

  let eventUnderTestRangeStart = moment(eventUnderTest.start);
  let eventUnderTestRangeEnd = moment(eventUnderTest.end);
  let eventUnderTestRange = moment.range(
    eventUnderTestRangeStart,
    eventUnderTestRangeEnd
  );

  let eventRangeStart = moment(event.start);
  let eventRangeEnd = moment(event.end);
  let eventRange = moment.range(eventRangeStart, eventRangeEnd);

  return eventUnderTestRange.overlaps(eventRange);
};
