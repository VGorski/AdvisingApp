const sequelize = require("../models/sequelize");

function uploadFile(fileType) {
  if (fileType) {
    sequelize.query(`INSERT INTO Files (${fileType}) VALUES (1)`);
  }
  return;
}

function getMathCourses() {
  return sequelize.query(`SELECT file_id FROM Files WHERE mathCourses`);
}

function getEngineeringCourses() {
  return sequelize.query(`SELECT file_id FROM Files WHERE engineeringCourses`);
}

function getUCCourses() {
  return sequelize.query(`SELECT file_id FROM Files WHERE ucCourses`);
}

function getAllCourses() {
  return sequelize.query(`SELECT file_id FROM Files WHERE allCourses`);
}

function getStudentsFaculty() {
  return sequelize.query(`SELECT file_id FROM Files WHERE studentsFaculty`);
}

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
