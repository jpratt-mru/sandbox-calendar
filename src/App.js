import React, { Component } from "react";
import ScheduledClassesApi from "./api/ScheduledClassesApi";
import Calendar from "./components/calendar/Calendar";
import SideBar from "./components/sidebar/SideBar";
import EventFilter from "./biz-logic/EventFilter";

class App extends Component {
  constructor(props) {
    super(props);
    const api = new ScheduledClassesApi();
    let eventsToDisplay = api.classes;
    this.state = {
      filterText: "",
      classroomEvents: eventsToDisplay,
      currentEvents: eventsToDisplay
    };

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.filterClassroomEvents = this.filterClassroomEvents.bind(this);
    this.filterTerms = this.filterTerms.bind(this);
  }

  containsSearchTerm(value, searchTerm) {
    return value.toLowerCase().indexOf(searchTerm) !== -1;
  }

  filterTerms() {
    let contents = this.state.filterText.toLowerCase();
    let splitContents = contents.split(/\s+/).filter(e => e.length > 0);
    return splitContents;
  }

  classroomEventMatchesFilter(classroomEvent) {
    const terms = this.filterTerms();
    if (terms.length === 0) {
      return true;
    }
    return terms.every(term =>
      this.containsSearchTerm(classroomEvent.title, term)
    );
  }

  filteredEvents() {
    const eventFilter = new EventFilter();
    const allEvents = this.state.classroomEvents;
    const filterText = this.state.filterText;

    return allEvents.filter(event =>
      eventFilter.eventMatchesFilterText(event.terms, filterText)
    );
  }

  filterClassroomEvents() {
    this.setState({ currentEvents: this.filteredEvents() });
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
        <Calendar currentEvents={this.state.currentEvents} />
        <SideBar
          filterText={this.state.filterText}
          onFilterTextChange={this.handleFilterTextChange}
        />
      </div>
    );
  }
}

export default App;
