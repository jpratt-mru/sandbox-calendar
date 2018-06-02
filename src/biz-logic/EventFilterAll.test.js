var EventFilter = require("./EventFilter");

var eventFilter = new EventFilter();
const EVENT_TO_FILTER = {
  course: "COMP1501",
  name: "Jordan Pratt",
  username: "jpratt",
  room: "B107",
  start: "2018-09-14T12:30",
  end: "2018-09-14T13:20",
  id: 17
};

let expectedResult;
let actualResult;
let filterText;

let shouldBeFalse = function(filterText) {
  actualResult = eventFilter.eventMatchesAllFilterText(
    EVENT_TO_FILTER,
    filterText
  );

  expect(actualResult).toBeFalsy();
};

let shouldBeTrue = function(filterText) {
  actualResult = eventFilter.eventMatchesAllFilterText(
    EVENT_TO_FILTER,
    filterText
  );

  expect(actualResult).toBeTruthy();
};

describe("reports a match", () => {
  test("when using undefined filter text", () => {
    shouldBeTrue(undefined);
  });

  test("when using null filter text", () => {
    shouldBeTrue(null);
  });

  test("when using empty filter text", () => {
    shouldBeTrue("");
  });

  test("when using a whitespace-only filter text", () => {
    shouldBeTrue("  \t\n  \n\t");
  });

  test("when a full case-sensitive match occurs on one property", () => {
    shouldBeTrue("jpratt");
  });

  test("when a full case-insensitive match occurs on one property", () => {
    shouldBeTrue("jPrATt");
  });

  test("when a full case-sensitive match occurs on two properties", () => {
    shouldBeTrue("jpratt B107");
  });

  test("when a full case-insensitive match occurs on two properties", () => {
    shouldBeTrue("jPrATt coMp1501");
  });

  test("when full matches occur on all properties, same order", () => {
    shouldBeTrue(
      "COMP1501 Jordan Pratt B107 2018-09-14T12:30 2018-09-14T13:20"
    );
  });

  test("when full matches occur on all properties, mixed up order", () => {
    shouldBeTrue(
      "B107 COMP1501 Jordan Pratt 2018-09-14T13:20 2018-09-14T12:30 "
    );
  });

  test("when a start-of-word match occurs on one property", () => {
    shouldBeTrue("jp");
  });

  test("when a middle-of-word match occurs on one property", () => {
    shouldBeTrue("50");
  });

  test("when a end-of-word match occurs on one property", () => {
    shouldBeTrue("07");
  });

  test("when multiple terms partially match one property", () => {
    shouldBeTrue("co mp 15 1");
  });

  test("when a time is used", () => {
    shouldBeTrue("12:");
  });
});

describe("reports no match", () => {
  test("when using a null event", () => {
    let no_such_event;
    expect(
      eventFilter.eventMatchesAllFilterText(no_such_event, "bar")
    ).toBeFalsy();
  });

  test("when using a single filter that doesn't match any property, not even partially", () => {
    shouldBeFalse("ape");
  });

  test("when using multiple filters that have no matches, not even partial", () => {
    shouldBeFalse("ape \t bat \t\t   cats");
  });

  test("when using multiple filters that all match except for one", () => {
    shouldBeFalse("jpratt b107 Jordan Pratt cmp1501");
  });

  test("when the text has one item that matches followed by one that doesn't", () => {
    shouldBeFalse("jpratt x107");
  });
});

test("doesn't report a match just because the id matches the search term", () => {
  shouldBeFalse("17");
});
