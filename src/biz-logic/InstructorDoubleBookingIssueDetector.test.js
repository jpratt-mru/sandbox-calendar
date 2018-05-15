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
        return [{
          id: "1",
          instructor: "Namrata Khemka",
          start: "2018-09-12T13:30",
          end: "2018-09-12T14:20",
          crn: "1"
        }];
      }
    };

    expect(
      instructorDoubleBookingIssueDetector.warnings(dummySchedule)
    ).toEqual([]);
  });

  test("when the schedule has two events with one instructor and no time overlap", () => {
    let dummySchedule = {
      events: function() {
        return [{
            id: "1",
            instructor: "Namrata Khemka",
            start: "2018-09-12T13:30",
            end: "2018-09-12T14:20",
            crn: "1"
          },
          {
            id: "2",
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

  test("when TBA is involved, even if time overlaps", () => {
    let dummySchedule = {
      events: function() {
        return [{
            id: "1",
            instructor: "TBA",
            start: "2018-09-12T13:30",
            end: "2018-09-12T14:20",
            crn: "1"
          },
          {
            id: "2",
            instructor: "TBA",
            start: "2018-09-12T13:30",
            end: "2018-09-12T14:20",
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
        return [{
            id: "1",
            instructor: "Namrata Khemka",
            username: "nkhemka",
            room: "T235",
            course: "COMP1501",
            section: "001",
            start: "2018-09-10T13:30",
            end: "2018-09-10T14:20",
            crn: "43139",
            get title() {
              return `${this.course}-${this.section} [${this.username}]\n${this.room}`;
            }
          },
          {
            id: "2",
            instructor: "Namrata Khemka",
            username: "nkhemka",
            room: "T235",
            course: "COMP1501",
            section: "001",
            start: "2018-09-10T13:30",
            end: "2018-09-10T14:20",
            crn: "43139",
            get title() {
              return `${this.course}-${this.section} [${this.username}]\n${this.room}`;
            }
          }
        ];
      }
    };
    expect(
      instructorDoubleBookingIssueDetector.warnings(dummySchedule)
    ).toMatchObject([{ desc: expect.stringMatching(/Namrata Khemka/) }]);
  });
});
