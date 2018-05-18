import React, { Component } from "react";
import ExportButton from "./components/export-button/ExportButton";
import Calendar from "./components/calendar/Calendar";
import SideBar from "./components/sidebar/SideBar";
import EventFilter from "./biz-logic/EventFilter";
import WarningBuilder from "./biz-logic/WarningBuilder";
import SemesterSchedule from './biz-logic/SemesterSchedule';
import XLSX from 'xlsx';
import Dropzone from 'react-dropzone';
import CourseStartAndEndCalculator from './biz-logic/CourseStartAndEndCalculator';
// var FileSaver = require('file-saver');
// var Blob = require('blob');
const moment = require("moment");
const courseStartAndEndCalculator = new CourseStartAndEndCalculator();



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
      warningList: warnings
    };

    this.filterClassroomEvents = this.filterClassroomEvents.bind(this);
    this.filteredEvents = this.filteredEvents.bind(this);
    this.handleAndFilterTextChange = this.handleAndFilterTextChange.bind(this);
    this.handleOrFilterTextChange = this.handleOrFilterTextChange.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }


  onDrop(acceptedFiles, rejectedFiles) {
    let courses = [];
    acceptedFiles.forEach(file => {
      let rABS = true;
      const reader = new FileReader();
      reader.onload = () => {
        let fileAsBinaryString = reader.result;
        if (!rABS) fileAsBinaryString = new Uint8Array(fileAsBinaryString);
        var workbook = XLSX.read(fileAsBinaryString, { type: rABS ? 'binary' : 'array' });

        const macoWorksheet = workbook.Sheets["MACO"];
        const worksheetAsText = XLSX.utils.sheet_to_json(macoWorksheet);
        const filteredOne = worksheetAsText.filter((row, index) => index > 0).filter(row => row["__EMPTY_13"]);

        let id = 1;
        filteredOne.forEach(function(row, index, array) {
          let course = {};
          course["id"] = id++;
          if (row.hasOwnProperty("__EMPTY")) {
            course["course"] = row["__EMPTY"];
          }
          else {
            const prevCourse = courses[courses.length - 1];
            course["course"] = prevCourse["course"];
          }
          if (row.hasOwnProperty("__EMPTY_3")) {
            course["section"] = row["__EMPTY_3"];
          }
          else {
            const prevCourse = courses[courses.length - 1];
            course["section"] = prevCourse["section"];
          }
          course["username"] = `${row["__EMPTY_18"] ? row["__EMPTY_18"][0].toLowerCase() : ""}${row["__EMPTY_19"] ? row["__EMPTY_19"].toLowerCase() : "-"}`;
          course["instructor"] = `${row["__EMPTY_18"]} ${row["__EMPTY_19"]}`;
          course["room"] = row["__EMPTY_16"];
          const classDuration = moment.duration(row["__EMPTY_14"]);
          console.log(classDuration);
          const startOfSemesterDate = row["__EMPTY_6"];
          const classDayOfWeek = row["__EMPTY_12"];
          const classStartTime = row["__EMPTY_13"];
          const plannedEnrollment = row["__EMPTY_5"];
          course["sectionCapacity"] = parseInt(plannedEnrollment, 10);
          const splitClassStartTime = classStartTime.split(":");
          const classStartHour = parseInt(splitClassStartTime[0], 10);
          const classStartMin = parseInt(splitClassStartTime[1], 10);
          // const firstMonday = courseStartAndEndCalculator.start("Monday", row["__EMPTY_6"]);

          // const s = moment(firstMonday).format("MM/DD/YY");
          // const start = courseStartAndEndCalculator.first(row["__EMPTY_12"], s);
          // const end = courseStartAndEndCalculator.last(row["__EMPTY_12"], row["__EMPTY_7"]);
          let firstDayOfClass = courseStartAndEndCalculator.start(startOfSemesterDate, classDayOfWeek);
          let startAsMoment = moment(firstDayOfClass, moment.HTML5_FMT.DATETIME_LOCAL);
          startAsMoment.hour(classStartHour);
          startAsMoment.minute(classStartMin);
          // let startAsMoment = moment(`${start} ${row["__EMPTY_13"]}`, "YYYY-MM-DD HH:mm");
          // if (startAsMoment.day() == 0) startAsMoment.subtract(7, 'days');
          let endAsMoment = moment(startAsMoment);
          endAsMoment.add(classDuration).subtract(10, 'minutes');

          course["start"] = startAsMoment.format();
          course["end"] = endAsMoment.format();
          course["title"] = `${course.course}-${course.section} [${course.username}]\n${course.room}`;
          courses.push(course);
        });
        // const filteredTwo = filteredOne.map((row, index, array) => row.hasOwnProperty("__EMPTY") ? { course: row["__EMPTY"] } : { course: undefined });
        console.log(courses);
        this.setState({ allClassroomEvents: courses });
        this.setState({ filteredClassroomEvents: courses });
        let semesterSchedule = {
          events: function() { return courses; }
        };
        let warningBuilder = new WarningBuilder();
        warningBuilder.add("RoomCapacityIssueDetector");
        warningBuilder.add("RoomDoubleBookingIssueDetector");
        warningBuilder.add("InstructorDoubleBookingIssueDetector");
        let warnings = warningBuilder.warningsFor(semesterSchedule);

        this.setState({ warningList: warnings });
        // console.log(workbook);
        // var blob = new Blob([worksheetAsText], { type: "application/json;charset=utf-8" });
        // FileSaver.saveAs(blob, "calAsJSON.json");
      };
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');

      reader.readAsBinaryString(file);

    });
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
      <Dropzone onDrop={this.onDrop.bind(this)}>
            <p>Try dropping some files here, or click to select files to upload.</p>
          </Dropzone>
        <ExportButton filteredClassroomEvents={this.state.filteredClassroomEvents}/>
        <div className="mdl-cell"><h1>Winter 2018 (Draft)</h1></div>
        
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
