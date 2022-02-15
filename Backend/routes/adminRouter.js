var express = require('express');
var adminRouter = express.Router();
var advisorUtil = require("../utils/advisorUtil");
var adviseeUtil = require("../utils/adviseeUtil");
var courseUtil = require("../utils/courseUtil");

adminRouter.route("/").get((req, res, next) => {
  // Get admin dashboard
  res.end();
});

adminRouter.route("/upload/advisors").post((req, res, next) => {
  console.log(req.body);
  advisorUtil
    .postAdvisors(req.body)
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

adminRouter.route("/upload/advisees").post((req, res, next) => {
  console.log(req.body);
  adviseeUtil
    .postAdvisees(req.body)
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

adminRouter.route("/upload/courses").post((req, res, next) => {
  console.log(req.body);
  courseUtil
    .postCourses(req.body)
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

adminRouter.route("/upload/takenCourses").post((req, res, next) => {
  adviseeUtil
    .postTakenCourses(req.body)
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