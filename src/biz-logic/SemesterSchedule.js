var ScheduledClassesApi = require("../api/ScheduledClassesApi");

var SemesterSchedule = (module.exports = function() {
  const api = new ScheduledClassesApi();
  this.classroomEvents = api.classes();
  console.log("classroom events:", this.classroomEvents);
  this.warningList = [];
});

SemesterSchedule.prototype.events = function() {
  return this.classroomEvents;
};


