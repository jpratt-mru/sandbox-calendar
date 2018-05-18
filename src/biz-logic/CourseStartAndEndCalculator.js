const moment = require("moment");


let CourseStartAndEndCalculator = (module.exports = function() {});


CourseStartAndEndCalculator.prototype.start = function(semesterStartDate, classDayOfWeek) {
    const cleanedStartDate = cleanedDate(semesterStartDate);

    const firstMondayOfClasses = firstMondayFrom(cleanedStartDate);

    return firstDateWithTargetDayOfWeek(firstMondayOfClasses, classDayOfWeek);
};

const firstDateWithTargetDayOfWeek = function(startDate, targetDayOfWeek) {
    let currDate = moment(startDate);
    const targetDayOfWeekAsNumber = dayOfWeekAsNumber(targetDayOfWeek);
    while (currDate.day() !== targetDayOfWeekAsNumber) {
        currDate.add(1, 'day');
    }
    return currDate.format();
};

const firstMondayFrom = function(startingDate) {
    let date = moment(startingDate);
    while (date.day() !== 1) {
        date.add(1, 'day');
    }
    return date.format();
};

const cleanedDate = function(dirtyDate) {
    let splitDate = dirtyDate.split("/");
    let yearStr = splitDate[2];
    if (yearStr.length === 2) yearStr = "20" + yearStr;
    const year = parseInt(yearStr, 10);
    const month = parseInt(splitDate[0] - 1, 10);
    const day = parseInt(splitDate[1], 10);
    return moment([year, month, day]).format();
};


CourseStartAndEndCalculator.prototype.first = function(dayOfWeek, firstDayOfClasses) {
    let firstDayOfClassesSplit = firstDayOfClasses.split("/");
    let yearStr = firstDayOfClassesSplit[2];
    if (yearStr.length === 2) yearStr = "20" + yearStr;
    const year = parseInt(yearStr, 10);
    const month = parseInt(firstDayOfClassesSplit[0] - 1, 10);
    const day = parseInt(firstDayOfClassesSplit[1], 10);
    const firstDay = moment([year, month, day]);

    let currWeekdayAsNumber = firstDay.weekday();

    let targetWeekdayAsNumber = dayOfWeekAsNumber(dayOfWeek);

    return firstDay.add(daysUntilNext(currWeekdayAsNumber, targetWeekdayAsNumber), 'days').format("YYYY-MM-DD");
};

CourseStartAndEndCalculator.prototype.last = function(dayOfWeek, lastDayOfClasses) {
    let lastDayOfClassesSplit = lastDayOfClasses.split("/");
    const year = parseInt(lastDayOfClassesSplit[2], 10);
    const month = parseInt(lastDayOfClassesSplit[0] - 1, 10);
    const day = parseInt(lastDayOfClassesSplit[1], 10);
    const firstDay = moment([year, month, day]);

    let currWeekdayAsNumber = firstDay.weekday();
    let targetWeekdayAsNumber = dayOfWeekAsNumber(dayOfWeek);

    return firstDay.subtract(daysUntilLast(currWeekdayAsNumber, targetWeekdayAsNumber), 'days').format("YYYY-MM-DD");
};


let daysUntilNext = function(currDayOfWeek, targetDayOfWeek) {
    let now = currDayOfWeek;
    let daysPassed = 0;
    while (now !== targetDayOfWeek) {
        now++;
        if (now === 7) now = 0;
        daysPassed++;
    }
    return daysPassed + 1;
};

let daysUntilLast = function(currDayOfWeek, targetDayOfWeek) {
    let now = currDayOfWeek;
    let daysPassed = 0;
    while (now !== targetDayOfWeek) {
        now--;
        if (now === -1) now = 6;
        daysPassed++;
    }
    return daysPassed;
};

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
        case "Sunday":
            return 7;
        default:
            return 0;
    }
}
