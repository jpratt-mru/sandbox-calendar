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
  }

  render() {
    return (
      <div>
        <Calendar />
        <SideBar />
      </div>
    );
  }
}

export default App;
