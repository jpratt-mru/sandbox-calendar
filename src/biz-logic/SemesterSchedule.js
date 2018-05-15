import ScheduledClassesApi from "../api/ScheduledClassesApi";

let SemesterSchedule = (module.exports = function() {
  const api = new ScheduledClassesApi();
  this.classroomEvents = api.classes;

  this.warningList = [];
});

SemesterSchedule.prototype.events = function() {
  return this.classroomEvents;
};
