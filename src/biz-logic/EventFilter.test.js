var EventFilter = require("./EventFilter");
var eventFilter = new EventFilter();

test("a thing filtered with an empty string isn't filtered", () => {
  let filterText = "";
  let filterableTerms = ["a", "b", "c"];

  let actual = eventFilter.filter(filterableTerms, filterText);
  let expected = filterableTerms;

  expect(actual).toBe(expected);
});

test("bar", () => {
  expect(eventFilter.filter(1)).toBeFalsy();
});
