import React, { Component } from "react";
import SearchBar from "../search-bar/SearchBar";
import WarningList from "../warning-list/WarningList";

class SideBar extends Component {
  render() {
    return (
      <div id="sidebar" className="mdl-cell mdl-cell--2-col">
        <SearchBar />
        <WarningList />
      </div>
    );
  }
}

export default SideBar;
