// Authors: Timothy Carta and Victoria Gorski

var express = require("express");
var courseRouter = express.Router();
var courseUtil = require("../utils/courseUtil");

// Get all the courses stored in the database
courseRouter.route("/").get((req, res, next) => {
  courseUtil.getAllCourses().then((courses) => {
    res.status(200);
    res.json(courses);
    res.end();
  });
});

// Get all the courses from all the disciplines defined in the database
courseRouter.route("/disciplines/").get((req, res, next) => {
  courseUtil.getDisciplines().then((disciplines) => {
    res.status(200);
    res.json(disciplines);
    res.end();
  });
});

// Get courses from a specific discipline 
courseRouter.route("/:discipline/").get((req, res, next) => {
  courseUtil.getCourses(req.params.discipline).then((courses) => {
    res.status(200);
    res.json(courses);
    res.end();
  });
});

module.exports = courseRouter;
