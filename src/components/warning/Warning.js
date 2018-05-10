import React, { Component } from "react";
import "./warning.css";

class Warning extends Component {
  render() {
    return (
      <li className="mdl-list__item warning">
        <span className="mdl-list__item-primary-content">
          <span>foo</span>
        </span>
      </li>
    );
  }
}

export default Warning;
