const defaults = require('./DefaultWinter2019Courses');

var ScheduledClassesApi = (module.exports = function() {

});


ScheduledClassesApi.prototype.classes = function() {
  return defaults.COURSE_LIST;
};
