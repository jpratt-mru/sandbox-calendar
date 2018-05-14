var RoomCapacityIssueDetector = require("./RoomCapacityIssueDetector");
var RoomDoubleBookingIssueDetector = require("./RoomDoubleBookingIssueDetector");
var InstructorDoubleBookingIssueDetector = require("./InstructorDoubleBookingIssueDetector");

var WarningFactory = (module.exports = function() {});

WarningFactory.prototype.create = function(type) {
  if (type === "RoomCapacityIssueDetector")
    return new RoomCapacityIssueDetector();

  if (type === "RoomDoubleBookingIssueDetector")
    return new RoomDoubleBookingIssueDetector();

  if (type === "InstructorDoubleBookingIssueDetector")
    return new InstructorDoubleBookingIssueDetector();
};
