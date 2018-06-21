let ColorDecorator = (module.exports = function() {});

const colors = ["#00191d",
    "#5d7884",
    "#2f0e00",
    "#00392c",
    "#280017",
    "#392300",
    "#836b92",
    "#7e744a",
    "#002247",
    "#3f7f66",
    "#5276a4",
    "#986947",
    "#a66062",
    "#443700",
    "#43002e",
    "#551a00",
    "#00255c",
    "#003903",
    "#280039",
    "#ae5e3a",
    "#6f6bb9",
    "#af538f",
    "#bd4e6b",
    "#002a76",
    "#884300",
    "#576e00",
    "#a66415",
    "#95002d",
    "#9858bf",
    "#1b7900",
    "#600078",
    "#9e2500",
    "#c00055",
    "#d53b1d",
    "#ce26aa",
    "#5f0095",
    "#e60041",
    "#3700a1",
    "#001bb0",
    "#7020d0"
];

ColorDecorator.decoratedEvents = function(events) {
    const courseNumbers = events.map(event => event.courseNumber).filter((v, i, a) => a.indexOf(v) === i);

    const coloredEvents = events.map(event => {
        // event.borderColor = event.subject === "COMP" ? "blue" : "yellow";
        console.log("mapping ", event.courseNumber, " to ", courseNumbers.indexOf(event.courseNumber));
        event.color = colors[courseNumbers.indexOf(event.courseNumber)];

        return event;

    });

    return coloredEvents;
    // theEvent.color = ColorDecider.backgroundColor(theEvent.subject, theEvent.courseNumber, theEvent.section);
    // theEvent.textColor = ColorDecider.textColor(theEvent.subject, theEvent.courseNumber, theEvent.section);

};
