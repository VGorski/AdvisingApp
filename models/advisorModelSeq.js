let Advisee = require("./adviseeModelSeq");
let sequelize = require("./sequelize");
const Sequelize = require("sequelize");
const { CHAR } = require("sequelize");

const Advisor = sequelize.define("Advisor", {
  advisor_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  role: Sequelize.ENUM("ADMIN", "PROGRAMDIRECTOR", "ADVISOR"),
  discipline: CHAR(3),
});

Advisor.hasMany(Advisee); // Set one to many relationship

module.exports = Advisor;
