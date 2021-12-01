var express = require("express");
var adviseeRouter = express.Router();
// Add designated model here
// Add Microsoft database server here

adviseeRouter.route("/:adviseeId").get((req, res, next) => {
  // Get advisee dashboard
  res.status(200);
  res.end();
});

adviseeRouter.route("/:adviseeId/schedule").get((req, res, next) => {
  // Get the schedule view for the advisee
  res.status(200);
  res.end();
});

module.exports = adviseeRouter;
