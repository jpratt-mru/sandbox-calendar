import React, { Component } from "react";

class SearchBar extends Component {
  render() {
    return (
      <form action="#">
        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input
            id="filter-terms"
            className="mdl-textfield__input"
            type="text"
          />
          <label className="mdl-textfield__label" htmlFor="filter-terms">
            Filter...
          </label>
        </div>
      </form>
    );
  }
}

export default SearchBar;
