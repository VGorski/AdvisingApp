// Authors: Timothy Carta and Victoria Gorski

var express = require("express");
var advisorRouter = express.Router();
var adviseeUtil = require("../utils/adviseeUtil");
var advisorUtil = require("../utils/advisorUtil");

// Get the name of the advisor
advisorRouter.route("/:advisorId/name").get((req, res, next) => {
  advisorUtil.getAdvisorName(req.params.advisorId).then((advisor) => {
    res.status(200);
    res.json(advisor);
    res.end();
  });
});

// Get the advisees that belong to the advisor
advisorRouter.route("/:advisorId/advisees").get((req, res, next) => {
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

// Get all advisors that exist
advisorRouter.route("/all").get((req, res, next) => {
  advisorUtil
    .getAllAdvisors()
    .then((advisors) => {
      res.status(200);
      res.json(advisors);
      res.end();
    })
    .catch((err) => {
      res.status(404);
      res.json(err);
      res.end();
    });
});

// Get an advisor's advisee's schedule
advisorRouter
  .route("/:advisorId/advisees/:adviseeId/schedule")
  // Get the schedule for the advisee
  .get((req, res, next) => {
    res.end();
  })
  // Update the schedule for the advisee
  .put((req, res, next) => {
    res.end();
  })
  // Post a new schedule for the advisee
  .post((req, res, next) => {
    res.end();
  });

module.exports = advisorRouter;
