import React from "react";
import Warning from "../warning/Warning";
import "./warning-list.css";

function WarningList(props) {
  const listItems = props.warnings.length === 0 ? "No Warnngs" : props.warnings.map((warning, index) => (
    <Warning key={index} desc={warning.desc} />
  ));
  return (
    <div id="warning-list">
      <ul className="mdl-list">{listItems}</ul>
    </div>
  );
}

export default WarningList;
