var EventFilter = require("./EventFilter");
var array = require("lodash/array");

var eventFilter = new EventFilter();
const EVENT_TO_FILTER = {
  course: "COMP1501",
  name: "Jordan Pratt",
  username: "jpratt",
  room: "B107",
  start: "2018-09-14T12:30",
  end: "2018-09-14T13:20"
};

let expectedResult;
let actualResult;
let filterText;

let shouldBeFalse = function(filterText) {
  actualResult = eventFilter.eventMatchesFilterText(
    EVENT_TO_FILTER,
    filterText
  );

  expect(actualResult).toBeFalsy();
};

let shouldBeTrue = function(filterText) {
  actualResult = eventFilter.eventMatchesFilterText(
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
});

describe("reports no match", () => {
  test("when using a null event", () => {
    let no_such_event;
    expect(
      eventFilter.eventMatchesFilterText(no_such_event, "bar")
    ).toBeFalsy();
  });

  test("when event has no matches, not even partial", () => {
    let filterText = "ape \t bat \t\t   cats";
  });

  test.skip("when text contains exactly the filterable terms separated by whitespace, even with different casing", () => {
    let filterText = "aPE\tBaT\t   CaTs";

    let actualResult = eventFilter.eventMatchesFilterText(
      EVENT_TO_FILTER,
      filterText
    );
    let expectedResult = EVENT_TO_FILTER;

    expect(actualResult).toContainOnly(expectedResult);
  });

  test.skip("when text contains exactly the filterable terms separated by whitespace, even if different order", () => {
    let filterText = "cats\tape\t\t   bat";

    let actualResult = eventFilter.eventMatchesFilterText(
      EVENT_TO_FILTER,
      filterText
    );
    let expectedResult = EVENT_TO_FILTER;

    expect(actualResult).toContainOnly(expectedResult);
  });

  test.skip("when text contains exactly the filterable terms separated by whitespace, even if only partially matching start", () => {
    let filterText = "cat\tap\t\t   b";

    let actualResult = eventFilter.eventMatchesFilterText(
      EVENT_TO_FILTER,
      filterText
    );
    let expectedResult = EVENT_TO_FILTER;

    expect(actualResult).toContainOnly(expectedResult);
  });

  test.skip("when text contains exactly the filterable terms separated by whitespace, even if only partially matching after start", () => {
    let filterText = "at\tpe\t\t   a";

    let actualResult = eventFilter.eventMatchesFilterText(
      EVENT_TO_FILTER,
      filterText
    );
    let expectedResult = EVENT_TO_FILTER;

    expect(actualResult).toContainOnly(expectedResult);
  });
});

describe("everthing is filtered out", () => {
  test.skip("when text is a single term that doesn't match", () => {
    let filterText = "dog";

    let actualResult = eventFilter.eventMatchesFilterText(
      EVENT_TO_FILTER,
      filterText
    );
    let expectedResult = [];

    expect(actualResult).toContainOnly(expectedResult);
  });

  test.skip("when text has multiple terms that all don't match", () => {
    let filterText = "dog egg";

    let actualResult = eventFilter.eventMatchesFilterText(
      EVENT_TO_FILTER,
      filterText
    );
    let expectedResult = [];

    expect(actualResult).toContainOnly(expectedResult);
  });

  test.skip("when text has just one term that doesn't match", () => {
    let filterText = "cats bat ape x";

    let actualResult = eventFilter.eventMatchesFilterText(
      EVENT_TO_FILTER,
      filterText
    );
    let expectedResult = [];

    expect(actualResult).toContainOnly(expectedResult);
  });

  test.skip("when the text has one item that matches followed by one that doesn't", () => {
    let filterText = "a x";

    let actualResult = eventFilter.eventMatchesFilterText(
      EVENT_TO_FILTER,
      filterText
    );
    let expectedResult = [];

    expect(actualResult).toContainOnly(expectedResult);
  });
});

describe("1 item is returned", () => {
  test.skip("when the text has only that item", () => {
    let filterText = "bat";

    let actualResult = eventFilter.eventMatchesFilterText(
      EVENT_TO_FILTER,
      filterText
    );
    let expectedResult = ["bat"];

    expect(actualResult).toContainOnly(expectedResult);
  });

  test.skip("when the text has only that item, case insensitive", () => {
    let filterText = "BAT";

    let actualResult = eventFilter.eventMatchesFilterText(
      EVENT_TO_FILTER,
      filterText
    );
    let expectedResult = ["bat"];

    expect(actualResult).toContainOnly(expectedResult);
  });
});

describe("2 items are returned", () => {
  test.skip("when the text has both those items", () => {
    let filterText = "bat cats";

    let actualResult = eventFilter.eventMatchesFilterText(
      EVENT_TO_FILTER,
      filterText
    );
    let expectedResult = ["bat", "cats"];

    expect(actualResult).toContainOnly(expectedResult);
  });
});

// custom matcher to make tests read better
// we only care about the contents of the matching terms, not their order

expect.extend({
  toContainOnly(received, argument) {
    const diff = array.difference(received.sort(), argument.sort());
    const pass =
      (diff.length === 0 && received.length !== 0) ||
      (argument.length == 0 && received.length == 0);

    if (pass) {
      return {
        message: () =>
          `expectedResult [${received}] not to have the same elements as [${argument}]`,
        pass: true
      };
    } else {
      return {
        message: () =>
          `expectedResult [${received}] to have the same elements as [${argument}]`,
        pass: false
      };
    }
  }
});
