const ical = require('ical-generator');
const calendarGenerator = ical({ domain: 'maco', name: 'calendar.generator' });


let ICalGenerator = (module.exports = function() {});

ICalGenerator.prototype.add = function(classroomEvent) {
    let event = calendarGenerator.createEvent();
    event.start(classroomEvent.start);
    event.end(classroomEvent.end);
    event.summary(classroomEvent.title);
    event.repeating({
        freq: 'WEEKLY',
        count: 14,
        interval: 1
    });
};

ICalGenerator.prototype.toString = function() {
    return calendarGenerator.toString();
};

ICalGenerator.prototype.clear = function() {
    return calendarGenerator.clear();
};
