var express = require("express");
var adminRouter = express.Router();
var advisorUtil = require("../utils/advisorUtil");
var adviseeUtil = require("../utils/adviseeUtil");
var courseUtil = require("../utils/courseUtil");
var adminUtil = require("../utils/adminUtil");

adminRouter.route("/").get((req, res, next) => {
  // Get admin dashboard
  res.end();
});

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
