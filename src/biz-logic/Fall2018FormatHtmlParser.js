 const CourseStartAndEndCalculator = require('./CourseStartAndEndCalculator');
 // const ColorDecider = require('./ColorDecider');
 const moment = require("moment");
 const courseStartAndEndCalculator = new CourseStartAndEndCalculator();

 let Fall2018FormatHtmlParser = (module.exports = function() {});


 Fall2018FormatHtmlParser.prototype.parse = function(htmlDump) {
  const re = / \((\s|\S)+\)/; // catch the funky "name (P)" stuff that goes on in the web schedule

  const filteredEvents = htmlDump
   .map(el => el.trim())
   .filter(el => el.length !== 0)
   .map(el => {
    if (el.match(re)) return el.replace(re, "");
    return el;

   });

  filteredEvents.shift();
  let extractedClassroomEvents = [];
  while (filteredEvents.length > 0) {
   const anEvent = oneEvent(filteredEvents);
   if (anEvent)
    extractedClassroomEvents.push(anEvent);
  }

  const extractedAsEvents = convertToEvents(extractedClassroomEvents);
  return extractedAsEvents;
 };

 const oneEvent = function(remainingRows) {
  let elem = remainingRows.shift();
  let event = [];
  while (remainingRows.length > 0 && elem !== "C" && elem !== "SR" && elem !== "NR") {
   event.push(elem);
   elem = remainingRows.shift();
  }
  if (event[6] === "WKT") return null;
  if (event[2] === "5590") return null;

  let dayOfWeekField = event[7];
  if (!dayOfWeekField) {
   console.log("it's a trap!");
  }
  if (dayOfWeekField.length !== 1) {
   let daysOfWeek = dayOfWeekField.split("");
   event[7] = daysOfWeek[0];

   for (let i = 1; i < daysOfWeek.length; i++) {
    let copy = JSON.parse(JSON.stringify(event));
    copy[7] = daysOfWeek[i];
    copy.push("C");
    remainingRows.unshift(...copy);
   }
  }
  return event;
 };

 const convertToEvents = function(extractedEvents) {
  return extractedEvents.map((almostEvent, index) => realEvent(almostEvent, index));
 };

 const realEvent = function(almostEvent, index) {

  let theEvent = {
   id: index + 1,
   subject: subject(almostEvent),
   courseNumber: courseNumber(almostEvent),
   instructor: instructor(almostEvent),
   username: username(almostEvent),
   room: room(almostEvent),
   section: section(almostEvent),
   sectionCapacity: sectionCapacity(almostEvent),
   start: start(almostEvent),
   end: end(almostEvent)
  };
  theEvent.course = `${theEvent.subject}${theEvent.courseNumber}`;

  // theEvent.color = ColorDecider.backgroundColor(theEvent.subject, theEvent.courseNumber, theEvent.section);

  theEvent.crn = `${theEvent.subject}.${theEvent.courseNumber}.${theEvent.section}`;
  theEvent.title = `${theEvent.course}-${theEvent.section}\n[${theEvent.username}]\n${theEvent.room}`;
  theEvent.searchableThings = `${theEvent.subject} ${theEvent.courseNumber} ${theEvent.section} ${theEvent.instructor} ${theEvent.username} ${theEvent.room}`;
  theEvent.searchableThings = theEvent.searchableThings.replace(/\s/g, "");

  return theEvent;

 };

 const subject = function(row) {
  return row[1];
 };

 const courseNumber = function(row) {
  return row[2];
 };

 const section = function(row) {
  return row[3];
 };

 const instructor = function(row) {
  return row[13];
 };

 const username = function(row) {
  const fullName = instructor(row);

  if (fullName === "TBA") {
   return "TBA";
  }

  let nameParts = fullName.split(" ").filter(e => e.length > 0);

  const rawFirstName = nameParts[0];
  let rawLastName = nameParts[1];
  if (nameParts.length > 2) {
   rawLastName = nameParts[2];
  }

  const firstNameInitial = rawFirstName[0];

  let uname = "unknown";
  try {
   uname = firstNameInitial.toLowerCase() + rawLastName.toLowerCase().replace(" ", "");
  }
  catch (e) {

  }

  return uname;
 };

 const room = function(row) {

  try {
   let roomParts = row[15].split(" ").filter(e => e.length > 0);
   return roomParts.length === 1 ? roomParts[0] : roomParts[1];
  }
  catch (e) {
   return "NO-ROOM";
  }

 };

 const sectionCapacity = function(row) {
  return parseInt(row[9], 10);
 };

 const start = function(row) {
  const [classStartTime, _] = row[8].split("-");;


  let firstDay = firstDayOfClass(row);
  let startAsMoment = moment(firstDayOfClass(row), moment.HTML5_FMT.DATETIME_LOCAL);

  const splitClassStartTime = classStartTime.split(/[: ]/);
  let classStartHour = parseInt(splitClassStartTime[0], 10);
  if (classStartHour >= 1 && classStartHour <= 6) classStartHour += 12;
  const classStartMin = parseInt(splitClassStartTime[1], 10);

  startAsMoment.hour(classStartHour);
  startAsMoment.minute(classStartMin);

  return startAsMoment.format();

 };

 const end = function(row) {
  const [_, classEndTime] = row[8].split("-");;


  let firstDay = firstDayOfClass(row);
  let endAsMoment = moment(firstDayOfClass(row), moment.HTML5_FMT.DATETIME_LOCAL);

  const splitClassEndTime = classEndTime.split(/[: ]/);
  let classEndHour = parseInt(splitClassEndTime[0], 10);
  if (classEndHour >= 1 && classEndHour <= 6) classEndHour += 12;
  const classEndMin = parseInt(splitClassEndTime[1], 10);

  endAsMoment.hour(classEndHour);
  endAsMoment.minute(classEndMin);

  return endAsMoment.format();
 };


 const firstDayOfClass = function(row) {
  const [startOfSemesterDate, _] = row[14].split("-");

  const classDayOfWeek = row[7];

  // console.log("calcd", courseStartAndEndCalculator.start(startOfSemesterDate, classDayOfWeek));
  return courseStartAndEndCalculator.start(startOfSemesterDate, classDayOfWeek);
 };
 