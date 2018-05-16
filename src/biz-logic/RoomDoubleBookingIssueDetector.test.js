var RoomDoubleBookingIssueDetector = require("./RoomDoubleBookingIssueDetector");

const roomDoubleBookingIssueDetector = new RoomDoubleBookingIssueDetector();

describe("should be empty", () => {

  test("when the schedule has no events", () => {
    let dummySchedule = {
      events: function() {
        return [];
      }
    };

    expect(
      roomDoubleBookingIssueDetector.warnings(dummySchedule)
    ).toEqual([]);
  });




  test("when the schedule has one event", () => {
    let dummySchedule = {
      events: function() {
        return [{
          id: "1",
          room: "B107",
          start: "2018-09-12T13:30",
          end: "2018-09-12T14:20",
          crn: "1"
        }];
      }
    };

    expect(
      roomDoubleBookingIssueDetector.warnings(dummySchedule)
    ).toEqual([]);
  });

  test("when the schedule has two events with one room and no time overlap", () => {
    let dummySchedule = {
      events: function() {
        return [{
            id: "1",
            room: "B107",
            start: "2018-09-12T13:30",
            end: "2018-09-12T14:20",
            crn: "1"
          },
          {
            id: "2",
            room: "B107",
            start: "2018-09-12T14:21",
            end: "2018-09-12T15:00",
            crn: "2"
          }
        ];
      }
    };

    expect(
      roomDoubleBookingIssueDetector.warnings(dummySchedule)
    ).toEqual([]);
  });

  test("when the schedule has two events with two rooms and time overlap", () => {
    let dummySchedule = {
      events: function() {
        return [{
            id: "1",
            room: "B107",
            start: "2018-09-12T13:30",
            end: "2018-09-12T14:20",
            crn: "1"
          },
          {
            id: "2",
            room: "B162",
            start: "2018-09-12T13:30",
            end: "2018-09-12T14:20",
            crn: "2"
          }
        ];
      }
    };

    expect(
      roomDoubleBookingIssueDetector.warnings(dummySchedule)
    ).toEqual([]);
  });
});

describe("should have one conflict", () => {
  test("when the schedule has two events with same room but times overlap", () => {
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
      roomDoubleBookingIssueDetector.warnings(dummySchedule)
    ).toMatchObject([{ desc: expect.stringMatching(/B107/) }]);
  });


});
