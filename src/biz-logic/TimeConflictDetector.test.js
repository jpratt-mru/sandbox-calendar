let TimeConflictDetector = require("./TimeConflictDetector");

const timeConflictDetector = new TimeConflictDetector();

describe("should report no conflict", () => {
  test("when times overlap, but are on different days", () => {
    let eventA = {
      start: "2018-09-10T13:30",
      end: "2018-09-10T14:20"
    };
    let eventB = {
      start: "2018-09-11T13:30",
      end: "2018-09-11T14:20"
    };

    expect(timeConflictDetector.hasConflict(eventA, eventB)).toBeFalsy();
    expect(timeConflictDetector.hasConflict(eventB, eventA)).toBeFalsy();
  });

  test("when times barely miss each other", () => {
    let eventA = {
      start: "2018-09-10T13:30",
      end: "2018-09-10T14:20"
    };
    let eventB = {
      start: "2018-09-11T14:21",
      end: "2018-09-11T14:22"
    };

    expect(timeConflictDetector.hasConflict(eventA, eventB)).toBeFalsy();
    expect(timeConflictDetector.hasConflict(eventB, eventA)).toBeFalsy();
  });

  test("when times barely just touch each other", () => {
    let eventA = {
      start: "2018-09-10T13:30",
      end: "2018-09-10T14:20"
    };
    let eventB = {
      start: "2018-09-11T14:20",
      end: "2018-09-11T14:22"
    };

    expect(timeConflictDetector.hasConflict(eventA, eventB)).toBeFalsy();
    expect(timeConflictDetector.hasConflict(eventB, eventA)).toBeFalsy();
  });
});

describe("should report conflict", () => {
  test("when times barely overlap each other", () => {
    let eventA = {
      start: "2018-09-10T13:30",
      end: "2018-09-10T14:20"
    };
    let eventB = {
      start: "2018-09-10T14:19",
      end: "2018-09-10T14:22"
    };

    expect(timeConflictDetector.hasConflict(eventA, eventB)).toBeTruthy();
    expect(timeConflictDetector.hasConflict(eventB, eventA)).toBeTruthy();
  });

  test("when mostly overlap each other", () => {
    let eventA = {
      start: "2018-09-10T13:30",
      end: "2018-09-10T14:20"
    };
    let eventB = {
      start: "2018-09-10T13:31",
      end: "2018-09-10T14:22"
    };

    expect(timeConflictDetector.hasConflict(eventA, eventB)).toBeTruthy();
    expect(timeConflictDetector.hasConflict(eventB, eventA)).toBeTruthy();
  });

  test("when exactly overlap each other", () => {
    let eventA = {
      start: "2018-09-10T13:30",
      end: "2018-09-10T14:20"
    };
    let eventB = {
      start: "2018-09-10T13:30",
      end: "2018-09-10T14:20"
    };

    expect(timeConflictDetector.hasConflict(eventA, eventB)).toBeTruthy();
    expect(timeConflictDetector.hasConflict(eventB, eventA)).toBeTruthy();
  });

  test("when one completely within other", () => {
    let eventA = {
      start: "2018-09-10T13:30",
      end: "2018-09-10T14:20"
    };
    let eventB = {
      start: "2018-09-10T13:31",
      end: "2018-09-10T14:19"
    };

    expect(timeConflictDetector.hasConflict(eventA, eventB)).toBeTruthy();
    expect(timeConflictDetector.hasConflict(eventB, eventA)).toBeTruthy();
  });
});
