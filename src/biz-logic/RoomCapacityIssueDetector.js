var RoomCapacityIssueDetector = (module.exports = function(schedule) {
  this.warningList = [];
  this.schedule = schedule;
});

RoomCapacityIssueDetector.prototype.desc = function() {
  return "room capacity";
};

RoomCapacityIssueDetector.prototype.warnings = function() {
  return [];
};
