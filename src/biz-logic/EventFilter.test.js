var EventFilter = require("./EventFilter");
var array = require("lodash/array");

var eventFilter = new EventFilter();
const filterableTerms = ["a", "b", "c"];

describe("no filtering", () => {
  test("when using an empty filter", () => {
    let filterText = "";

    let actual = eventFilter.filter(filterableTerms, filterText);
    let expected = filterableTerms;

    expect(actual).toContainOnly(expected);
  });

  test("when using a whitespace-only filter", () => {
    let filterText = "  \t\n  \n\t";

    let actual = eventFilter.filter(filterableTerms, filterText);
    let expected = filterableTerms;

    expect(actual).toContainOnly(expected);
  });

  test("when text contains exactly the filterable terms separated by whitespace", () => {
    let filterText = "a\tb\t\t   c";

    let actual = eventFilter.filter(filterableTerms, filterText);
    let expected = filterableTerms;

    expect(actual).toContainOnly(expected);
  });

  test("when text contains exactly the filterable terms separated by whitespace, even with different casing", () => {
    let filterText = "a\tB\t\t   C";

    let actual = eventFilter.filter(filterableTerms, filterText);
    let expected = filterableTerms;

    expect(actual).toContainOnly(expected);
  });

  test("when text contains exactly the filterable terms separated by whitespace, even if different order", () => {
    let filterText = "c\ta\t\t   b";

    let actual = eventFilter.filter(filterableTerms, filterText);
    let expected = filterableTerms;

    expect(actual).toContainOnly(expected);
  });
});

describe("everthing is filtered out", () => {
  test("when text is a single term that doesn't match", () => {
    let filterText = "d";

    let actual = eventFilter.filter(filterableTerms, filterText);
    let expected = [];

    expect(actual).toContainOnly(expected);
  });

  test("when text has multiple terms that all don't match", () => {
    let filterText = "d e";

    let actual = eventFilter.filter(filterableTerms, filterText);
    let expected = [];

    expect(actual).toContainOnly(expected);
  });

  test("when text has just one term that doesn't match", () => {
    let filterText = "c b a x";

    let actual = eventFilter.filter(filterableTerms, filterText);
    let expected = [];

    expect(actual).toContainOnly(expected);
  });
});

describe("1 item is returned", () => {
  test("when the text has only that item", () => {
    let filterText = "b";

    let actual = eventFilter.filter(filterableTerms, filterText);
    let expected = ["b"];

    expect(actual).toContainOnly(expected);
  });

  test("when the text has only that item, case insensitive", () => {
    let filterText = "B";

    let actual = eventFilter.filter(filterableTerms, filterText);
    let expected = ["b"];

    expect(actual).toContainOnly(expected);
  });
});

describe("2 items are returned", () => {
  test("when the text has both those items", () => {
    let filterText = "b a";

    let actual = eventFilter.filter(filterableTerms, filterText);
    let expected = ["a", "b"];

    expect(actual).toContainOnly(expected);
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
          `expected [${received}] not to have the same elements as [${argument}]`,
        pass: true
      };
    } else {
      return {
        message: () =>
          `expected [${received}] to have the same elements as [${argument}]`,
        pass: false
      };
    }
  }
});
