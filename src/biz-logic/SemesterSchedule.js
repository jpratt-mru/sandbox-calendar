var ScheduledClassesApi = require("../api/ScheduledClassesApi");

var SemesterSchedule = (module.exports = function() {
  const api = new ScheduledClassesApi();
  this.classroomEvents = api.classes();
});

SemesterSchedule.prototype.events = function() {
  return this.classroomEvents;
};
