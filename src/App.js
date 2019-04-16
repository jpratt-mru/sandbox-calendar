import React, { Component } from "react";
import ExportButton from "./components/export-button/ExportButton";
import Calendar from "./components/calendar/Calendar";
import SideBar from "./components/sidebar/SideBar";
import FileDropArea from "./components/file-drop-area/FileDropArea";
import EventFilter from "./biz-logic/EventFilter";
import Title from "./components/title/Title";
import WarningBuilder from "./biz-logic/WarningBuilder";
import ColorDecorator from "./biz-logic/ColorDecorator";
import XLSX from 'xlsx';
import cheerio from 'cheerio';
import HtmlParserFactory from "./biz-logic/HtmlParserFactory";

import CourseEventFactory from "./biz-logic/CourseEventFactory";
import RowCleanerFactory from "./biz-logic/RowCleanerFactory";

import './styles/printrules.css';

const courseEventFactory = new CourseEventFactory().create("winter-2019-format");
const spreadsheetRowCleaner = new RowCleanerFactory().create("winter-2019-format");
const htmlDumpParser = new HtmlParserFactory().create("fall-2018-format");

const moment = require("moment");

const eventFilter = new EventFilter();
const ANDfilter = eventFilter.eventMatchesAllFilterText;
const ORfilter = eventFilter.eventMatchesAnyFilterText;



class App extends Component {

  constructor(props) {
    super(props);

    const warningBuilder = new WarningBuilder();
    warningBuilder.add("RoomCapacityIssueDetector");
    warningBuilder.add("RoomDoubleBookingIssueDetector");
    warningBuilder.add("InstructorDoubleBookingIssueDetector");

    this.state = {
      orFilterText: "",
      andFilterText: "",
      classEvents: [],
      filteredClassEvents: [],
      warningList: [],
      warningBuilder: warningBuilder,
      mondayOfFirstFullWeek: "",
      fridayOfFirstFullWeek: ""
    };

    this.handleAndFilterTextChange = this.handleAndFilterTextChange.bind(this);
    this.handleOrFilterTextChange = this.handleOrFilterTextChange.bind(this);
    this.handleFileDrop = this.handleFileDrop.bind(this);
  }



  isOnMonday(event) {
    const eventStartDate = moment(event.start);
    return eventStartDate.day() === 1;
  }

  /**
   * FullCalendar expects start range of agenda calendar view to
   * be in YYYY-MM-DD format. For example, "2019-01-07".
   */
  rangeStart() {
    const firstClassOnMonday = this.state.classEvents.find(event => this.isOnMonday(event));
    return firstClassOnMonday === undefined ? "2017-09-11" : moment(firstClassOnMonday.start).format("YYYY-MM-DD");
  }

  /**
   * FullCalendar expects end range of agenda calendar view to
   * be in YYYY-MM-DD format. For example, "2019-01-11".
   * 
   * The range end is actually the Saturday of the week - when FullCalendar
   * takes in a display range, the end day is exclusive!
   */
  rangeEnd() {
    return moment(this.rangeStart()).add(5, 'd').format("YYYY-MM-DD");
  }
  /*
    componentDidMount() {
      fetch(process.env.PUBLIC_URL + "/raw-data/fall-2018.html")
        .then(response => response.text())
        .then(
          (result) => {
            let rawRows = [];
            // let sections = [];
            // console.log("result", result);
            const $ = cheerio.load(result);

            $('table.datadisplaytable td').each(function() {
              rawRows.push($(this).text());
            });
            const parsedClassroomEvents = htmlDumpParser.parse(rawRows);

            this.handleFileDrop(parsedClassroomEvents);

          },
          (error) => {
            console.log("error processing scrape file");
          });
    }
  */

  componentDidMount() {
    fetch(process.env.PUBLIC_URL + "/raw-data/fall-2018.xlsx")
      .then(response => response.arrayBuffer())
      .then(
        (result) => {
          let sections = [];

          let data = new Uint8Array(result);
          const workbook = XLSX.read(data, { type: 'array' });
          const macoWorksheet = XLSX.utils.sheet_to_json(workbook.Sheets["MACO"]);
          const cleanedSpreadsheetRows = spreadsheetRowCleaner.clean(macoWorksheet);
          let id = 1;
          cleanedSpreadsheetRows.forEach(row => {
            let section = courseEventFactory.newEvent(row, id);
            sections.push(section);
            id++;
          });
          this.handleFileDrop(sections);

        },
        (error) => {
          console.log("error");
        });
  }


  /**
   * Clears the filter boxes and empties out the class events.
   */
  clearScreen() {
    this.setState({ orFilterText: "" });
    this.setState({ andFilterText: "" });
    this.setState({ classEvents: [] });
    this.setState({ filteredClassEvents: [] });
    this.setState({ warningList: [] });
    this.setState({ mondayOfFirstFullWeek: "" });
    this.setState({ fridayOfFirstFullWeek: "" });
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

    const coloredClassroomEvents = ColorDecorator.decoratedEvents(classes);
    this.setState({ classEvents: coloredClassroomEvents });
    this.setState({ filteredClassEvents: coloredClassroomEvents });

    // TODO: this needs to be a "real" SemesterSchedule eventually
    let semesterSchedule = {
      events() { return classes; }
    };

    const warnings = this.state.warningBuilder.warningsFor(semesterSchedule);
    this.setState({ warningList: warnings });

    this.setState({ mondayOfFirstFullWeek: this.rangeStart() });
    this.setState({ fridayOfFirstFullWeek: this.rangeEnd() });
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
          mondayOfFirstFullWeek= {this.state.mondayOfFirstFullWeek}
          fridayOfFirstFullWeek = {this.state.fridayOfFirstFullWeek}
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
