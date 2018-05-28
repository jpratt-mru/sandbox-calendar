import React from "react";
import XLSX from 'xlsx';
import Dropzone from 'react-dropzone';
import CourseFactory from "../../biz-logic/CourseFactory";
import RowCleanerFactory from "../../biz-logic/RowCleanerFactory";

import './file-drop-area.css';

const courseFactory = new CourseFactory().create("winter-2019-format");
const spreadsheetRowCleaner = new RowCleanerFactory().create("winter-2019-format");

/**
 * The weird style = {{}} thing is to stop the default Dropzone css
 * from coming in.
 */
function FileDropArea(props) {
    return (
        <div className="dropzone mdl-cell mdl-cell--12-col">
          <Dropzone style = { {} } onDrop={onDrop.bind(this, props)}>
            <span>Drop your spreadsheet here, or click to open a file dialog.</span>
          </Dropzone>
        </div>
    );
}


function onDrop(props, acceptedFiles) {
    acceptedFiles.forEach(file => {
        processDroppedFile(file, props);
    });
}

/**
 * Takes a file (currently only a spreadsheet, but will eventually also
 * handle HTML schedule dumps) and builds a list of classes from it. This
 * list is processed in App.js' handleFileDrop() method.
 */
function processDroppedFile(file, props) {
    const reader = new FileReader();
    reader.onload = () => {
        let sections = [];
        const fileAsBinaryString = reader.result;
        const workbook = XLSX.read(fileAsBinaryString, { type: 'binary' });
        const macoWorksheet = XLSX.utils.sheet_to_json(workbook.Sheets["MACO"]);
        const cleanedSpreadsheetRows = spreadsheetRowCleaner.clean(macoWorksheet);

        let id = 1;
        cleanedSpreadsheetRows.forEach(row => {
            let section = courseFactory.createSection(row, id);
            sections.push(section);
            id++;
        });
        props.handleFileDrop(sections);
    };
    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');

    reader.readAsBinaryString(file);
}



export default FileDropArea;
