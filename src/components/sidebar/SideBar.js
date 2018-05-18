import React from "react";
import AndSearchBar from "../search-bar/AndSearchBar";
import OrSearchBar from "../search-bar/OrSearchBar";
import WarningList from "../warning-list/WarningList";
import "./side-bar.css";


function SideBar(props) {

  return (
    <div id="side-bar" className="mdl-cell mdl-cell--2-col">
              <AndSearchBar
                andFilterText={props.andFilterText}
                onAndFilterTextChange={props.onAndFilterTextChange}
              />
              <OrSearchBar
                orFilterText={props.orFilterText}
                onOrFilterTextChange={props.onOrFilterTextChange}
              />
              <WarningList warnings={props.warnings} />
            </div>
  );
}

export default SideBar;
