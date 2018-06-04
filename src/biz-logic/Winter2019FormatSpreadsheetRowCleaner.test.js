const Winter2019FormatSpreadsheetRowCleaner = require("./Winter2019FormatSpreadsheetRowCleaner");
const clean = new Winter2019FormatSpreadsheetRowCleaner().clean;

const macoWorksheetRows = [{
        "Schedule of Classes - Winter 2019": "Dept",
        "__EMPTY": "Course",
        "__EMPTY_1": "Description",
        "__EMPTY_2": "Sect",
        "__EMPTY_3": "Comp",
        "__EMPTY_4": "Del",
        "__EMPTY_5": "Plan \r\nEnrol",
        "__EMPTY_6": "Start\r\nDate",
        "__EMPTY_7": "End\r\nDate",
        "__EMPTY_8": "Forced \r\nDay",
        "__EMPTY_9": "Forced\r\nStart\r\nTime",
        "__EMPTY_10": "Forced\r\nDuration",
        "__EMPTY_11": "Pattern",
        "__EMPTY_12": "Assigned \r\nDay",
        "__EMPTY_13": "Assigned\r\nStart\r\nTime",
        "__EMPTY_14": "Assgn'd\r\nDuration",
        "__EMPTY_15": "Room \r\nReq'td\r\nType",
        "__EMPTY_16": "Room Assigned",
        "__EMPTY_17": "Reqt'd\r\nPavilion",
        "__EMPTY_18": "First \r\nName",
        "__EMPTY_19": "Last \r\nName",
        "__EMPTY_20": "Prime \r\nIndicate",
        "__EMPTY_21": "Rspblty \r\n%"
    },
    {
        "Schedule of Classes - Winter 2019": "MACO",
        "__EMPTY": "COMP1103",
        "__EMPTY_1": "Introduction to Computers",
        "__EMPTY_2": "1",
        "__EMPTY_3": "001",
        "__EMPTY_4": "1",
        "__EMPTY_5": "50",
        "__EMPTY_6": "1/3/19",
        "__EMPTY_7": "4/18/19",
        "__EMPTY_11": "D1.5X2",
        "__EMPTY_12": "Thursday",
        "__EMPTY_13": "13:00",
        "__EMPTY_14": "1:30",
        "__EMPTY_15": "CLS",
        "__EMPTY_16": "B217",
        "__EMPTY_17": "B-WING",
        "__EMPTY_18": "TBA001",
        "__EMPTY_19": "COMP",
        "__EMPTY_20": "Y",
        "__EMPTY_21": "100"
    },
    {
        "__EMPTY_5": "50",
        "__EMPTY_6": "1/3/19",
        "__EMPTY_7": "4/18/19",
        "__EMPTY_11": "D1.5X2",
        "__EMPTY_12": "Tuesday",
        "__EMPTY_13": "13:00",
        "__EMPTY_14": "1:30",
        "__EMPTY_15": "CLS",
        "__EMPTY_16": "B217",
        "__EMPTY_17": "B-WING",
        "__EMPTY_18": "TBA001",
        "__EMPTY_19": "COMP",
        "__EMPTY_20": "Y",
        "__EMPTY_21": "100"
    },
    {
        "__EMPTY_3": "501",
        "__EMPTY_4": "1",
        "__EMPTY_5": "25",
        "__EMPTY_6": "1/3/19",
        "__EMPTY_7": "4/18/19",
        "__EMPTY_11": "D1x1",
        "__EMPTY_12": "Thursday",
        "__EMPTY_13": "14:30",
        "__EMPTY_14": "1:00",
        "__EMPTY_15": "COMP - SCIE",
        "__EMPTY_16": "E203",
        "__EMPTY_17": "E-WING",
        "__EMPTY_18": "TBA001",
        "__EMPTY_19": "COMP",
        "__EMPTY_20": "Y",
        "__EMPTY_21": "100"
    },
    {
        "__EMPTY_3": "502",
        "__EMPTY_4": "1",
        "__EMPTY_5": "25",
        "__EMPTY_6": "1/3/19",
        "__EMPTY_7": "4/18/19",
        "__EMPTY_11": "D1x1",
        "__EMPTY_12": "Thursday",
        "__EMPTY_13": "10:00",
        "__EMPTY_14": "1:00",
        "__EMPTY_15": "COMP - SCIE",
        "__EMPTY_16": "E203",
        "__EMPTY_17": "E-WING",
        "__EMPTY_18": "TBA001",
        "__EMPTY_19": "COMP",
        "__EMPTY_20": "Y",
        "__EMPTY_21": "100"
    },
    {
        "__EMPTY_2": "2",
        "__EMPTY_3": "002",
        "__EMPTY_4": "1",
        "__EMPTY_5": "50",
        "__EMPTY_6": "1/3/19",
        "__EMPTY_7": "4/18/19",
        "__EMPTY_11": "D1.5X2",
        "__EMPTY_12": "Friday",
        "__EMPTY_13": "13:00",
        "__EMPTY_14": "1:30",
        "__EMPTY_15": "CLS",
        "__EMPTY_16": "T107",
        "__EMPTY_17": "B-WING",
        "__EMPTY_18": "TBA001",
        "__EMPTY_19": "COMP",
        "__EMPTY_20": "Y",
        "__EMPTY_21": "100"
    },
    {
        "__EMPTY_5": "50",
        "__EMPTY_6": "1/3/19",
        "__EMPTY_7": "4/18/19",
        "__EMPTY_11": "D1.5X2",
        "__EMPTY_12": "Wednesday",
        "__EMPTY_13": "13:00",
        "__EMPTY_14": "1:30",
        "__EMPTY_15": "CLS",
        "__EMPTY_16": "T107",
        "__EMPTY_17": "B-WING",
        "__EMPTY_18": "TBA001",
        "__EMPTY_19": "COMP",
        "__EMPTY_20": "Y",
        "__EMPTY_21": "100"
    },
    {
        "__EMPTY_3": "503",
        "__EMPTY_4": "1",
        "__EMPTY_5": "25",
        "__EMPTY_6": "1/3/19",
        "__EMPTY_7": "4/18/19",
        "__EMPTY_11": "D1x1",
        "__EMPTY_12": "Friday",
        "__EMPTY_13": "11:30",
        "__EMPTY_14": "1:00",
        "__EMPTY_15": "COMP - SCIE",
        "__EMPTY_16": "E203",
        "__EMPTY_17": "E-WING",
        "__EMPTY_18": "TBA001",
        "__EMPTY_19": "COMP",
        "__EMPTY_20": "Y",
        "__EMPTY_21": "100"
    },
    {
        "__EMPTY_3": "504",
        "__EMPTY_4": "1",
        "__EMPTY_5": "25",
        "__EMPTY_6": "1/3/19",
        "__EMPTY_7": "4/18/19",
        "__EMPTY_11": "D1x1",
        "__EMPTY_12": "Friday",
        "__EMPTY_13": "9:00",
        "__EMPTY_14": "1:00",
        "__EMPTY_15": "COMP - SCIE",
        "__EMPTY_16": "E203",
        "__EMPTY_17": "E-WING",
        "__EMPTY_18": "TBA001",
        "__EMPTY_19": "COMP",
        "__EMPTY_20": "Y",
        "__EMPTY_21": "100"
    },
    {
        "__EMPTY_2": "3",
        "__EMPTY_3": "003",
        "__EMPTY_4": "1",
        "__EMPTY_5": "50",
        "__EMPTY_6": "1/3/19",
        "__EMPTY_7": "4/18/19",
        "__EMPTY_11": "D1.5X2",
        "__EMPTY_12": "Thursday",
        "__EMPTY_13": "11:30",
        "__EMPTY_14": "1:30",
        "__EMPTY_15": "CLS",
        "__EMPTY_16": "T107",
        "__EMPTY_17": "B-WING",
        "__EMPTY_18": "TBA001",
        "__EMPTY_19": "COMP",
        "__EMPTY_20": "Y",
        "__EMPTY_21": "100"
    },
    {
        "__EMPTY_5": "50",
        "__EMPTY_6": "1/3/19",
        "__EMPTY_7": "4/18/19",
        "__EMPTY_11": "D1.5X2",
        "__EMPTY_12": "Tuesday",
        "__EMPTY_13": "11:30",
        "__EMPTY_14": "1:30",
        "__EMPTY_15": "CLS",
        "__EMPTY_16": "T107",
        "__EMPTY_17": "B-WING",
        "__EMPTY_18": "TBA001",
        "__EMPTY_19": "COMP",
        "__EMPTY_20": "Y",
        "__EMPTY_21": "100"
    },
    {
        "__EMPTY_3": "505",
        "__EMPTY_4": "1",
        "__EMPTY_5": "25",
        "__EMPTY_6": "1/3/19",
        "__EMPTY_7": "4/18/19",
        "__EMPTY_11": "D1x1",
        "__EMPTY_12": "Thursday",
        "__EMPTY_13": "9:00",
        "__EMPTY_14": "1:00",
        "__EMPTY_15": "COMP - SCIE",
        "__EMPTY_16": "E203",
        "__EMPTY_17": "E-WING",
        "__EMPTY_18": "TBA001",
        "__EMPTY_19": "COMP",
        "__EMPTY_20": "Y",
        "__EMPTY_21": "100"
    },
    {
        "__EMPTY_3": "506",
        "__EMPTY_4": "1",
        "__EMPTY_5": "25",
        "__EMPTY_6": "1/3/19",
        "__EMPTY_7": "4/18/19",
        "__EMPTY_11": "D1x1",
        "__EMPTY_12": "Tuesday",
        "__EMPTY_14": "1:00",
        "__EMPTY_15": "COMP - SCIE",
        "__EMPTY_16": "E203",
        "__EMPTY_17": "E-WING",
        "__EMPTY_18": "TBA001",
        "__EMPTY_19": "COMP",
        "__EMPTY_20": "Y",
        "__EMPTY_21": "100"
    }
];

const cleanedRows = clean(macoWorksheetRows);
// console.log(cleanedRows);

test("foo", () => {
    expect(true).toBeTruthy();
});
