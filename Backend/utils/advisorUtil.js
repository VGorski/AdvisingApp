const sequelize = require("../models/sequelize");

// Returns advisor given id
async function getAdvisorName(advisor_id) {
  let advisor = await sequelize.query(
    `SELECT firstName, lastName FROM Advisor WHERE advisor_id = ${advisor_id}`
  );
  return advisor[0][0];
}

async function getAllAdvisors() {
  let advisors = await sequelize.query(
    "SELECT advisor_id, firstName, lastName FROM Advisor"
  );
  return advisors[0];
}

async function postAdvisors(uniqueAdvisors) {
  uniqueAdvisors.forEach(async (advisor) => {
    // Double check that the advisor is an actual advisor
    if (advisor.firstName != undefined && advisor.email != undefined) {
      // Add the advisee to the database
      await sequelize
        .query(
          `INSERT IGNORE INTO Advisor (firstName, lastName, email, password, role, discipline)
        VALUES ('${advisor.firstName}', '${advisor.lastName}', '${advisor.email}', 'password', 'ADVISOR', '${advisor.discipline}')`
        )
        .catch((err) => {
          console.error(err);
        });
    }
  });
}

module.exports = {
  getAdvisorName,
  getAllAdvisors,
  postAdvisors,
};
