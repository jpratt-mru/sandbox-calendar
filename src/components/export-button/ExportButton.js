import React from "react";
const ICalGenerator = require("../../biz-logic/ICalGenerator");
let iCalGenerator = new ICalGenerator();
var FileSaver = require('file-saver');
var Blob = require('blob');


function exportCalendar(events) {
  iCalGenerator.clear();
  events.forEach(event => iCalGenerator.add(event));
  var blob = new Blob([iCalGenerator.toString()], { type: "text/plain;charset=utf-8" });
  FileSaver.saveAs(blob, "calendar-export.ics");
}

function ExportButton(props) {
  const filteredEvents = props.filteredClassroomEvents;
  return (
    <div className="mdl-cell"> 
      <button className="mdl-button mdl-js-button mdl-button--raised" name="button" onClick={(e) => exportCalendar(filteredEvents, e)}>Download Current Calendar</button>
    </div>
  );
}


export default ExportButton;
