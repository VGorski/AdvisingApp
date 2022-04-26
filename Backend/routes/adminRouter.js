// Authors: Timothy Carta and Victoria Gorski

var express = require("express");
var adminRouter = express.Router();
var advisorUtil = require("../utils/advisorUtil");
var adviseeUtil = require("../utils/adviseeUtil");
var courseUtil = require("../utils/courseUtil");
var adminUtil = require("../utils/adminUtil");

// Get the admin dashboard
adminRouter.route("/").get((req, res, next) => {
  res.end();
});

// Get the admin file upload page
adminRouter.route("/files").post((req, res, next) => {
  adminUtil
    .uploadFile(req.body.fileType)
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

// Upload the list of math courses given by the uploaded file
adminRouter.route("/files/math").get((req, res, next) => {
  adminUtil.getMathCourses().then((file) => {
    res.status(200);
    if (file[0][0]) {
      res.send(true);
    } else {
      res.send(false);
    }
    res.end();
  });
});

// Upload the list of engineering courses given by the uploaded file
adminRouter.route("/files/engineering").get((req, res, next) => {
  adminUtil.getEngineeringCourses().then((file) => {
    res.status(200);
    if (file[0][0]) {
      res.send(true);
    } else {
      res.send(false);
    }
    res.end();
  });
});

// Upload the list UC courses given by the uploaded file
adminRouter.route("/files/ucCourses").get((req, res, next) => {
  adminUtil.getUCCourses().then((file) => {
    res.status(200);
    if (file[0][0]) {
      res.send(true);
    } else {
      res.send(false);
    }
    res.end();
  });
});

// Upload the list of all courses given by the uploaded file
adminRouter.route("/files/allCourses").get((req, res, next) => {
  adminUtil.getAllCourses().then((file) => {
    res.status(200);
    if (file[0][0]) {
      res.send(true);
    } else {
      res.send(false);
    }
    res.end();
  });
});

// Upload the list of all advisees and their advisors given by the uploaded file
adminRouter.route("/files/studentsFaculty").get((req, res, next) => {
  adminUtil.getStudentsFaculty().then((file) => {
    res.status(200);
    if (file[0][0]) {
      res.send(true);
    } else {
      res.send(false);
    }
    res.end();
  });
});

// Upload the list of all advisee registered courses given by the uploaded file
adminRouter.route("/files/registered").get((req, res, next) => {
  adminUtil.getRegisteredCourses().then((file) => {
    res.status(200);
    if (file[0][0]) {
      res.send(true);
    } else {
      res.send(false);
    }
    res.end();
  });
});

// Get the list of all advisors
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

// Get the list of all advisees
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

// Get the list of all courses
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

// Get the list of all courses taken by an advisee
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

// Get the list of all courses an advisee is registered for
adminRouter.route("/upload/registeredCourses").post((req, res, next) => {
  adviseeUtil
    .postRegisteredCourses(req.body)
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

// Get all advisees with advisor_id == admin's id
adminRouter.route("/:advisorId/advisees").get((req, res, next) => {
  res.status(200);
  res.end();
});

// Get the discrepancy report for the admin
adminRouter.route("/report").get((req, res, next) => {
  res.status(200);
  res.end();
});

module.exports = adminRouter;