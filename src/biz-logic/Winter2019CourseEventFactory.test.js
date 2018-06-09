const Winter2019CourseEventFactory = require("./Winter2019CourseEventFactory");
const newEvent = new Winter2019CourseEventFactory().newEvent;

const oneSpreadsheetRow = {
    'Schedule of Classes - Winter 2019': 'MACO',
    __EMPTY: 'COMP1103',
    __EMPTY_1: 'Introduction to Computers',
    __EMPTY_2: '1',
    __EMPTY_3: '001',
    __EMPTY_4: '1',
    __EMPTY_5: '50',
    __EMPTY_6: '1/3/19',
    __EMPTY_7: '4/18/19',
    __EMPTY_11: 'D1.5X2',
    __EMPTY_12: 'Thursday',
    __EMPTY_13: '13:00',
    __EMPTY_14: '1:30',
    __EMPTY_15: 'CLS',
    __EMPTY_16: 'B217',
    __EMPTY_17: 'B-WING',
    __EMPTY_18: 'Jordan',
    __EMPTY_19: 'Pratt',
    __EMPTY_20: 'Y',
    __EMPTY_21: '100'
};

const courseEvent = newEvent(oneSpreadsheetRow);

// just a little helper to create a shallow copy
const clonedObject = function(origObject) {
    return JSON.parse(JSON.stringify(origObject));
};

test("it correctly creates a course attribute", () => {
    expect(courseEvent).toHaveProperty('course', 'COMP1103');
});

describe("instructor attributes", () => {
    test("are correctly created if a normal name exists in the spreadsheet row", () => {
        expect(courseEvent).toHaveProperty('instructor', 'Jordan Pratt');
    });

    test("become TBA if the first name in the spreadsheet row begins with tba", () => {
        let tbaRow = clonedObject(oneSpreadsheetRow);

        tbaRow["__EMPTY_18"] = 'TBA001'; // __EMPTY_18 is the first name row

        const courseEvent = newEvent(tbaRow);
        expect(courseEvent).toHaveProperty('instructor', 'TBA');
    });

    test("become TBA if the first name in the spreadsheet row doesn't exist", () => {
        let tbaRow = clonedObject(oneSpreadsheetRow);

        delete tbaRow["__EMPTY_18"]; // __EMPTY_18 is the first name row

        const courseEvent = newEvent(tbaRow);
        expect(courseEvent).toHaveProperty('instructor', 'TBA');
    });

});

describe("username attributes", () => {
    test("are correctly created if a normal name exists in the spreadsheet row", () => {
        expect(courseEvent).toHaveProperty('username', 'jpratt');
    });

    test("become TBA if the first name in the spreadsheet row begins with tba", () => {
        let tbaRow = clonedObject(oneSpreadsheetRow);

        tbaRow["__EMPTY_18"] = 'TBA001'; // __EMPTY_18 is the first name row

        const courseEvent = newEvent(tbaRow);
        expect(courseEvent).toHaveProperty('username', 'TBA');
    });

    test("become TBA if the first name in the spreadsheet row doesn't exist", () => {
        let tbaRow = clonedObject(oneSpreadsheetRow);

        delete tbaRow["__EMPTY_18"]; // __EMPTY_18 is the first name row

        const courseEvent = newEvent(tbaRow);
        expect(courseEvent).toHaveProperty('username', 'TBA');
    });

});

describe("room attributes", () => {
    test("are the room name if the spreadsheet row has a room", () => {
        expect(courseEvent).toHaveProperty('room', 'B217');
    });
});

test("have a correct section number", () => {
    expect(courseEvent).toHaveProperty('section', '001');
});
