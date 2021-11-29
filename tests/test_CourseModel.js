var Course = require("../models/courseModelSeq");

async function findCourses() {
  let courses = await Course.findAll();
  return courses;
}

findCourses()
  .then((courses) => {
    courses.forEach((course) => {
      console.log(course.dataValues);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// async function createCourse(
//   name,
//   discipline,
// ) {
//   const course = await Course.create({
//     name: name,
//     discipline: discipline,
//   });
//   return course;
// }

// createAdvisee("IER490", "IER")
//   .then((course) => {
//     console.log(course);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
