var InstructorDoubleBookingIssueDetector = require("./InstructorDoubleBookingIssueDetector");

const instructorDoubleBookingIssueDetector = new InstructorDoubleBookingIssueDetector();

describe("should be empty", () => {
  test("when the schedule has no events", () => {
    let dummySchedule = {
      events: function() {
        return [];
      }
    };

    expect(
      instructorDoubleBookingIssueDetector.warnings(dummySchedule)
    ).toEqual([]);
  });

  test("when the schedule has one event", () => {
    let dummySchedule = {
      events: function() {
        return [
          {
            instructor: "Namrata Khemka",
            start: "2018-09-12T13:30",
            end: "2018-09-12T14:20",
            crn: "1"
          }
        ];
      }
    };

    expect(
      instructorDoubleBookingIssueDetector.warnings(dummySchedule)
    ).toEqual([]);
  });

  test("when the schedule has two events with one instructor and no time overlap", () => {
    let dummySchedule = {
      events: function() {
        return [
          {
            instructor: "Namrata Khemka",
            start: "2018-09-12T13:30",
            end: "2018-09-12T14:20",
            crn: "1"
          },
          {
            instructor: "Namrata Khemka",
            start: "2018-09-12T14:21",
            end: "2018-09-12T15:00",
            crn: "2"
          }
        ];
      }
    };

    expect(
      instructorDoubleBookingIssueDetector.warnings(dummySchedule)
    ).toEqual([]);
  });
});

describe("should have one conflict", () => {
  test("when the schedule has two events with one instructor and times overlap", () => {
    let dummySchedule = {
      events: function() {
        return [
          {
            instructor: "Namrata Khemka",
            start: "2018-09-12T13:30",
            end: "2018-09-12T14:20",
            crn: "1"
          },
          {
            instructor: "Namrata Khemka",
            start: "2018-09-12T14:19",
            end: "2018-09-12T15:00",
            crn: "2"
          }
        ];
      }
    };

    expect(
      instructorDoubleBookingIssueDetector.warnings(dummySchedule)
    ).toMatchObject([{ desc: expect.stringMatching(/Namrata Khemka/) }]);
  });
});
