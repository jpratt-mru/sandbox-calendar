let lodashArray = require("lodash/array");
let WarningDetectorFactory = require("./WarningDetectorFactory");

let WarningBuilder = (module.exports = function() {
  this.warningDetectors = [];
  this.warningDetectorFactory = new WarningDetectorFactory();
});

WarningBuilder.prototype.add = function(type) {
  this.warningDetectors.push(this.warningDetectorFactory.create(type));
};

WarningBuilder.prototype.warningsFor = function(schedule) {
  let warnings = [];

  this.warningDetectors.forEach(detector =>
    warnings.push(detector.warnings(schedule))
  );

  return lodashArray.flatten(warnings);
};
