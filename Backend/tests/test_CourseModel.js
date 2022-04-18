// Authors: Timothy Carta and Victoria Gorski

var Course = require("../models/courseModelSeq");

async function findCourses() {
  let courses = await Course.findAll();
  return courses;
}

// Test for getting a course
findCourses()
  .then((courses) => {
    courses.forEach((course) => {
      console.log(course.dataValues);
    });
  })
  .catch((err) => {
    console.log(err);
  });