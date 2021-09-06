var codesEnum = createEnum([
    // Register
    "InvalidUsername",
    "InvalidRepeatPassword", 

    // Login
    "InvalidPassword",
    "BannedUser",

    // Server
    "InternalServerError",

    // Client
    "InvalidHeaders"
]);

function createEnum(values) {

    const enumObject = {};

    for(var value of values) {
        enumObject[value] = value;
    }

    return Object.freeze(enumObject);

}

function getCodesArray() {

    var codesArray = {};

    for(var i = 0; i < Object.keys(codesEnum).length; i++) {
        codesArray[Object.keys(codesEnum)[i]] = i + 1;
    }

    return codesArray;

}

module.exports = { getCodesArray };