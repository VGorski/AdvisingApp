const sequelize = require("../models/sequelize");

// Returns advisor given id
async function getAdvisorName(advisor_id) {
  let advisor = await sequelize.query(
    `SELECT firstName, lastName FROM Advisor WHERE advisor_id = ${advisor_id}`
  );
  return advisor[0][0];
}

module.exports = {
  getAdvisorName,
};
