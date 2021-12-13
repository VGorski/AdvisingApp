var express = require("express");
var adviseeRouter = express.Router();
var adviseeUtil = require("../utils/adviseeUtil");
// Add designated model here
// Add Microsoft database server here

adviseeRouter.route("/:adviseeId").get((req, res, next) => {
  // Get advisee dashboard
  res.status(200);
  res.end();
});

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

module.exports = adviseeRouter;
