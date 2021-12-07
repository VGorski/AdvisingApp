var Advisee = require("../models/adviseeModel");
async function getAdvisees(advisor_id) {
  let advisees = await Advisee.findAll({
    where: {
      advisor_id: advisor_id,
    },
  });
  console.log(advisees);
  return advisees;
}

module.exports = {
  getAdvisees,
};
