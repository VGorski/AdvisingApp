require("dotenv").config();
const { CHAR } = require("sequelize");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

const Advisor = sequelize.define("Advisor", {
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  role: Sequelize.ENUM("ADMIN", "PROGRAMDIRECTOR", "ADVISOR"),
  discipline: CHAR(3),
});

sequelize.query("SELECT * FROM Advisor").then((advisor) => {
  console.log(advisor[0]);
});
