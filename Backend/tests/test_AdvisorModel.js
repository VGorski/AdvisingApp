var Advisor = require("../models/advisorModelSeq");
async function findAdvisors() {
  let advisors = await Advisor.findAll();
  return advisors;
}

findAdvisors()
  .then((advisors) => {
    advisors.forEach((advisor) => {
      console.log(advisor.dataValues);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// async function createAdvisor(
//   firstName,
//   lastName,
//   email,
//   password,
//   role,
//   discipline
// ) {
//   const advisor = await Advisor.create({
//     firstName: firstName,
//     lastName: lastName,
//     email: email,
//     password: password,
//     role: role,
//     discipline: discipline,
//   });
//   return advisor;
// }

// createAdvisor("Christian", "Duncan", "Christian.Duncan@quinnipiac.edu", "password", "CSC")
//   .then((advisor) => {
//     console.log(advisor);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
