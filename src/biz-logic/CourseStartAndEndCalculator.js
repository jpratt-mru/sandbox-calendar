/**
 * 
 * Utilities for figuring out when the first and last days of the semester are.
 * 
 * It's useful to be able to find the Monday of the first full week of classes,
 * because that will determine the week that will be displayed on the calendar.
 * 
 * The first and last day of a given classroom event is important for being
 * able to export calendars properly.
 * 
 */

const moment = require("moment");


let CourseStartAndEndCalculator = (module.exports = function() {});

/**
 * 
 * Finds the date such that it falls after the semesterStartDate and falls on
 * a provided classFirstDayOfWeek.
 * 
 * For example, if the first day of classes is on a Thursdaay, and if you have a 
 * class that runs with a Tue/Thu pattern, then we want
 * this function to return the date of the first Tuesday AFTER the first week
 * of classes.
 * 
 * We do this by calculating when the first Monday of the first FULL week of 
 * classes is and then figuring out the desired date from that point, using the
 * target day of the week.
 * 
 * As ann extra wrinkle, dates from the spreadsheet are often in the format
 * "M/D/YY" (like 1/3/19, or January 3rd, 2019) - but moment.js isn't happy with that
 * format, so we may need to "clean" the incoming data. 
 * 
 */
CourseStartAndEndCalculator.prototype.start = function(semesterStartDate, classFirstDayOfWeek) {
    const cleanedStartDate = cleanedDate(semesterStartDate);

    const firstMondayOfFullWeekOfClasses = firstMondayFrom(cleanedStartDate);

    return firstDayOfClassesInFirstFullWeek(firstMondayOfFullWeekOfClasses, classFirstDayOfWeek);
};


/**
 * 
 * Turn a date from "M/D/YY" to "YYYY-MM-DD" format.
 * 
 */
const cleanedDate = function(dirtyDate) {
    return moment(dirtyDate, "M/D/YY").format("YYYY-MM-DD");
};


/**
 * 
 * Return the first Monday from a given date. (If the date is already a Monday,
 * we don't go to the next one - we stay where we are.)
 * 
 */
const firstMondayFrom = function(startingDate) {
    let date = moment(startingDate);
    while (date.day() !== dayOfWeekAsNumber("Monday")) {
        date.add(1, 'day');
    }

    return date.format();
};


/**
 * 
 * Return the first day of classes for a given class.
 * 
 */
const firstDayOfClassesInFirstFullWeek = function(firstMondayOfFirstFullWeek, targetDayOfWeek) {
    const targetDayOfWeekAsNumber = dayOfWeekAsNumber(targetDayOfWeek);
    let currDate = moment(firstMondayOfFirstFullWeek);

    while (currDate.day() !== targetDayOfWeekAsNumber) {
        currDate.add(1, 'day');
    }
    return currDate.format();
};


/**
 * 
 * Not much here - moment.js starts on Sunday = 0;
 * 
 */
let dayOfWeekAsNumber = function(dayOfWeek) {
    switch (dayOfWeek) {
        case "Monday":
            return 1;
        case "Tuesday":
            return 2;
        case "Wednesday":
            return 3;
        case "Thursday":
            return 4;
        case "Friday":
            return 5;
        case "Saturday":
            return 6;
        default:
            return 0;
    }
};
