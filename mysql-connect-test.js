var Advisee = require("./models/adviseeModelSeq");
async function findAdvisee() {
  let advisees = await Advisee.findAll({
    where: {
      advisor_id: 3,
    },
  });
  return advisees;
}

findAdvisee()
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
//   // let's assume the default of isAdmin is false
//   return advisee;
// }

// createAdvisee()
//   .then((advisee) => {
//     console.log(advisee.firstName);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
