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
      /// If the course is either cross listed or contains a lab
      if (course.name.includes("/")) {
        let courseName = course.name.split("/");
        let firstCourse = courseName[0].split(" ")[0];
        let secondCourse = courseName[1].split(" ")[1];
        if (secondCourse.slice(-1) == "L" || secondCourse.slice(-1) == "H") {
          /// If it is listed as a course as well as its lab or honors
          let baseCourse = courseName[0].trim();
          // Get the Course name (AN) and add it to the lab (104L) to get the full course name (AN 104L)
          let labCourse = baseCourse.split(" ")[0] + " " + courseName[1].trim();

          await sequelize.query(
            `INSERT IGNORE INTO Course (name, discipline, iCourse) VALUES ('${baseCourse}', '${course.discipline}', ${course.iCourse})`
          );
          await sequelize.query(
            `INSERT IGNORE INTO Course (name, discipline, iCourse) VALUES ('${labCourse}', '${course.discipline}', ${course.iCourse})`
          );
        } else {
          /// If the course is cross-listed
          await sequelize.query(
            `INSERT IGNORE INTO Course (name, discipline, iCourse) VALUES ('${courseName[0].trim()}', '${
              course.discipline
            }', ${course.iCourse})`
          );
          await sequelize.query(
            `INSERT IGNORE INTO Course (name, discipline, iCourse) VALUES ('${courseName[1].trim()}', '${
              course.discipline
            }', ${course.iCourse})`
          );
        }
      } else {
        // If the course is not cross-listed nor contains a lab
        await sequelize.query(
          `INSERT IGNORE INTO Course (name, discipline, iCourse) VALUES ('${course.name}', '${course.discipline}', ${course.iCourse})`
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
