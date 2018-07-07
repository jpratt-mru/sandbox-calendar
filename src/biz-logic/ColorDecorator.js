/**
 * We want to add some distinct-ish colour to the events so that classes
 * can be differentiated easily.
 * 
 * I found a cool site (http://tools.medialab.sciences-po.fr/iwanthue/) that
 * lets you generate different color palettes easily. So I just generated 40ish
 * that looked different enough and went with that. (I was OK if there was
 * overlap between MATH and COMP classes, as a user typically is just looking
 * at classes from one or the other.)
 * 
 * The idea is to make a list of course numbers (the subject doesn't matter - so
 * if you have a MATH1001 and a COMP1001, we just care about the 1001 part).
 * Then we just say "if you're a course with the first number in the list, you
 * get the first color in the color list; if you're a course with the 18th
 * number in the course number list, you get the 18th color in the color list".
 * 
 */

let ColorDecorator = (module.exports = function() {});

const colorList = ["#00191d",
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
    const courseNumberList = uniqueCourseNumbers(events);
    return eventsWithColor(events, courseNumberList);
};

function uniqueCourseNumbers(events) {
    return events
        .map(event => event.courseNumber) // collection of course numbers
        .filter((v, i, a) => a.indexOf(v) === i); // this removes duplicates
}

function eventsWithColor(events, courseNumberList) {
    return events.map(event => {
        const courseNumberIndex = courseNumberList.indexOf(event.courseNumber);
        event.color = colorList[courseNumberIndex];
        return event;
    });
}
