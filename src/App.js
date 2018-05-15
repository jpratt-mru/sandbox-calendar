import React, { Component } from "react";
import Calendar from "./components/calendar/Calendar";
import SideBar from "./components/sidebar/SideBar";
import EventFilter from "./biz-logic/EventFilter";
import WarningBuilder from "./biz-logic/WarningBuilder";
import SemesterSchedule from './biz-logic/SemesterSchedule';


class App extends Component {
  constructor(props) {
    super(props);
    //const api = new ScheduledClassesApi();
    //let eventsToDisplay = api.classes;
    let semesterSchedule = new SemesterSchedule();
    let eventsToDisplay = semesterSchedule.events();
    let warningBuilder = new WarningBuilder();
    warningBuilder.add("RoomCapacityIssueDetector");
    warningBuilder.add("RoomDoubleBookingIssueDetector");
    warningBuilder.add("InstructorDoubleBookingIssueDetector");
    let warnings = warningBuilder.warningsFor(semesterSchedule);
    this.state = {
      filterText: "",
      allClassroomEvents: eventsToDisplay,
      filteredClassroomEvents: eventsToDisplay,
      warningList: warnings
    };

    this.filterClassroomEvents = this.filterClassroomEvents.bind(this);
    this.filteredEvents = this.filteredEvents.bind(this);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  filteredEvents() {
    const eventFilter = new EventFilter();
    const allEvents = this.state.allClassroomEvents;
    const filterText = this.state.filterText;

    return allEvents.filter(event =>
      eventFilter.eventMatchesFilterText(event, filterText)
    );
  }

  filterClassroomEvents() {
    this.setState({ filteredClassroomEvents: this.filteredEvents() });
  }

  handleFilterTextChange(filterText) {
    this.setState(
      {
        filterText: filterText
      },
      this.filterClassroomEvents
    );
  }

  render() {
    return (
      <div id="containers" className="mdl-grid">
        <Calendar
          filteredClassroomEvents={this.state.filteredClassroomEvents}
        />
        <SideBar
          filterText={this.state.filterText}
          onFilterTextChange={this.handleFilterTextChange}
          warnings={this.state.warningList}
        />
      </div>
    );
  }
}

export default App;
