// Authors: Timothy Carta and Victoria Gorski

const { Model } = require("sequelize");
const sequelize = require("./sequelize");
const Sequelize = require("sequelize");
let Advisee = require("./adviseeModel");

// Class extends Sequelize model
class advisorModel extends Model {}

// Model creates an advisor user with all the required information
advisorModel.init(
  {
    advisor_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    role: Sequelize.ENUM("ADMIN", "PROGRAMDIRECTOR", "ADVISOR"),
    discipline: Sequelize.CHAR(3),
  },
  {
    modelName: "advisor",
    sequelize,
    tableName: "advisor",
  }
);

module.exports = advisorModel;