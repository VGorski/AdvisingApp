var express = require('express');
var advisorRoute = express.Router();
// Add designated model here
// Add Microsoft database server here

advisorRoute
    .route('/advisor/:advisorId')
    .get((req, res, next) => {
        // Get advisor dashboard
        res.end();
    });



advisorRoute
    .route('/advisor/:advisorId/advisees')
    .get((req, res, next) => {
        // Get all advisees with advisor_id == advisor's id
        res.end();
    });



advisorRoute
    .route('/advisor/:advisorId/advisees/:adviseeId/schedule')
    .get((req, res, next) => {
        // Get the advisor's schedule dashboard and the schedule of a specific advisee
        res.end();
    })
    .post((req, res, next) => {
        // Post a new schedule for the advisee
        res.end();
    })
    .put((req, res, next) => {
        // Update the schedule for the advisee
        res.end();
    });



advisorRoute
    .route('/advisor/:advisorId/report')
    .get((req, res, next) => {
        // Get the discrepancy report for the advisor
        res.end();
    });

module.exports = advisorRoute;