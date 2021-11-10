var advisorModel = new Object();

var advisorModel = {
    "advisor_id": {
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

    "role": {
        "type": {
            "enum": ["ADMIN", "PROGRAMDIRECTOR", "ADVISOR", "ADVISEE"]
        }
    },

    "discipline": {
        "type": "string",
        "minLength": 3,
        "maxLength": 3
    },

    "required" : ["advisor_id", "firstName", "lastName", "email", "password", "role", "discipline"],
    "primaryKey" : "advisor_id"
};

module.exports = advisorModel;