import React, { Component } from "react";

import "../../styles/fullcalendar.min.css";
import "./calendar.css";

import $ from "jquery";
import "fullcalendar";
const moment = require("moment");

/**
 * Uses the FullCalendar (https://fullcalendar.io/) library.
 * 
 * Every time a filter text box changes, it triggers a refetch of
 * the event sources, which redraws the calendar.
 * 
 */
class Calendar extends Component {
  constructor(props) {
    super(props);

    this.eventGenerator = this.eventGenerator.bind(this);
  }



  adjustRange() {
    console.log("range start", this.props.semesterStart, " to ", this.props.semesterEnd);
    $("#calendar").fullCalendar('option', 'visibleRange', {
      start: this.props.semesterStart,
      end: this.props.semesterEnd
    });

  }


  componentDidMount() {
    $("#calendar").fullCalendar(CALENDAR_SETTINGS);
    $("#calendar").fullCalendar("addEventSource", this.eventGenerator);
    $("#calendar").fullCalendar("rerenderEvents");
  }

  /**
   * When the events are filtered, it triggers a change in what needs
   * to be displayed; we refetch the newly filtered events and then
   * adjust the visible range (since we might have triggered a refresh
   * by brining in a new file which deals with classes from a different
   * semester).
   */
  componentDidUpdate() {
    this.adjustRange();
    $("#calendar").fullCalendar("refetchEventSources", this.eventGenerator);

    $("#calendar").fullCalendar("rerenderEvents");
  }

  /**
   * As per the FullCalendar docs (https://fullcalendar.io/docs/events-function)
   */
  eventGenerator(start, end, timezone, callback) {
    let eventsToDisplay = this.props.filteredClassEvents;
    // console.table(eventsToDisplay);
    callback(eventsToDisplay);
  }

  render() {
    return <div id="calendar" className="mdl-cell mdl-cell--10-col" />;
  }
}


// these are all pretty self-explanatory; details can be found
// in the FullCalendar docs
const CALENDAR_SETTINGS = {
  height: "auto",
  displayEventTime: false,
  defaultView: "agenda",
  columnHeaderFormat: "ddd",
  slotDuration: "00:30:00",
  slotLabelInterval: "01:00",
  minTime: "08:00:00",
  maxTime: "21:00:00",
  allDaySlot: false,
  nowIndicator: false,
  header: false
};

export default Calendar;
