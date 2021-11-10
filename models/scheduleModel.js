var scheduleModel = new Object();

var scheduleModel = {
    "schedule_id": {
        "type": "number",
        "uniqueItems": true,
        "minimum": 1
    },

    "modified_date": {
        "type": "string",
        "format": "date-time"
    },

    "adviseeSignature": {
        "type": "string",
        "minLength": 1,
        "maxLength": 50
    },

    "advisorSignature": {
        "type": "string",
        "minLength": 1,
        "maxLength": 50
    },

    "required" : ["schedule_id", "modified_date", "adviseeSignature", "advisorSignature"],
    "primaryKey": "schedule_id",
    "foreignKeys": [{
        "resource": "adviseeModel.js",
        "fields": "advisee_id"
    }]
};

module.exports = scheduleModel;