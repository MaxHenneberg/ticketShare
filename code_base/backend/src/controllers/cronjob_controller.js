const cron = require("node-cron");
const JoinInformation = require("../models/group/joinInformation");

exports.setupCrons = function () {
  console.log("Setup Crons");
  cron.schedule("*/3 * * * *", deleteUnpayedJoinInformation)
};

function deleteUnpayedJoinInformation() {
  console.log("Delete Unpayed JoinInfo");
  var cutoff = new Date(Date.now());
  cutoff.setMinutes(cutoff.getMinutes()-3);
  JoinInformation.findOneAndDelete({createdAt: {$lt: cutoff}, payed: false}).exec();
}
