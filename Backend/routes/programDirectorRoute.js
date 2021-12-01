var express = require("express");
var programDRouter = express.Router();
// Add designated model here
// Add Microsoft database server here

programDRouter.route("/:directorId").get((req, res, next) => {
  // Get program director dashboard
  res.status(200);
  res.end();
});

programDRouter.route("/:directorId/advisees").get((req, res, next) => {
  // Get all advisees with advisor_id == director's id
  res.status(200);
  res.end();
});

programDRouter.route("/:directorId/report").get((req, res, next) => {
  // Get the discrepancy report for the director
  res.status(200);
  res.end();
});

module.exports = programDRouter;
