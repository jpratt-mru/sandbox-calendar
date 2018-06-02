import React, { Component } from "react";
import ExportButton from "./components/export-button/ExportButton";
import Calendar from "./components/calendar/Calendar";
import SideBar from "./components/sidebar/SideBar";
import FileDropArea from "./components/file-drop-area/FileDropArea";
import EventFilter from "./biz-logic/EventFilter";
import Title from "./components/title/Title";
import WarningBuilder from "./biz-logic/WarningBuilder";
import SemesterSchedule from './biz-logic/SemesterSchedule';

const eventFilter = new EventFilter();
const ANDfilter = eventFilter.eventMatchesAllFilterText;
const ORfilter = eventFilter.eventMatchesAnyFilterText;

class App extends Component {

  constructor(props) {
    super(props);

    const semesterSchedule = new SemesterSchedule();
    const warningBuilder = new WarningBuilder();


    warningBuilder.add("RoomCapacityIssueDetector");
    warningBuilder.add("RoomDoubleBookingIssueDetector");
    warningBuilder.add("InstructorDoubleBookingIssueDetector");

    const initialClassEvents = semesterSchedule.events();
    const warnings = warningBuilder.warningsFor(semesterSchedule);

    this.state = {
      orFilterText: "",
      andFilterText: "",
      classEvents: initialClassEvents,
      filteredClassEvents: initialClassEvents,
      warningList: warnings,
      warningBuilder: warningBuilder,
      firstMonday: ""
    };


    this.handleAndFilterTextChange = this.handleAndFilterTextChange.bind(this);
    this.handleOrFilterTextChange = this.handleOrFilterTextChange.bind(this);
    this.handleFileDrop = this.handleFileDrop.bind(this);
  }

  /**
   * Clears the filter boxes and empties out the class events.
   */
  clearScreen() {
    this.setState({ classEvents: [] });
    this.setState({ filteredClassEvents: [] });
    this.setState({ orFilterText: "" });
    this.setState({ andFilterText: "" });
  }

  /**
   * When a file is dropped in the target area, we need to clear the screen,
   * load the classes from the file into state, and display any new warnings
   * associated with the classes in the file.
   * 
   * Called from the FileDropArea component.
   * 
   * @param {array} classes - The classes from the dropped file.
   */
  handleFileDrop(classes) {
    this.clearScreen();

    this.setState({ classEvents: classes });
    this.setState({ filteredClassEvents: classes });

    // TODO: this needs to be a "real" SemesterSchedule eventually
    let semesterSchedule = {
      events() { return classes; }
    };

    const warnings = this.state.warningBuilder.warningsFor(semesterSchedule);
    this.setState({ warningList: warnings });
  }

  /**
   * Return all class events filtered with a given filter.
   * 
   * For example if you have an AND filter going on and the filter text
   * is "B107 jordan", then all class events where the room is B107 and
   * instructor has a name of "jordan" would be included.
   * 
   * @param {function} filterFunction - The function used to filter class events.
   * @param {string} filterText - The text currently in the filter input.
   * @return {array} All events that meet the filter.
   */
  eventsFilteredWith(filterFunction, filterText) {
    const allClassEvents = this.state.classEvents;

    return allClassEvents.filter(event => filterFunction(event, filterText));
  }

  /**
   * Return all class events that meet an AND filter.
   * 
   * @return {array} All events that have all of the filter text terms in them.
   */
  eventsFilteredWithAND() {
    const filterText = this.state.andFilterText;
    return this.eventsFilteredWith(ANDfilter, filterText);
  }

  /**
   * Return all class events that meet an OR filter.
   * 
   * @return {array} All events that have at least one of the filter text terms in them.
   */
  eventsFilteredWithOR() {
    const filterText = this.state.orFilterText;
    return this.eventsFilteredWith(ORfilter, filterText);
  }

  filterClassEventsWithAND() {
    this.setState({ filteredClassEvents: this.eventsFilteredWithAND() });
  }

  filterClassEventsWithOR() {
    this.setState({ filteredClassEvents: this.eventsFilteredWithOR() });
  }

  handleAndFilterTextChange(filterText) {
    // clear the other text box first
    this.setState({ orFilterText: "" });

    this.setState({
        andFilterText: filterText
      },
      this.filterClassEventsWithAND
    );
  }

  handleOrFilterTextChange(filterText) {
    this.setState({ andFilterText: "" });
    this.setState({
        orFilterText: filterText
      },
      this.filterClassEventsWithOR
    );
  }

  render() {
    const filteredClassEvents = this.state.filteredClassEvents;
    return (
      <div id="containers" className="mdl-grid">
        <FileDropArea
          handleFileDrop={ this.handleFileDrop }
        /> 
        <ExportButton 
          filteredClassEvents = { filteredClassEvents }
        /> 
        <Title 
          classEvents = { filteredClassEvents }
        />
        <Calendar
          filteredClassEvents={ filteredClassEvents }
        />
        <SideBar
          orFilterText={ this.state.orFilterText }
          andFilterText={ this.state.andFilterText }
          onAndFilterTextChange={ this.handleAndFilterTextChange }
          onOrFilterTextChange={ this.handleOrFilterTextChange }
          warnings={ this.state.warningList }
        />
      </div>
    );
  }
}

export default App;
