let sequelize = require("./sequelize");
const Sequelize = require("sequelize");

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
