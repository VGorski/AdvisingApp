// Authors: Timothy Carta and Victoria Gorski

var Advisee = require("../models/adviseeModelSeq");
var au = require("../utils/adviseeUtil");

// Test for getting an advisee
au.getAdvisees(4)
  .then((advisees) => {
    advisees.forEach((advisee) => {
      console.log(advisee.dataValues);
    });
  })
  .catch((err) => {
    console.log(err);
  });

