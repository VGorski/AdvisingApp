// Authors: Timothy Carta and Victoria Gorski

let sequelize = require("./sequelize");
const Sequelize = require("sequelize");

// Model defines a course and all its necessary information
const Course = sequelize.define("Course", {
  course_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  discipline: Sequelize.CHAR(3),
});

module.exports = Course;
