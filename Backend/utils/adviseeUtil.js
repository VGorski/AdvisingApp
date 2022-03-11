var Course = require("../models/courseModelSeq");
var Schedule = require("../models/scheduleModelSeq");
var Advisee = require("../models/adviseeModel");
const sequelize = require("../models/sequelize");

// Returns all advisees that are under the given advisor
async function getAdvisees(advisor_id) {
  let advisees = await Advisee.findAll({
    where: {
      advisor_id: advisor_id,
    },
  });
  console.log(advisees);
  return advisees;
}

// Returns advisor given id
async function getAdviseeName(advisee_id) {
  let advisee = await sequelize.query(
    `SELECT firstName, lastName FROM Advisee WHERE advisee_id = ${advisee_id}`
  );
  return advisee[0][0];
}

// Returns all courses for the given advisee
async function getSchedule(advisee_id) {
  courses = sequelize.query(`SELECT * FROM Course
  WHERE course_id IN 
    (SELECT course_id FROM Course_Schedule
      WHERE schedule_id IN
      (SELECT schedule_id FROM Schedule
          WHERE advisee_id IN
        (SELECT advisee_id FROM Advisee WHERE advisee_id = ${advisee_id})
      AND Schedule.modified_date != 0
          )
    );`);

  return courses;
}

// Add a new schedule to the schedule table and then update the Course_Schedule table
async function postSchedule(scheduleInfo, courses) {
  // [BEGIN] Delete previous schedule
  await sequelize.query(
    `DELETE FROM course_schedule WHERE schedule_id IN (select schedule_id FROM Schedule WHERE modified_date != 0 AND advisee_id = ${scheduleInfo.advisee_id});`
  );

  await sequelize.query(
    `DELETE FROM Schedule WHERE advisee_id = ${scheduleInfo.advisee_id} AND modified_date != 0;`
  );
  // [END] delete previous schedule

  // Insert the planned schedule
  await sequelize.query(
    `INSERT INTO Schedule (advisee_id, modified_date, adviseeSignature, advisorSignature) VALUES(${scheduleInfo.advisee_id},"${scheduleInfo.modified_date}","${scheduleInfo.adviseeSignature}","${scheduleInfo.advisorSignature}");`
  );

  // Get the id of the last schedule (the one we just put in)
  let increment_object = await sequelize.query(
    "SELECT AUTO_INCREMENT FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'Schedule';"
  );
  schedule_id = increment_object[0][0]["AUTO_INCREMENT"] - 10;

  // Update Course_Schedule table with all of the courses inserted
  courses.forEach(async (course) => {
    await sequelize
      .query(
        `INSERT INTO Course_Schedule (schedule_id, course_id) VALUES(${schedule_id},${course.course_id});`
      )
      .catch((err) => {
        console.log(err);
      });
  });
}

async function postAdvisees(uniqueAdvisees) {
  await uniqueAdvisees.forEach(async (advisee) => {
    // Double check that the advisee is an actual advisee
    if (advisee.firstName && advisee.email) {
      // Get the corresponding Advisor for this advisee
      let advisorObject = await sequelize.query(
        `SELECT advisor_id FROM Advisor WHERE email = '${advisee.advisorEmail}'`
      );

      // Add the advisee to the database
      await sequelize
        .query(
          `INSERT IGNORE INTO Advisee (advisor_id, firstName, lastName, email, password, discipline)
        VALUES (${advisorObject[0][0].advisor_id}, '${advisee.firstName}', '${advisee.lastName}', '${advisee.email}', 'password', '${advisee.discipline}')`
        )
        .catch((err) => {
          console.log(err);
        });
    }
  });
}

async function postTakenCourses(takenCourseData) {
  takenCourseData
    .forEach(async (courseData) => {
      // Ensure that there is an object there
      if (courseData.email && courseData.course) {
        let adviseeObject = await sequelize.query(
          `SELECT advisee_id FROM Advisee WHERE email = '${courseData.email}'`
        );

        let courseObject = await sequelize.query(
          `SELECT course_id FROM Course WHERE name = '${courseData.course}'`
        );

        // Make a new schedule that is at date 0 so that it will never be considered as a recent schedule
        let scheduleInfo = {
          advisee_id: adviseeObject[0][0].advisee_id,
          modified_date: new Date(0),
          adviseeSignature: "PREVIOUSLY TAKEN",
          advisorSignature: "PREVIOUSLY TAKEN",
        };

        let course = {
          course_id: courseObject[0][0].course_id,
        };

        let courses = [course];

        postSchedule(scheduleInfo, courses);
      }
    })
    .catch((err) => {
      console.log("ERROR: " + err);
    });
}

async function postRegisteredCourses(registeredCourseData) {
  registeredCourseData
    .forEach(async (courseData) => {
      // Ensure that there is an object there
      if (courseData.firstName && courseData.course) {
        let adviseeObject = await sequelize.query(
          `SELECT advisee_id FROM Advisee WHERE firstName = '${courseData.firstName}' AND lastName = '${courseData.lastName}'`
        );

        let courseObject = await sequelize.query(
          `SELECT course_id FROM Course WHERE name = '${courseData.course}'`
        );

        // Make a new schedule that is at date 0 so that it will never be considered as a recent schedule
        let scheduleInfo = {
          advisee_id: adviseeObject[0][0].advisee_id,
          modified_date: new Date(0),
          adviseeSignature: "REGISTERED",
          advisorSignature: "REGISTERED",
        };

        if (courseObject[0][0]) {
          let course = {
            course_id: courseObject[0][0].course_id,
          };

          let courses = [course];

          postSchedule(scheduleInfo, courses);
        }
      }
    })
    .catch((err) => {
      console.log("ERROR: " + err);
    });
}

async function getTakenCourses(adviseeId) {
  courses = await sequelize.query(
    `SELECT * FROM Course
        WHERE course_id IN 
          (SELECT course_id FROM Course_Schedule
            WHERE schedule_id IN
            (SELECT schedule_id FROM Schedule
                WHERE advisee_id IN
              (SELECT advisee_id FROM Advisee WHERE advisee_id = ${adviseeId})
            AND Schedule.modified_date = 0
            AND Schedule.adviseeSignature = 'PREVIOUSLY TAKEN'
                )
          );`
  );

  return courses[0];
}

async function getRegisteredCourses(adviseeId) {
  courses = await sequelize.query(
    `SELECT * FROM Course
        WHERE course_id IN 
          (SELECT course_id FROM Course_Schedule
            WHERE schedule_id IN
            (SELECT schedule_id FROM Schedule
                WHERE advisee_id IN
              (SELECT advisee_id FROM Advisee WHERE advisee_id = ${adviseeId})
            AND Schedule.modified_date = 0
            AND Schedule.adviseeSignature = 'REGISTERED'
                )
          );`
  );

  return courses[0];
}

module.exports = {
  getAdvisees,
  getAdviseeName,
  getSchedule,
  postSchedule,
  postAdvisees,
  postTakenCourses,
  getTakenCourses,
  getRegisteredCourses,
  postRegisteredCourses,
};
