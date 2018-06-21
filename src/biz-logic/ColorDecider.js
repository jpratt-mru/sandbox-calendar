// const tinycolor = require("tinycolor2");

const colorMaps = [
    "#db5353", "#edbc5a", "#43ff26", "#168c94", "#1d2a4d", "#ed24c5", "#170b09", "#706a11", "#4dc98f", "#61caff", "#4d5dc9", "#94167b", "#c94c1e", "#a7c91e", "#093b31", "#162f3b", "#9d21db", "#ff267d", "#a66419", "#364d1d", "#031716", "#269aff", "#440e5e", "#70111e", "#4c370b", "#2a7011", "#26f1ff", "#386994", "#291027"
];
let mathIndex = -1;
let compIndex = -1;

let ColorDecider = (module.exports = function() {



});


ColorDecider.backgroundColor = function(course, number, section) {
    // const DEFAULT_MATH_COLOR = tinycolor("#0000FF");
    // const DEFAULT_COMP_COLOR = tinycolor("#EE7600");

    // const year = Math.floor(number / 1000) - 1;

    if (course === "MATH") {
        mathIndex++;
        return colorMaps[mathIndex];
    }
    compIndex++;
    return colorMaps[compIndex];
};


ColorDecider.textColor = function(course, number, section) {
    const isLabOrTut = section.startsWith("5") || section.startsWith("4");

    return isLabOrTut ? "#FFF" : "#FFF";
};
