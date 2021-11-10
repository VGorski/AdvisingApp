var adviseeModel = new Object();

var adviseeModel = {
    "advisee_id": {
        "type": "number",
        "uniqueItems": true,
        "minimum": 1
    },

    "firstName": {
        "type": "string",
        "minLength": 1,
        "maxLength": 50
    },

    "lastName": {
        "type": "string",
        "minLength": 1,
        "maxLength": 50
    },

    "email": {
        "type": "string",
        "minLength": 1,
        "maxLength": 50
    },

    "password": {
        "type": "string",
        "minLength": 1,
        "maxLength": 50,
        "options": {
            "hidden": true
        }
    },

    "discipline": {
        "type": "string",
        "minLength": 3,
        "maxLength": 3
    },

    "required" : ["advisee_id", "firstName", "lastName", "email", "password", "discipline"],
    "primaryKey": "advisee_id",
    "foreignKeys": [{
        "resource": "advisorModel.js",
        "fields": "advisor_id"
    }]
};

module.exports = adviseeModel;