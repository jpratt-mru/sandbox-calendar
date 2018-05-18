import React, { Component } from "react";
import ExportButton from "./components/export-button/ExportButton";
import Calendar from "./components/calendar/Calendar";
import SideBar from "./components/sidebar/SideBar";
import FileDropArea from "./components/file-drop-area/FileDropArea";
import EventFilter from "./biz-logic/EventFilter";
import Title from "./components/title/Title";
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
      orFilterText: "",
      andFilterText: "",
      allClassroomEvents: eventsToDisplay,
      filteredClassroomEvents: eventsToDisplay,
      warningList: warnings,
      warningBuilder: warningBuilder,
      title: "default"
    };

    this.filterClassroomEvents = this.filterClassroomEvents.bind(this);
    this.filteredEvents = this.filteredEvents.bind(this);
    this.handleAndFilterTextChange = this.handleAndFilterTextChange.bind(this);
    this.handleOrFilterTextChange = this.handleOrFilterTextChange.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  title(courses) {
    const aCourse = courses[0];
    const aCourseDate = aCourse.start;
    const year = aCourseDate.split("-")[0];
    let month = aCourseDate.split("-")[1];

    if (month === "01") {
      month = "WINTER";
    }
    else if (month === "09") {
      month = "FALL";
    }
    return year + "-" + month;
  }

  handleDrop(courses) {
    this.setState({ allClassroomEvents: courses });
    this.setState({ filteredClassroomEvents: courses });
    let semesterSchedule = {
      events: function() { return courses; }
    };
    let warnings = this.state.warningBuilder.warningsFor(semesterSchedule);
    this.setState({ warningList: warnings });
    this.setState({ title: this.title(courses) });
  }

  filteredEvents() {
    const eventFilter = new EventFilter();
    const allEvents = this.state.allClassroomEvents;
    const filterText = this.state.andFilterText;

    return allEvents.filter(event =>
      eventFilter.eventMatchesFilterText(event, filterText)
    );
  }

  filteredEventsWithOr() {
    const eventFilter = new EventFilter();
    const allEvents = this.state.allClassroomEvents;
    const filterText = this.state.orFilterText;

    return allEvents.filter(event =>
      eventFilter.eventMatchesAnyFilterText(event, filterText)
    );
  }

  filterClassroomEvents() {
    this.setState({ filteredClassroomEvents: this.filteredEvents() });
  }

  filterClassroomEventsWithOr() {
    this.setState({ filteredClassroomEvents: this.filteredEventsWithOr() });
  }

  handleAndFilterTextChange(filterText) {
    this.setState({ orFilterText: "" });
    this.setState({
        andFilterText: filterText
      },
      this.filterClassroomEvents
    );
  }

  handleOrFilterTextChange(filterText) {
    this.setState({ andFilterText: "" });
    this.setState({
        orFilterText: filterText
      },
      this.filterClassroomEventsWithOr
    );
  }

  render() {
    return (
      <div id="containers" className="mdl-grid">
      <FileDropArea
        handleDrop={this.handleDrop}
        />
        <ExportButton filteredClassroomEvents={this.state.filteredClassroomEvents}/>
        <Title title={this.state.title} />

        
        <Calendar
          filteredClassroomEvents={this.state.filteredClassroomEvents}
        />
        <SideBar
          orFilterText={this.state.orFilterText}
          andFilterText={this.state.andFilterText}
          onAndFilterTextChange={this.handleAndFilterTextChange}
          onOrFilterTextChange={this.handleOrFilterTextChange}
          warnings={this.state.warningList}
        />
      </div>
    );
  }
}

export default App;
