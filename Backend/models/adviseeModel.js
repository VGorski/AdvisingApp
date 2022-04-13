const { Model } = require("sequelize");
const sequelize = require("./sequelize");
const Sequelize = require("sequelize");

class adviseeModel extends Model {}

adviseeModel.init(
  {
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
  },
  {
    modelName: "advisee",
    sequelize,
    tableName: "advisee",
  }
);

module.exports = adviseeModel;
