// Authors: Timothy Carta and Victoria Gorski

var Advisor = require("../models/advisorModelSeq");
async function findAdvisors() {
  let advisors = await Advisor.findAll();
  return advisors;
}

// Test for getting an advisor
findAdvisors()
  .then((advisors) => {
    advisors.forEach((advisor) => {
      console.log(advisor.dataValues);
    });
  })
  .catch((err) => {
    console.log(err);
  });