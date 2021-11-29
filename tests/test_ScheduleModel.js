var Schedule = require("../models/scheduleModelSeq");
async function findSchedules() {
  let schedules = await Schedule.findAll();
  return schedules;
}

findSchedules()
  .then((schedules) => {
    schedules.forEach((schedule) => {
      console.log(schedule.dataValues);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// async function createSchedule(
//   advisee_id,
//   modified_date,
//   adviseeSignature,
//   advisorSignature,
// ) {
//   const schedule = await Schedule.create({
//     advisee_id: advisee_id,
//     modified_date: modified_date,
//     adviseeSignature: adviseeSignature,
//     advisorSignature: advisorSignature,
//   });
//   return schedule;
// }

// createSchedule(2, "2021-11-29")
//   .then((schedule) => {
//     console.log(schedule);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
