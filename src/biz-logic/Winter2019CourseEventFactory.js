const CourseStartAndEndCalculator = require('./CourseStartAndEndCalculator');
// const ColorDecider = require('./ColorDecider');

const Winter2019CourseEventFactory = (module.exports = function() {});



const moment = require("moment");
const courseStartAndEndCalculator = new CourseStartAndEndCalculator();

Winter2019CourseEventFactory.prototype.newEvent = function(row, id) {
    let theEvent = {
        id: id,
        course: course(row),
        instructor: instructor(row),
        username: username(row),
        room: room(row),
        section: section(row),
        sectionCapacity: sectionCapacity(row),
        start: start(row),
        end: end(row)
    };
    theEvent.subject = theEvent.course.slice(0, 4);
    theEvent.courseNumber = theEvent.course.slice(4);


    theEvent.crn = `${theEvent.subject}.${theEvent.courseNumber}.${theEvent.section}`;
    theEvent.title = `${theEvent.course}-${theEvent.section}\n[${theEvent.username}]\n${theEvent.room}`;
    return theEvent;
};

const course = function(row) {
    return row["__EMPTY"];
};

const section = function(row) {
    return row["__EMPTY_3"];
};

const instructor = function(row) {
    let rawFirstName = row["__EMPTY_18"];
    let rawLastName = row["__EMPTY_19"];

    if (!rawFirstName) {
        return "TBA";
    }

    if (rawFirstName.toLowerCase().startsWith("tba")) {
        return "TBA";
    }

    return `${rawFirstName} ${rawLastName}`;
};

const username = function(row) {
    const fullName = instructor(row);

    if (fullName === "TBA") {
        return "TBA";
    }


    const rawFirstName = row["__EMPTY_18"];
    const firstNameInitial = rawFirstName[0];

    let rawLastName = row["__EMPTY_19"];

    return firstNameInitial.toLowerCase() + rawLastName.toLowerCase().replace(" ", "");
};

const room = function(row) {
    return row["__EMPTY_16"];
};

const sectionCapacity = function(row) {
    return parseInt(row["__EMPTY_5"], 10);
};

const start = function(row) {
    let startAsMoment = moment(firstDayOfClass(row), moment.HTML5_FMT.DATETIME_LOCAL);

    const classStartTime = row["__EMPTY_13"];
    const splitClassStartTime = classStartTime.split(":");
    const classStartHour = parseInt(splitClassStartTime[0], 10);
    const classStartMin = parseInt(splitClassStartTime[1], 10);

    startAsMoment.hour(classStartHour);
    startAsMoment.minute(classStartMin);

    return startAsMoment.format();
};

const end = function(row) {
    const classDuration = moment.duration(row["__EMPTY_14"]);
    let endAsMoment = moment(start(row));
    endAsMoment.add(classDuration).subtract(10, 'minutes');
    return endAsMoment.format();
};

const firstDayOfClass = function(row) {
    const startOfSemesterDate = row["__EMPTY_6"];
    const classDayOfWeek = row["__EMPTY_12"];

    return courseStartAndEndCalculator.start(startOfSemesterDate, classDayOfWeek);
};
