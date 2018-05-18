let CourseStartAndEndCalculator = require("./CourseStartAndEndCalculator");

const courseStartAndEndCalculator = new CourseStartAndEndCalculator();
const start = courseStartAndEndCalculator.start;

describe("when first day of semester is a Thursday", () => {
    const firstDayOfSemester = "1/3/19";
    test("Monday returns the next full week's Monday", () => {
        const expectedDate = "2019-01-07T00:00:00+00:00";
        expect(start(firstDayOfSemester, "Monday")).toEqual(expectedDate);
    });
    test("Tuesday returns the next full week's Tuesday", () => {
        const expectedDate = "2019-01-08T00:00:00+00:00";
        expect(start(firstDayOfSemester, "Tuesday")).toEqual(expectedDate);
    });
    test("Wednesday returns the next full week's Wednesday", () => {
        const expectedDate = "2019-01-09T00:00:00+00:00";
        expect(start(firstDayOfSemester, "Wednesday")).toEqual(expectedDate);
    });
    test("Thursday returns the next full week's Thursday", () => {
        const expectedDate = "2019-01-10T00:00:00+00:00";
        expect(start(firstDayOfSemester, "Thursday")).toEqual(expectedDate);
    });
    test("Friday returns the next full week's Friday", () => {
        const expectedDate = "2019-01-11T00:00:00+00:00";
        expect(start(firstDayOfSemester, "Friday")).toEqual(expectedDate);
    });
});

describe("when first day of semester is a Monday", () => {
    const firstDayOfSemester = "1/7/19";
    test("Monday returns the next full week's Monday", () => {
        const expectedDate = "2019-01-07T00:00:00+00:00";
        expect(start(firstDayOfSemester, "Monday")).toEqual(expectedDate);
    });
    test("Tuesday returns the next full week's Tuesday", () => {
        const expectedDate = "2019-01-08T00:00:00+00:00";
        expect(start(firstDayOfSemester, "Tuesday")).toEqual(expectedDate);
    });
    test("Wednesday returns the next full week's Wednesday", () => {
        const expectedDate = "2019-01-09T00:00:00+00:00";
        expect(start(firstDayOfSemester, "Wednesday")).toEqual(expectedDate);
    });
    test("Thursday returns the next full week's Thursday", () => {
        const expectedDate = "2019-01-10T00:00:00+00:00";
        expect(start(firstDayOfSemester, "Thursday")).toEqual(expectedDate);
    });
    test("Friday returns the next full week's Friday", () => {
        const expectedDate = "2019-01-11T00:00:00+00:00";
        expect(start(firstDayOfSemester, "Friday")).toEqual(expectedDate);
    });
});

describe("when first day of semester is a Friday", () => {
    const firstDayOfSemester = "1/4/19";
    test("Monday returns the next full week's Monday", () => {
        const expectedDate = "2019-01-07T00:00:00+00:00";
        expect(start(firstDayOfSemester, "Monday")).toEqual(expectedDate);
    });
    test("Tuesday returns the next full week's Tuesday", () => {
        const expectedDate = "2019-01-08T00:00:00+00:00";
        expect(start(firstDayOfSemester, "Tuesday")).toEqual(expectedDate);
    });
    test("Wednesday returns the next full week's Wednesday", () => {
        const expectedDate = "2019-01-09T00:00:00+00:00";
        expect(start(firstDayOfSemester, "Wednesday")).toEqual(expectedDate);
    });
    test("Thursday returns the next full week's Thursday", () => {
        const expectedDate = "2019-01-10T00:00:00+00:00";
        expect(start(firstDayOfSemester, "Thursday")).toEqual(expectedDate);
    });
    test("Friday returns the next full week's Friday", () => {
        const expectedDate = "2019-01-11T00:00:00+00:00";
        expect(start(firstDayOfSemester, "Friday")).toEqual(expectedDate);
    });
});

describe("when first day of semester is a Tuesday", () => {
    const firstDayOfSemester = "1/1/19";
    test("Monday returns the next full week's Monday", () => {
        const expectedDate = "2019-01-07T00:00:00+00:00";
        expect(start(firstDayOfSemester, "Monday")).toEqual(expectedDate);
    });
    test("Tuesday returns the next full week's Tuesday", () => {
        const expectedDate = "2019-01-08T00:00:00+00:00";
        expect(start(firstDayOfSemester, "Tuesday")).toEqual(expectedDate);
    });
    test("Wednesday returns the next full week's Wednesday", () => {
        const expectedDate = "2019-01-09T00:00:00+00:00";
        expect(start(firstDayOfSemester, "Wednesday")).toEqual(expectedDate);
    });
    test("Thursday returns the next full week's Thursday", () => {
        const expectedDate = "2019-01-10T00:00:00+00:00";
        expect(start(firstDayOfSemester, "Thursday")).toEqual(expectedDate);
    });
    test("Friday returns the next full week's Friday", () => {
        const expectedDate = "2019-01-11T00:00:00+00:00";
        expect(start(firstDayOfSemester, "Friday")).toEqual(expectedDate);
    });
});
