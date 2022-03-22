const sequelize = require("../models/sequelize");

function uploadFile(fileType) {
  console.log(fileType);
  if (fileType) {
    switch (fileType) {
      case "mathCourses":
        sequelize.query(`INSERT INTO Files (mathCourses) VALUES (1)`);
        break;

      case "engineeringCourses":
        sequelize.query(`INSERT INTO Files (engineeringCourses) VALUES (1)`);
        break;

      case "ucCourses":
        sequelize.query(`INSERT INTO Files (ucCourses) VALUES (1)`);
        break;

      case "allCourses":
        sequelize.query(`INSERT INTO Files (allCourses) VALUES (1)`);
        break;

      case "studentsFaculty":
        sequelize.query(`INSERT INTO Files (studentsFaculty) VALUES (1)`);
        break;

      case "registeredCourses":
        sequelize.query(`INSERT INTO Files (registeredCourses) VALUES (1)`);
        break;
    }
  }
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
