import React, { Component } from "react";
import ScheduledClassesApi from "./api/ScheduledClassesApi";
import Calendar from "./components/calendar/Calendar";
import SideBar from "./components/sidebar/SideBar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
      classroomEvents: []
    };

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  render() {
    return (
      <div id="container" className="mdl-grid">
        <Calendar />
        <SideBar
          filterText={this.state.filterText}
          onFilterTextChange={this.handleFilterTextChange}
        />
      </div>
    );
  }
}

export default App;
