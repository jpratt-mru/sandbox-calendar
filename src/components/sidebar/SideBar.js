import React from "react";
import SearchBar from "../search-bar/SearchBar";
import WarningList from "../warning-list/WarningList";
import "./side-bar.css";

function SideBar(props) {

    return (
      <div id="side-bar" className="mdl-cell mdl-cell--2-col">
        <SearchBar
          filterText={props.filterText}
          onFilterTextChange={props.onFilterTextChange}
        />
        <WarningList warnings={props.warnings} />
      </div>
    );
  }

export default SideBar;
