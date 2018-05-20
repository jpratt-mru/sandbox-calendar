let Winter2019FormatFactory = (module.exports = function() {});


Winter2019FormatFactory.prototype.createClass = function(row, id) {
    let theClass = {
        id: id,
        course: course(row),
        instructor: instructor(row),
        username: username(row),
        room: room(row),
        section: section(row)
    };
    theClass.crn = theClass.course + theClass.section;
    theClass.title = `${theClass.course}-${theClass.section} [${theClass.username}]\n${theClass.room}`;
    return theClass;
};

const course = function(row) {
    return row["__EMPTY"];
};

const section = function(row) {
    return row["__EMPTY_3"];
};

const instructor = function(row) {
    let rawFirstName = row["__EMPTY_18"];
    let rawLastName = row["__EMPTY_19"];

    if (!rawFirstName) {
        return "TBA";
    }

    if (rawFirstName.toLowerCase().startsWith("tba")) {
        return "TBA";
    }

    return `${rawFirstName} ${rawLastName}`;
};

const username = function(row) {
    const fullName = instructor(row);

    if (fullName === "TBA") {
        return "TBA";
    }


    const rawFirstName = row["__EMPTY_18"];
    const firstNameInitial = rawFirstName[0];

    let rawLastName = row["__EMPTY_19"];

    return firstNameInitial.toLowerCase() + rawLastName.toLowerCase();
};

const room = function(row) {
    return row["__EMPTY_16"];
};
