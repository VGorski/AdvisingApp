// Authors: Timothy Carta and Victoria Gorski

var Schedule = require("../models/scheduleModelSeq");
async function findSchedules() {
  let schedules = await Schedule.findAll();
  return schedules;
}

// Test for getting an advisee's schedule
findSchedules()
  .then((schedules) => {
    schedules.forEach((schedule) => {
      console.log(schedule.dataValues);
    });
  })
  .catch((err) => {
    console.log(err);
  });