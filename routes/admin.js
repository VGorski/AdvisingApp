var express = require('express');
var adminRoute = express.Router();
// Add designated model here
// Add Microsoft database server here

adminRoute
    .route('/admin')
    .get((req, res, next) => {
        // Get admin dashboard
        res.end();
    });



adminRoute
    .route('/admin/upload')
    .get((req, res, next) => {
        // Get upload screen
        res.end();
    })
    .post((req, res, next) => {
        // Post file to be uploaded and type of file selected
        res.end();
    });



adminRoute
    .route('/admin/:advisorId/advisees')
    .get((req, res, next) => {
        // Get all advisees with advisor_id == admin's id
        res.end();
    });



adminRoute
    .route('/admin/report')
    .get((req, res, next) => {
        // Get the discrepancy report for the admin
        res.end();
    });

module.exports = adminRoute;