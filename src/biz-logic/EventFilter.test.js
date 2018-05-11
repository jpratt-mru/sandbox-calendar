var EventFilter = require("./EventFilter");
var array = require("lodash/array");

var eventFilter = new EventFilter();
const filterableTerms = ["ape", "bat", "cats"];

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
    let filterText = "ape\tbat\t\t   cats";

    let actual = eventFilter.filter(filterableTerms, filterText);
    let expected = filterableTerms;

    expect(actual).toContainOnly(expected);
  });

  test("when text contains exactly the filterable terms separated by whitespace, even with different casing", () => {
    let filterText = "aPE\tBaT\t   CaTs";

    let actual = eventFilter.filter(filterableTerms, filterText);
    let expected = filterableTerms;

    expect(actual).toContainOnly(expected);
  });

  test("when text contains exactly the filterable terms separated by whitespace, even if different order", () => {
    let filterText = "cats\tape\t\t   bat";

    let actual = eventFilter.filter(filterableTerms, filterText);
    let expected = filterableTerms;

    expect(actual).toContainOnly(expected);
  });

  test("when text contains exactly the filterable terms separated by whitespace, even if only partially matching start", () => {
    let filterText = "cat\tap\t\t   b";

    let actual = eventFilter.filter(filterableTerms, filterText);
    let expected = filterableTerms;

    expect(actual).toContainOnly(expected);
  });

  test("when text contains exactly the filterable terms separated by whitespace, even if only partially matching after start", () => {
    let filterText = "at\tpe\t\t   a";

    let actual = eventFilter.filter(filterableTerms, filterText);
    let expected = filterableTerms;

    expect(actual).toContainOnly(expected);
  });
});

describe("everthing is filtered out", () => {
  test("when text is a single term that doesn't match", () => {
    let filterText = "dog";

    let actual = eventFilter.filter(filterableTerms, filterText);
    let expected = [];

    expect(actual).toContainOnly(expected);
  });

  test("when text has multiple terms that all don't match", () => {
    let filterText = "dog egg";

    let actual = eventFilter.filter(filterableTerms, filterText);
    let expected = [];

    expect(actual).toContainOnly(expected);
  });

  test("when text has just one term that doesn't match", () => {
    let filterText = "cats bat ape x";

    let actual = eventFilter.filter(filterableTerms, filterText);
    let expected = [];

    expect(actual).toContainOnly(expected);
  });

  test("when the text has one item that matches followed by one that doesn't", () => {
    let filterText = "a x";

    let actual = eventFilter.filter(filterableTerms, filterText);
    let expected = [];

    expect(actual).toContainOnly(expected);
  });
});

describe("1 item is returned", () => {
  test("when the text has only that item", () => {
    let filterText = "bat";

    let actual = eventFilter.filter(filterableTerms, filterText);
    let expected = ["bat"];

    expect(actual).toContainOnly(expected);
  });

  test("when the text has only that item, case insensitive", () => {
    let filterText = "BAT";

    let actual = eventFilter.filter(filterableTerms, filterText);
    let expected = ["bat"];

    expect(actual).toContainOnly(expected);
  });
});

describe("2 items are returned", () => {
  test("when the text has both those items", () => {
    let filterText = "bat cats";

    let actual = eventFilter.filter(filterableTerms, filterText);
    let expected = ["bat", "cats"];

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
