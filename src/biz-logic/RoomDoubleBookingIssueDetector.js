var RoomDoubleBookingIssueDetector = (module.exports = function(schedule) {
  this.warningList = [];
  this.schedule = schedule;
});

RoomDoubleBookingIssueDetector.prototype.desc = function() {
  return "room double booking";
};

RoomDoubleBookingIssueDetector.prototype.warnings = function() {
  return [];
};
