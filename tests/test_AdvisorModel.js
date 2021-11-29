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

// async function createAdvisee(
//   advisor_id,
//   firstName,
//   lastName,
//   email,
//   password,
//   discipline
// ) {
//   const advisee = await Advisee.create({
//     advisor_id: advisor_id,
//     firstName: firstName,
//     lastName: lastName,
//     email: email,
//     password: password,
//     discipline: discipline,
//   });
//   // let's assume the default of isAdmin is false
//   return advisee;
// }

// createAdvisee(1, "James", "Coomey", "James.Coomey@quinnipiac.edu", "password", "IER")
//   .then((advisee) => {
//     console.log(advisee.firstName);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
