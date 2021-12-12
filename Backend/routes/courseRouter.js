var express = require("express");
var courseRouter = express.Router();
var courseUtil = require("../utils/courseUtil");

courseRouter.route("/").get((req, res, next) => {
  courseUtil.getAllCourses().then((courses) => {
    res.status(200);
    res.json(courses);
    res.end();
  });
});

courseRouter.route("/disciplines/").get((req, res, next) => {
  courseUtil.getDisciplines().then((disciplines) => {
    res.status(200);
    res.json(disciplines);
    res.end();
  });
});

courseRouter.route("/:discipline/").get((req, res, next) => {
  courseUtil.getCourses(req.params.discipline).then((courses) => {
    res.status(200);
    res.json(courses);
    res.end();
  });
});

module.exports = courseRouter;
