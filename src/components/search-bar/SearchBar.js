import React, { Component } from "react";

class SearchBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form action="#">
        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input
            id="filter-terms"
            className="mdl-textfield__input"
            type="text"
            value={this.props.filterText}
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
