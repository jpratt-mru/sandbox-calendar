import React from "react";

const ICalGenerator = require("../../biz-logic/ICalGenerator");
const iCalGenerator = new ICalGenerator();
const FileSaver = require('file-saver');
const Blob = require('blob');


function ExportButton(props) {
  const filteredEvents = props.filteredClassEvents;
  return (
    <div className="mdl-cell"> 
      <button className="mdl-button mdl-js-button mdl-button--raised" name="button" onClick={(e) => exportCalendar(filteredEvents, e)}>Download Current Calendar</button>
    </div>
  );
}


/**
 * Generates an ics (iCalendar format) file for the events
 * currently showing on the calendar.
 */
function exportCalendar(events) {
  iCalGenerator.clear();
  events.forEach(event => iCalGenerator.add(event));
  const blob = new Blob([iCalGenerator.toString()], { type: "text/plain;charset=utf-8" });
  FileSaver.saveAs(blob, "calendar-export.ics");
}


export default ExportButton;
