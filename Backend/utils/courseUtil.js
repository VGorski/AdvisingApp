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

module.exports = {
  getAllCourses,
  getCourses,
  getDisciplines,
};
