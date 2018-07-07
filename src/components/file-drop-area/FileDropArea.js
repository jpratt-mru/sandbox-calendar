import React from "react";
import XLSX from 'xlsx';
import Dropzone from 'react-dropzone';
import CourseEventFactory from "../../biz-logic/CourseEventFactory";
import RowCleanerFactory from "../../biz-logic/RowCleanerFactory";
import HtmlParserFactory from "../../biz-logic/HtmlParserFactory";
import cheerio from 'cheerio';

import './file-drop-area.css';

const courseEventFactory = new CourseEventFactory().create("winter-2019-format");
const spreadsheetRowCleaner = new RowCleanerFactory().create("winter-2019-format");
const htmlDumpParser = new HtmlParserFactory().create("fall-2018-format");

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
        if (file.name.match(/\.xlsx?$/i)) {
            processDroppedSpreadsheetFile(file, props);
        }
        else {
            processDroppedScrapeFile(file, props);
        }
    });
}

/**
 * Takes a schedule scrape from mymru and builds a list of classes from it. This
 * list is processed in App.js' handleFileDrop() method.
 */
function processDroppedScrapeFile(file, props) {
    const reader = new FileReader();
    reader.onload = () => {
        let rawRows = [];
        // let sections = [];
        const $ = cheerio.load(reader.result);

        $('table.datadisplaytable td').each(function() {
            rawRows.push($(this).text());
        });
        const parsedClassroomEvents = htmlDumpParser.parse(rawRows);

        /*
        let id = 1;
        parsedRows.forEach(row => {
            let section = courseEventFactory.newEvent(row, id);
            sections.push(section);
            id++;
        });
        */
        props.handleFileDrop(parsedClassroomEvents);

    };

    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');

    reader.readAsText(file);
}


/**
 * Takes a spreadsheet file and builds a list of classes from it. This
 * list is processed in App.js' handleFileDrop() method.
 */
function processDroppedSpreadsheetFile(file, props) {
    const reader = new FileReader();
    reader.onload = () => {
        let sections = [];
        const fileAsBinaryString = reader.result;
        const workbook = XLSX.read(fileAsBinaryString, { type: 'binary' });
        const macoWorksheet = XLSX.utils.sheet_to_json(workbook.Sheets["MACO"]);
        const cleanedSpreadsheetRows = spreadsheetRowCleaner.clean(macoWorksheet);

        let id = 1;
        cleanedSpreadsheetRows.forEach(row => {
            let section = courseEventFactory.newEvent(row, id);
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
