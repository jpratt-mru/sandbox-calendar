import React from "react";
import "./warning.css";

function Warning(props) {
  return (
    <li className="mdl-list__item warning">
      <span className="mdl-list__item-primary-content">
        <span>{props.desc}</span>
      </span>
    </li>
  );
}

export default Warning;
