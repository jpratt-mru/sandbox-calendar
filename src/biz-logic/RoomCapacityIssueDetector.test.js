var RoomCapacityIssueDetector = require("./RoomCapacityIssueDetector");

const roomCapacityIssueDetector = new RoomCapacityIssueDetector();

describe("should be empty", () => {
  test("when the schedule has no events", () => {
    let dummySchedule = {
      events: function() {
        return [];
      }
    };

    expect(
      roomCapacityIssueDetector.warnings(dummySchedule)
    ).toEqual([]);
  });

  test("when a room has an unknown capacity", () => {
    let dummySchedule = {
      events: function() {
        return [{
          id: "1",
          room: "Bxxx",
          course: "COMP1501",
          section: "001",
          start: "2018-09-10T13:30",
          end: "2018-09-10T14:20",
          crn: "43139",
          sectionEnrolled: 13,
          sectionCapacity: 26,
          get title() {
            return `${this.course}-${this.section} [${this.username}]\n${this.room}`;
          }
        }];
      }
    };

    expect(
      roomCapacityIssueDetector.warnings(dummySchedule)
    ).toEqual([]);
  });

  test("when a class has an unknown sectionCapacity", () => {
    let dummySchedule = {
      events: function() {
        return [{
          id: "1",
          room: "Bxxx",
          course: "COMP1501",
          section: "001",
          start: "2018-09-10T13:30",
          end: "2018-09-10T14:20",
          crn: "43139",
          sectionEnrolled: 13,
          get title() {
            return `${this.course}-${this.section} [${this.username}]\n${this.room}`;
          }
        }];
      }
    };

    expect(
      roomCapacityIssueDetector.warnings(dummySchedule)
    ).toEqual([]);
  });

  test("when a class has an known capacity but unknown section capacity", () => {
    let dummySchedule = {
      events: function() {
        return [{
          id: "30",
          instructor: "TBA",
          username: "TBA",
          room: "E203",
          course: "COMP1631",
          section: "403",
          start: "2018-09-11T13:30",
          end: "2018-09-11T14:20",
          crn: "43158",
          sectionEnrolled: 13,
          get title() {
            return `${this.course}-${this.section} [${this.username}]\n${this.room}`;
          }
        }];
      }
    };

    expect(
      roomCapacityIssueDetector.warnings(dummySchedule)
    ).toEqual([]);
  });
  test("when a class has both an unknown capacity and unknown section capacity", () => {
    let dummySchedule = {
      events: function() {
        return [{
          id: "1",
          room: "B0xx",
          course: "COMP1501",
          section: "001",
          start: "2018-09-10T13:30",
          end: "2018-09-10T14:20",
          crn: "43139",
          sectionEnrolled: 13,
          get title() {
            return `${this.course}-${this.section} [${this.username}]\n${this.room}`;
          }
        }];
      }
    };

    expect(
      roomCapacityIssueDetector.warnings(dummySchedule)
    ).toEqual([]);
  });
});

describe("should have one conflict", () => {
  test("when the schedule has a room that has a section with a sectionCapacity one over room capacity", () => {
    let dummySchedule = {
      events: function() {
        return [{
            id: "1",
            room: "B107",
            course: "COMP1501",
            section: "001",
            start: "2018-09-10T13:30",
            end: "2018-09-10T14:20",
            crn: "43139",
            sectionEnrolled: 13,
            sectionCapacity: 26,
            get title() {
              return `${this.course}-${this.section} [${this.username}]\n${this.room}`;
            }
          },
          {
            id: "2",
            instructor: "Jordan Pratt",
            username: "jpratt",
            room: "B107",
            course: "COMP1501",
            section: "002",
            start: "2018-09-12T13:30",
            end: "2018-09-12T14:20",
            crn: "43139",
            sectionEnrolled: 13,
            sectionCapacity: 25,
            get title() {
              return `${this.course}-${this.section} [${this.username}]\n${this.room}`;
            }
          }
        ];
      }
    };
    expect(
      roomCapacityIssueDetector.warnings(dummySchedule)
    ).toMatchObject([{ desc: expect.stringMatching(/B107/) }]);
  });



});


test("should not double-report the same room for the same course", () => {
  let dummySchedule = {
    events: function() {
      return [{
          id: "1",
          room: "B107",
          course: "COMP1501",
          section: "001",
          start: "2018-09-10T13:30",
          end: "2018-09-10T14:20",
          crn: "43139",
          sectionEnrolled: 13,
          sectionCapacity: 26,
          get title() {
            return `${this.course}-${this.section} [${this.username}]\n${this.room}`;
          }
        },
        {
          id: "2",
          room: "B107",
          course: "COMP1501",
          section: "001",
          start: "2018-09-12T13:30",
          end: "2018-09-12T14:20",
          crn: "43139",
          sectionEnrolled: 13,
          sectionCapacity: 26,
          get title() {
            return `${this.course}-${this.section} [${this.username}]\n${this.room}`;
          }
        }
      ];
    }
  };
  expect(
    roomCapacityIssueDetector.warnings(dummySchedule)
  ).toMatchObject([{ desc: expect.stringMatching(/B107/) }]);
  expect(roomCapacityIssueDetector.warnings(dummySchedule)).toHaveLength(1);
});
