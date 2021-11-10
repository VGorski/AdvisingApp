var express = require('express');
var adviseeRoute = express.Router();
// Add designated model here
// Add Microsoft database server here

adviseeRoute
    .route('/advisee/:adviseeId')
    .get((req, res, next) => {
        // Get advisee dashboard
        res.end();
    });



adviseeRoute
    .route('/advisee/:adviseeId/schedule')
    .get((req, res, next) => {
        // Get the schedule view for the advisee
        res.end();
    });

module.exports = adviseeRoute;