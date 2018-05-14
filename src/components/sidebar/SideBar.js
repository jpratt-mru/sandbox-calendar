import React, { Component } from "react";
import SearchBar from "../search-bar/SearchBar";
import WarningList from "../warning-list/WarningList";
import "./side-bar.css";

class SideBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="side-bar" className="mdl-cell mdl-cell--2-col">
        <SearchBar
          filterText={this.props.filterText}
          onFilterTextChange={this.props.onFilterTextChange}
        />
        <WarningList warnings={this.props.warnings} />
      </div>
    );
  }
}

export default SideBar;
