var courseModel = new Object();

var courseModel = {
    "course_id": {
        "type": "number",
        "uniqueItems": true,
        "minimum": 1
    },

    "name": {
        "type": "string",
        "minLength": 1,
        "maxLength": 50
    },

    "discipline": {
        "type": "string",
        "minLength": 3,
        "maxLength": 3
    },

    "required" : ["course_id", "name", "discipline"],
    "primaryKey": "course_id"
};

module.exports = courseModel;