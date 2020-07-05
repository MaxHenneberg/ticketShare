const mongoose = require("mongoose");

const JoinInformationSchema = new mongoose.Schema({
      //group
      group: mongoose.Types.ObjectId,
      //user
      joinedUser: mongoose.Types.ObjectId,

      payed: Boolean,
      payer_id: String,

      ticketDelivered: Boolean,
      ticketReceived: Boolean,

      showPersonalInformation: Boolean
    },
    {timestamps: true}
);

module.exports = mongoose.model("joinInformation", JoinInformationSchema);
