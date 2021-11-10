var express = require('express');
var programDRoute = express.Router();
// Add designated model here
// Add Microsoft database server here

programDRoute
    .route('/programDirector/:directorId')
    .get((req, res, next) => {
        // Get program director dashboard
        res.end();
    });



programDRoute
    .route('/programDirector/:directorId/advisees')
    .get((req, res, next) => {
        // Get all advisees with advisor_id == director's id
        res.end();
    });



programDRoute
    .route('/programDirector/:directorId/report')
    .get((req, res, next) => {
        // Get the discrepancy report for the director
        res.end();
    });

module.exports = programDRoute;