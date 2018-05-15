let RoomCapacityIssueDetector = require("./RoomCapacityIssueDetector");
let RoomDoubleBookingIssueDetector = require("./RoomDoubleBookingIssueDetector");
let InstructorDoubleBookingIssueDetector = require("./InstructorDoubleBookingIssueDetector");

let WarningDetectorFactory = (module.exports = function() {});

WarningDetectorFactory.prototype.create = function(type) {
  if (type === "RoomCapacityIssueDetector")
    return new RoomCapacityIssueDetector();

  if (type === "RoomDoubleBookingIssueDetector")
    return new RoomDoubleBookingIssueDetector();

  if (type === "InstructorDoubleBookingIssueDetector")
    return new InstructorDoubleBookingIssueDetector();
};
