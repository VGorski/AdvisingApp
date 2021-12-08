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

// Returns all courses for the given advisee
async function getSchedule(advisee_id) {
  courses = sequelize.query(`SELECT * FROM Course Where Course.course_id IN (
    SELECT Course_Schedule.course_id FROM Course_Schedule WHERE schedule_id IN (
        SELECT Schedule.schedule_id FROM Schedule WHERE Schedule.advisee_id = ${advisee_id}))
    `);

  return courses;
}

module.exports = {
  getAdvisees,
  getSchedule,
};
