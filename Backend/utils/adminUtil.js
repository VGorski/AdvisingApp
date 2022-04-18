// Authors: Timothy Carta and Victoria Gorski

const sequelize = require("../models/sequelize");

// Upload file information given by the admin user
function uploadFile(fileType) {
  if (fileType) {
    switch (fileType) {
      // If the file uploaded is for math courses
      case "mathCourses":
        sequelize.query(`INSERT INTO Files (mathCourses) VALUES (1)`);
        break;
      // If the file uploaded is for engineering courses
      case "engineeringCourses":
        sequelize.query(`INSERT INTO Files (engineeringCourses) VALUES (1)`);
        break;
      // If the file uploaded is for UC courses
      case "ucCourses":
        sequelize.query(`INSERT INTO Files (ucCourses) VALUES (1)`);
        break;
      // If the file uploaded is for all courses
      case "allCourses":
        sequelize.query(`INSERT INTO Files (allCourses) VALUES (1)`);
        break;
      // If the file uploaded is for all advisees and advisors
      case "studentsFaculty":
        sequelize.query(`INSERT INTO Files (studentsFaculty) VALUES (1)`);
        break;
      // If the file uploaded is for advisees' registered courses 
      case "registeredCourses":
        sequelize.query(`INSERT INTO Files (registeredCourses) VALUES (1)`);
        break;
    }
  }
}

// Get all math courses from the database
function getMathCourses() {
  return sequelize.query(`SELECT file_id FROM Files WHERE mathCourses`);
}

// Get all engineering courses from the database
function getEngineeringCourses() {
  return sequelize.query(`SELECT file_id FROM Files WHERE engineeringCourses`);
}

// Get all UC courses from the database
function getUCCourses() {
  return sequelize.query(`SELECT file_id FROM Files WHERE ucCourses`);
}

//Get all courses from the database
function getAllCourses() {
  return sequelize.query(`SELECT file_id FROM Files WHERE allCourses`);
}

// Get all advisees and advisors from the database
function getStudentsFaculty() {
  return sequelize.query(`SELECT file_id FROM Files WHERE studentsFaculty`);
}

// Get all an advisee's registered courses from the database
function getRegisteredCourses() {
  return sequelize.query(`SELECT file_id FROM Files WHERE registeredCourses`);
}

module.exports = {
  uploadFile,
  getMathCourses,
  getEngineeringCourses,
  getUCCourses,
  getAllCourses,
  getStudentsFaculty,
  getRegisteredCourses,
};
