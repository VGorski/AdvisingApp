// Authors: Timothy Carta and Victoria Gorski

var express = require("express");
var adviseeRouter = express.Router();
var adviseeUtil = require("../utils/adviseeUtil");

// Get the advisee dashboard
adviseeRouter.route("/:adviseeId").get((req, res, next) => {
  res.status(200);
  res.end();
});

// Get the name of the advisee
adviseeRouter.route("/:adviseeId/name").get((req, res, next) => {
  adviseeUtil.getAdviseeName(req.params.adviseeId).then((advisee) => {
    res.status(200);
    res.json(advisee);
    res.end();
  });
});

// Get the schedule that corresponds to the advisee
adviseeRouter
  .route("/:adviseeId/schedule")
  .get((req, res, next) => {
    // Get the advisees that belong to the advisor
    adviseeUtil
      .getSchedule(req.params.adviseeId)
      .then((schedule) => {
        res.status(200);
        res.json(schedule[0]);
        res.end();
      })
      .catch((err) => {
        res.status(404);
        res.json(err);
        res.end();
      });
  })
  // Get the advisee's schedule
  .post((req, res, next) => {
    adviseeUtil
      .postSchedule(req.body.scheduleForm, req.body.chosen_courses)
      .then(() => {
        res.status(201);
        res.end();
      })
      .catch((err) => {
        res.status(404);
        res.json(err);
        res.end();
      });
  });

// Get the advisee's taken courses 
adviseeRouter.route("/:adviseeId/taken-courses").get((req, res, next) => {
  adviseeUtil.getTakenCourses(req.params.adviseeId).then((courses) => {
    res.status(200);
    res.json(courses);
    res.end();
  });
});

// Get the advisee's registered courses
adviseeRouter.route("/:adviseeId/registered-courses").get((req, res, next) => {
  adviseeUtil.getRegisteredCourses(req.params.adviseeId).then((courses) => {
    res.status(200);
    res.json(courses);
    res.end();
  });
});

module.exports = adviseeRouter;
