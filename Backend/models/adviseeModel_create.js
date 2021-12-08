const Sequelize = require("sequelize");

const sequelize = require("./sequelize");

const Advisee = sequelize.define("Advisee", {
  advisee_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  advisor_id: {
    type: Sequelize.INTEGER,
    references: {
      model: "Advisor",
      key: "advisor_id",
    },
  },
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  discipline: Sequelize.CHAR(3),
});

module.exports = Advisee;
