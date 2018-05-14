var InstructorDoubleBookingIssueDetector = (module.exports = function(
  schedule
) {
  this.warningList = [];
  this.schedule = schedule;
});

InstructorDoubleBookingIssueDetector.prototype.desc = function() {
  return "instructor double booking";
};

InstructorDoubleBookingIssueDetector.prototype.warnings = function() {
  return [{ desc: "instructor double booking" }];
};
