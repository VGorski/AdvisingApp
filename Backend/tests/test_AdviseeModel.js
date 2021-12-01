var Advisee = require("../models/adviseeModelSeq");
var au = require("../utils/adviseeUtil");

au.getAdvisees(4)
  .then((advisees) => {
    advisees.forEach((advisee) => {
      console.log(advisee.dataValues);
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
//   return advisee;
// }

// createAdvisee(1, "James", "Coomey", "James.Coomey@quinnipiac.edu", "password", "IER")
//   .then((advisee) => {
//     console.log(advisee);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
