import React from "react";
import XLSX from 'xlsx';
import Dropzone from 'react-dropzone';
import CourseStartAndEndCalculator from '../../biz-logic/CourseStartAndEndCalculator';
import CourseFactory from "../../biz-logic/CourseFactory";
import RowCleanerFactory from "../../biz-logic/RowCleanerFactory";
import './file-drop-area.css';

const moment = require("moment");
const courseStartAndEndCalculator = new CourseStartAndEndCalculator();
const courseFactory = new CourseFactory().create("winter-2019-format");
const spreadsheetRowCleaner = new RowCleanerFactory().create("winter-2019-format");
const divStyle = {


};



function onDrop(props, acceptedFiles, rejectedFiles) {
    let courses = [];
    acceptedFiles.forEach(file => {
        let rABS = true;
        const reader = new FileReader();
        reader.onload = () => {
            let fileAsBinaryString = reader.result;
            if (!rABS) fileAsBinaryString = new Uint8Array(fileAsBinaryString);
            var workbook = XLSX.read(fileAsBinaryString, { type: rABS ? 'binary' : 'array' });
            const courseRows = spreadsheetRowCleaner.clean(workbook);

            const macoWorksheet = workbook.Sheets["MACO"];
            const worksheetAsText = XLSX.utils.sheet_to_json(macoWorksheet);
            const filteredOne = worksheetAsText.filter((row, index) => index > 0).filter(row => row["__EMPTY_13"]);

            let id = 1;
            filteredOne.forEach(function(row, index, array) {
                // let courseFactory = CourseFactory.new("winter-2019-format");
                // let course  = courseFactory.createFrom(spreadsheetRow);
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
                course["crn"] = `${course["course"]}${course["section"]}`;
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

            props.handleDrop(courses);
        };
        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');

        reader.readAsBinaryString(file);

    });
}

function FileDropArea(props) {
    return (

        <div className="dropzone mdl-cell mdl-cell--12-col">
          <Dropzone style={divStyle} onDrop={onDrop.bind(this, props)}>
            <span>Drop your spreadsheet here, or click to open a file dialog.</span>
          </Dropzone>
        </div>

    );
}

export default FileDropArea;
