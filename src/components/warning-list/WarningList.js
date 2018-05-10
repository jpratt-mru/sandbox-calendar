import React, { Component } from "react";
import Warning from "../warning/Warning";
import "./warning-list.css";

class WarningList extends Component {
  render() {
    return (
      <div id="warning-list">
        <ul className="mdl-list">
          <Warning />
        </ul>
      </div>
    );
  }
}

export default WarningList;
