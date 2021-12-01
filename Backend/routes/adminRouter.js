var express = require('express');
var adminRouter = express.Router();
// Add designated model here
// Add Microsoft database server here

adminRouter.route("/").get((req, res, next) => {
  // Get admin dashboard
  res.end();
});

adminRouter
  .route("/upload")
  .get((req, res, next) => {
    // Get upload screen
    res.status(200);
    res.end();
  })
  .post((req, res, next) => {
    // Post file to be uploaded and type of file selected
    res.end();
  });

adminRouter.route("/:advisorId/advisees").get((req, res, next) => {
  // Get all advisees with advisor_id == admin's id
  res.status(200);
  res.end();
});

adminRouter.route("/report").get((req, res, next) => {
  // Get the discrepancy report for the admin
  res.status(200);
  res.end();
});

module.exports = adminRouter;