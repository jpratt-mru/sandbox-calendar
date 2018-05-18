import React from "react";
import './title.css';

function Title(props) {
    return (

        <div id="title" className="mdl-cell mdl-cell--12-col">
            <span>{props.title}</span>
        </div>

    );
}

export default Title;
