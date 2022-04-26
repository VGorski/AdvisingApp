// Authors: Timothy Carta and Victoria Gorski

require("dotenv").config();
const Sequelize = require("sequelize");

// Model defines the Sequelize JavaScript library so that Sequelize can be used 
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
      acquire: 150000,
      idle: 120000,
    },
    define: {
      // Prevent sequelize from pluralizing table names
      freezeTableName: true,
      // Remove timestamps from the columns
      timestamps: false,
    },
  }
);

module.exports = sequelize;