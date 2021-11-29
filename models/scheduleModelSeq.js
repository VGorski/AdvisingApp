let Advisee = require("./adviseeModelSeq");
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

Schedule.hasOne(Advisee); // Set one to one relationship

module.exports = Schedule;
