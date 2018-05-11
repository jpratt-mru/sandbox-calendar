import React, { Component } from "react";
import ScheduledClassesApi from "./api/ScheduledClassesApi";
import Calendar from "./components/calendar/Calendar";
import SideBar from "./components/sidebar/SideBar";

class App extends Component {
  constructor(props) {
    super(props);
    const api = new ScheduledClassesApi();
    let eventsToDisplay = api.classes;
    this.state = {
      filterText: "",
      classroomEvents: eventsToDisplay
    };

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.filterClassroomEvents = this.filterClassroomEvents.bind(this);
  }

  containsSearchTerm(value, searchTerm) {
    return value.toLowerCase().indexOf(searchTerm) !== -1;
  }

  filterTerms() {
    let contents = this.state.filterText.toLowerCase();
    let splitContents = contents.split(/\s+/).filter(e => e.length > 0);
    return splitContents;
  }

  classroomEventMatchesFilter(classroomEvent, term) {
    const terms = filterTerms();
    if (terms.length === 0) {
      return true;
    }
    return terms.every(term =>
      this.containsSearchTerm(classroomEvent.title, term)
    );
  }

  filteredEvents() {
    return this.state.classroomEvents.filter(
      this.classroomEventMatchesFilter.bind(this, terms)
    );
  }

  filterClassroomEvents() {
    this.setState({ classroomEvents: [] });
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
      <div id="container" className="mdl-grid">
        <Calendar classroomEvents={this.state.classroomEvents} />
        <SideBar
          filterText={this.state.filterText}
          onFilterTextChange={this.handleFilterTextChange}
        />
      </div>
    );
  }
}

export default App;
