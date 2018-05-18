import React, { Component } from "react";
import "../../styles/fullcalendar.min.css";
import "./calendar.css";


import $ from "jquery";
import "fullcalendar";

class Calendar extends Component {
  constructor(props) {
    super(props);

    this.eventGenerator = this.eventGenerator.bind(this);
  }

  componentDidMount() {
    $("#calendar").fullCalendar(CALENDAR_SETTINGS);
    $("#calendar").fullCalendar("addEventSource", this.eventGenerator);
  }

  componentDidUpdate() {
    $("#calendar").fullCalendar("refetchEventSources", this.eventGenerator);
  }

  eventGenerator(start, end, timezone, callback) {
    let eventsToDisplay = this.props.filteredClassroomEvents;
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
    left: "",
    center: "",
    right: ""
  }
};

export default Calendar;
