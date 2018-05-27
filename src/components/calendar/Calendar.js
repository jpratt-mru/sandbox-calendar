import React, { Component } from "react";

import "../../styles/fullcalendar.min.css";
import "./calendar.css";

import $ from "jquery";
import "fullcalendar";
const moment = require("moment");

/**
 * Uses the fullcalendar (https://fullcalendar.io/) library.
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

  isOnMonday(event) {
    const eventStartDate = moment(event.start);
    return eventStartDate.day() === 1;
  }

  rangeStart() {
    const firstClassOnMonday = this.props.filteredClassEvents.find(event => this.isOnMonday(event));
    return firstClassOnMonday === undefined ? "2019-01-07" : moment(firstClassOnMonday.start).format("YYYY-MM-DD");
  }

  rangeEnd() {
    return moment(this.rangeStart()).add(5, 'd').format("YYYY-MM-DD");
  }

  adjustRange() {
    $("#calendar").fullCalendar('option', 'visibleRange', {
      start: this.rangeStart(),
      end: this.rangeEnd()
    });
  }

  componentDidMount() {
    $("#calendar").fullCalendar(CALENDAR_SETTINGS);
    $("#calendar").fullCalendar("addEventSource", this.eventGenerator);
  }

  componentDidUpdate() {

    $("#calendar").fullCalendar("refetchEventSources", this.eventGenerator);
    this.adjustRange();
  }

  eventGenerator(start, end, timezone, callback) {
    let eventsToDisplay = this.props.filteredClassEvents;
    callback(eventsToDisplay);
  }

  render() {
    return <div id="calendar" className="mdl-cell mdl-cell--10-col" />;
  }
}

const CALENDAR_SETTINGS = {
  height: "auto",
  displayEventTime: false,
  defaultView: "agenda",
  visibleRange: {
    start: "2019-01-07",
    end: "2019-01-12"
  },
  columnHeaderFormat: "ddd",
  slotDuration: "00:30:00",
  slotLabelInterval: "01:00",
  minTime: "07:00:00",
  maxTime: "20:00:00",
  allDaySlot: false,
  nowIndicator: false,
  header: {
    left: "title",
    center: "title",
    right: ""
  }
};

export default Calendar;
