import React from "react";
import './title.css';

function Title(props) {
    return (

        <div id="title" className="mdl-cell mdl-cell--12-col">
            <span>{title(props.classEvents)}</span>
        </div>

    );
}

function title(classEvents) {
    if (classEvents.length === 0) return "no schedule loaded";

    const firstClassEvent = classEvents[0];
    const firstClassStartDate = firstClassEvent.start;

    const yearFirstClassStarts = firstClassStartDate.split("-")[0];
    const monthFirstClassStartsAsNumber = firstClassStartDate.split("-")[1];

    let monthFirstClassStarts = "unknown month";
    if (monthFirstClassStartsAsNumber === "01") {
        monthFirstClassStarts = "WINTER";
    }
    else if (monthFirstClassStartsAsNumber === "09") {
        monthFirstClassStarts = "FALL";
    }
    return yearFirstClassStarts + "-" + monthFirstClassStarts;
}
export default Title;
