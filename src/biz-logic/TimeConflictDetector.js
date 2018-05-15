//
// use moment-range library https://github.com/rotaready/moment-range
// to detect time conflicts
//
const Moment = require("moment");
const MomentRange = require("moment-range");
const moment = MomentRange.extendMoment(Moment);

let TimeConflictDetector = (module.exports = function() {});

TimeConflictDetector.prototype.hasConflict = function(eventOne, eventTwo) {
  let eventOneRangeStart = moment(eventOne.start);
  let eventOneRangeEnd = moment(eventOne.end);
  let eventOneRange = moment.range(eventOneRangeStart, eventOneRangeEnd);

  let eventTwoRangeStart = moment(eventTwo.start);
  let eventTwoRangeEnd = moment(eventTwo.end);
  let eventTwoRange = moment.range(eventTwoRangeStart, eventTwoRangeEnd);

  return eventOneRange.overlaps(eventTwoRange);
};
