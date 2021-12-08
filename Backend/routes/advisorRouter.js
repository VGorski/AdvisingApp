var express = require("express");
var advisorRouter = express.Router();
var adviseeUtil = require("../utils/adviseeUtil");

advisorRouter.route("/:advisorId").get((req, res, next) => {
  // Get advisor dashboard
  res.end();
});
advisorRouter.route("/:advisorId/advisees").get((req, res, next) => {
  // Get the advisees that belong to the advisor
  adviseeUtil
    .getAdvisees(req.params.advisorId)
    .then((advisees) => {
      res.status(200);
      res.json(advisees);
      res.end();
    })
    .catch((err) => {
      res.status(404);
      res.json(err);
      res.end();
    });
});

advisorRouter
  .route("/:advisorId/advisees/:adviseeId/schedule")
  .get((req, res, next) => {
    // Get the schedule for the advisee
    res.end();
  })
  .put((req, res, next) => {
    // Update the schedule for the advisee
    res.end();
  })
  .post((req, res, next) => {
    // Post a new schedule for the advisee
    res.end();
  });

module.exports = advisorRouter;
