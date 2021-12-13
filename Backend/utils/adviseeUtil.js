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

// Add a new schedule to the schedule table and then update the Course_Schedule table
async function postSchedule(scheduleInfo, courses) {
  // Insert the planned schedule
  await sequelize.query(`INSERT INTO Schedule (advisee_id, modified_date, adviseeSignature, advisorSignature) VALUES(${scheduleInfo.advisee_id},"${scheduleInfo.modified_date}","${scheduleInfo.adviseeSignature}","${scheduleInfo.advisorSignature}");`);

  // Get the id of the last schedule (the one we just put in)
  let increment_object = await sequelize.query("SELECT AUTO_INCREMENT FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'Schedule';");
  schedule_id = increment_object[0][0]["AUTO_INCREMENT"]-1;

  // Update Course_Schedule table with all of the courses inserted
  courses.forEach(async (course) => {
    await sequelize.query(`INSERT INTO Course_Schedule (schedule_id, course_id) VALUES(${schedule_id},${course.course_id});`);
  });
}

module.exports = {
  getAdvisees,
  getSchedule,
  postSchedule,
};
