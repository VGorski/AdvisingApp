const sequelize = require("../models/sequelize");
const Course = require("../models/courseModelSeq");

// Returns all courses
async function getAllCourses() {
  let courses = await Course.findAll();
  return courses;
}

// Returns all courses with a given discipline
async function getCourses(discipline) {
  let courses = await Course.findAll({
    where: {
      discipline: discipline,
    },
  });
  return courses;
}

// Returns all disciplines
async function getDisciplines() {
  let disciplines = Course.findAll({
    attributes: ["discipline"],
    group: ["discipline"],
  });
  return disciplines;
}

async function postCourses(courses) {
  courses.forEach(async (course) => {
    // Double check that the data contains a course
    if (course.name != "") {
      // If it is listed as a course as well as its lab
      if (course.name.includes("/")) {
        let baseCourse = course.name.split("/")[0].trim();
        // Get the Course name (AN) and add it to the lab (104L) to get the full course name (AN104L)
        let labCourse =
          baseCourse.split(" ")[0] + " " + course.name.split("/")[1].trim();

        await sequelize.query(
          `INSERT IGNORE INTO Course (name, discipline, iCourse) VALUES ('${baseCourse}', '${course.discipline}', '${course.iCourse}')`
        );
        await sequelize.query(
          `INSERT IGNORE INTO Course (name, discipline, iCourse) VALUES ('${labCourse}', '${course.discipline}', '${course.iCourse}')`
        );
      } else {
        await sequelize.query(
          `INSERT IGNORE INTO Course (name, discipline, iCourse) VALUES ('${course.name}', '${course.discipline}', '${course.iCourse}')`
        );
      }
    }
  });
}

module.exports = {
  getAllCourses,
  getCourses,
  getDisciplines,
  postCourses,
};
