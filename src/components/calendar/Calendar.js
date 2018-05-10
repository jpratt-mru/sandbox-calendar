import React, { Component } from "react";
import "../../styles/fullcalendar.min.css";
import ScheduledClassesApi from "../../api/ScheduledClassesApi";

import $ from "jquery";
import "fullcalendar";

class Calendar extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $("#calendar").fullCalendar(CALENDAR_SETTINGS);
    $("#calendar").fullCalendar("addEventSource", this.eventGenerator);
  }

  eventGenerator(start, end, timezone, callback) {
    const api = new ScheduledClassesApi();
    let eventsToDisplay = api.classes;
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
    start: "2018-09-10",
    end: "2018-09-15"
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
    center: "",
    right: ""
  }
};

export default Calendar;
