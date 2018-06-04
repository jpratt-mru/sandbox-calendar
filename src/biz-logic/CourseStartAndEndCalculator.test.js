let CourseStartAndEndCalculator = require("./CourseStartAndEndCalculator");

const courseStartAndEndCalculator = new CourseStartAndEndCalculator();
const start = courseStartAndEndCalculator.start;

describe("when first day of semester is a Thursday", () => {
    const firstDayOfSemesterDirty = "1/3/19";
    test("Monday returns the next full week's Monday", () => {
        const expectedDate = "2019-01-07T00:00:00+00:00";
        expect(start(firstDayOfSemesterDirty, "Monday")).toEqual(expectedDate);
    });
    test("Tuesday returns the next full week's Tuesday", () => {
        const expectedDate = "2019-01-08T00:00:00+00:00";
        expect(start(firstDayOfSemesterDirty, "Tuesday")).toEqual(expectedDate);
    });
    test("Wednesday returns the next full week's Wednesday", () => {
        const expectedDate = "2019-01-09T00:00:00+00:00";
        expect(start(firstDayOfSemesterDirty, "Wednesday")).toEqual(expectedDate);
    });
    test("Thursday returns the next full week's Thursday", () => {
        const expectedDate = "2019-01-10T00:00:00+00:00";
        expect(start(firstDayOfSemesterDirty, "Thursday")).toEqual(expectedDate);
    });
    test("Friday returns the next full week's Friday", () => {
        const expectedDate = "2019-01-11T00:00:00+00:00";
        expect(start(firstDayOfSemesterDirty, "Friday")).toEqual(expectedDate);
    });
    test("Saturday returns the next full week's Saturday", () => {
        const expectedDate = "2019-01-12T00:00:00+00:00";
        expect(start(firstDayOfSemesterDirty, "Saturday")).toEqual(expectedDate);
    });
    test("Sunday returns the next full week's Sunday", () => {
        const expectedDate = "2019-01-13T00:00:00+00:00";
        expect(start(firstDayOfSemesterDirty, "Sunday")).toEqual(expectedDate);
    });
});

describe("when first day of semester is a Monday", () => {
    const firstDayOfSemesterDirty = "1/7/19";
    test("Monday returns the next full week's Monday", () => {
        const expectedDate = "2019-01-07T00:00:00+00:00";
        expect(start(firstDayOfSemesterDirty, "Monday")).toEqual(expectedDate);
    });
    test("Tuesday returns the next full week's Tuesday", () => {
        const expectedDate = "2019-01-08T00:00:00+00:00";
        expect(start(firstDayOfSemesterDirty, "Tuesday")).toEqual(expectedDate);
    });
    test("Wednesday returns the next full week's Wednesday", () => {
        const expectedDate = "2019-01-09T00:00:00+00:00";
        expect(start(firstDayOfSemesterDirty, "Wednesday")).toEqual(expectedDate);
    });
    test("Thursday returns the next full week's Thursday", () => {
        const expectedDate = "2019-01-10T00:00:00+00:00";
        expect(start(firstDayOfSemesterDirty, "Thursday")).toEqual(expectedDate);
    });
    test("Friday returns the next full week's Friday", () => {
        const expectedDate = "2019-01-11T00:00:00+00:00";
        expect(start(firstDayOfSemesterDirty, "Friday")).toEqual(expectedDate);
    });
});

describe("when first day of semester is a Friday", () => {
    const firstDayOfSemesterDirty = "1/4/19";
    test("Monday returns the next full week's Monday", () => {
        const expectedDate = "2019-01-07T00:00:00+00:00";
        expect(start(firstDayOfSemesterDirty, "Monday")).toEqual(expectedDate);
    });
    test("Tuesday returns the next full week's Tuesday", () => {
        const expectedDate = "2019-01-08T00:00:00+00:00";
        expect(start(firstDayOfSemesterDirty, "Tuesday")).toEqual(expectedDate);
    });
    test("Wednesday returns the next full week's Wednesday", () => {
        const expectedDate = "2019-01-09T00:00:00+00:00";
        expect(start(firstDayOfSemesterDirty, "Wednesday")).toEqual(expectedDate);
    });
    test("Thursday returns the next full week's Thursday", () => {
        const expectedDate = "2019-01-10T00:00:00+00:00";
        expect(start(firstDayOfSemesterDirty, "Thursday")).toEqual(expectedDate);
    });
    test("Friday returns the next full week's Friday", () => {
        const expectedDate = "2019-01-11T00:00:00+00:00";
        expect(start(firstDayOfSemesterDirty, "Friday")).toEqual(expectedDate);
    });
});

describe("when first day of semester is a Tuesday", () => {
    const firstDayOfSemesterDirty = "1/1/19";
    test("Monday returns the next full week's Monday", () => {
        const expectedDate = "2019-01-07T00:00:00+00:00";
        expect(start(firstDayOfSemesterDirty, "Monday")).toEqual(expectedDate);
    });
    test("Tuesday returns the next full week's Tuesday", () => {
        const expectedDate = "2019-01-08T00:00:00+00:00";
        expect(start(firstDayOfSemesterDirty, "Tuesday")).toEqual(expectedDate);
    });
    test("Wednesday returns the next full week's Wednesday", () => {
        const expectedDate = "2019-01-09T00:00:00+00:00";
        expect(start(firstDayOfSemesterDirty, "Wednesday")).toEqual(expectedDate);
    });
    test("Thursday returns the next full week's Thursday", () => {
        const expectedDate = "2019-01-10T00:00:00+00:00";
        expect(start(firstDayOfSemesterDirty, "Thursday")).toEqual(expectedDate);
    });
    test("Friday returns the next full week's Friday", () => {
        const expectedDate = "2019-01-11T00:00:00+00:00";
        expect(start(firstDayOfSemesterDirty, "Friday")).toEqual(expectedDate);
    });
});
