var array = require("lodash/array");

var WarningFactory = require("./WarningFactory");

var WarningBuilder = (module.exports = function() {
  this.warningGenerators = [];
  this.warningFactory = new WarningFactory();
});

WarningBuilder.prototype.add = function(type) {
  this.warningGenerators.push(this.warningFactory.create(type));
};

WarningBuilder.prototype.warningsFor = function(schedule) {
  let warnings = [];
  this.warningGenerators.forEach(generator =>
    warnings.push(generator.warnings())
  );
  return array.flatten(warnings);
};
