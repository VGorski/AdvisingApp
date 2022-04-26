// Authors: Timothy Carta and Victoria Gorski

let sequelize = require("./sequelize");
const Sequelize = require("sequelize");

// Model defines an advisee's schedule and all its necessary information
const Schedule = sequelize.define("Schedule", {
  schedule_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  advisee_id: {
    type: Sequelize.INTEGER,
    references: {
      model: "Advisee",
      key: "advisee_id",
    },
  },
  modified_date: Sequelize.DATE,
  adviseeSignature: Sequelize.STRING,
  advisorSignature: Sequelize.STRING,
});

module.exports = Schedule;