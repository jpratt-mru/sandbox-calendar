const ical = require('ical-generator');
const calendarGenerator = ical({ domain: 'maco', name: 'calendar.generator' });
const moment = require("moment");

let ICalGenerator = (module.exports = function() {});

ICalGenerator.prototype.add = function(classroomEvent) {
    let event = calendarGenerator.createEvent().timezone('America/Edmonton');

    let theStart = moment.parseZone(classroomEvent.start);
    theStart.subtract(7, 'hours');
    let theEnd = moment.parseZone(classroomEvent.end);
    theEnd.subtract(7, 'hours');
    event.start(theStart.format());
    event.end(theEnd.format());
    event.summary(classroomEvent.title);
    event.repeating({
        freq: 'WEEKLY',
        count: 14,
        interval: 1
    });
};

ICalGenerator.prototype.toString = function() {
    const daylightSavingsBlob =
        `PRODID:-//sebbo.net//ical-generator//EN
BEGIN:VTIMEZONE
TZID:America/Edmonton
X-LIC-LOCATION:America/Edmonton
BEGIN:DAYLIGHT
TZOFFSETFROM:-0700
TZOFFSETTO:-0600
TZNAME:MDT
DTSTART:19700308T020000
RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU
END:DAYLIGHT
BEGIN:STANDARD
TZOFFSETFROM:-0600
TZOFFSETTO:-0700
TZNAME:MST
DTSTART:19701101T020000
RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU
END:STANDARD
END:VTIMEZONE`;
    const prodIdPart = "PRODID:-//sebbo.net//ical-generator//EN";
    return calendarGenerator.toString().replace(prodIdPart, daylightSavingsBlob);
};

ICalGenerator.prototype.clear = function() {
    return calendarGenerator.clear();
};
