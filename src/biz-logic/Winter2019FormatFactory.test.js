const Winter2019FormatFactory = require("./Winter2019FormatFactory");
const createSection = new Winter2019FormatFactory().createSection;

const oneRow = {
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

const createdSection = createSection(oneRow);

test("it correctly creates a course attribute", () => {
    expect(createdSection).toHaveProperty('course', 'COMP1103');
});

describe("instructor attributes", () => {
    test("are correctly created if a normal name exists in the spreadsheet row", () => {
        expect(createdSection).toHaveProperty('instructor', 'Jordan Pratt');
    });

    test("become TBA if the first name in the spreadsheet row begins with tba", () => {
        let tbaRow = {
            __EMPTY: 'COMP1103',
            __EMPTY_18: 'TBA001',
            __EMPTY_19: 'COMP',
        };
        let createdSection = createSection(tbaRow);
        expect(createdSection).toHaveProperty('instructor', 'TBA');
    });

    test("become TBA if the first name in the spreadsheet row doesn't exist", () => {
        let tbaRow = {
            __EMPTY: 'COMP1103',
            __EMPTY_19: 'COMP'
        };
        let createdSection = createSection(tbaRow);
        expect(createdSection).toHaveProperty('instructor', 'TBA');
    });

});

describe("username attributes", () => {
    test("are correctly created if a normal name exists in the spreadsheet row", () => {
        expect(createdSection).toHaveProperty('username', 'jpratt');
    });

    test("become TBA if the first name in the spreadsheet row begins with tba", () => {
        let tbaRow = JSON.parse(JSON.stringify(oneRow));
        tbaRow["__EMPTY_18"] = 'TBA001';
        tbaRow["__EMPTY_19"] = 'COMP';

        let createdSection = createSection(tbaRow);
        expect(createdSection).toHaveProperty('username', 'TBA');
    });

    test("become TBA if the first name in the spreadsheet row doesn't exist", () => {
        // __EMPTY_18 is the first name row
        let tbaRow = JSON.parse(JSON.stringify(oneRow));
        tbaRow["__EMPTY_19"] = 'COMP';
        delete tbaRow["__EMPTY_18"];

        let createdSection = createSection(tbaRow);
        expect(createdSection).toHaveProperty('username', 'TBA');
    });

});

describe("room attributes", () => {
    test("are the room name if the spreadsheet row has a room", () => {
        expect(createdSection).toHaveProperty('room', 'B217');
    });
});

test("have a correct section number", () => {
    expect(createdSection).toHaveProperty('section', '001');
});
