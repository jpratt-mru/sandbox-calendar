import React, { Component } from "react";

class AndSearchBar extends Component {
  constructor(props) {
    super(props);

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  handleFilterTextChange(e) {
    this.props.onAndFilterTextChange(e.target.value);
  }

  render() {
    return (
      <form action="#">
        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input
            id="filter-terms"
            className="mdl-textfield__input"
            type="text"
            value={this.props.andFilterText}
            onChange={this.handleFilterTextChange}
          />
          <label className="mdl-textfield__label" htmlFor="filter-terms">
            AND Filter...
          </label>
        </div>
      </form>
    );
  }
}

export default AndSearchBar;
