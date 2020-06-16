const mongoose = require("mongoose");

const JoinInformationSchema = new mongoose.Schema({
      ticketDelivered: Boolean,
      ticketRecieved: Boolean,

      showPersonalInformation: Boolean,

      joinedUser: mongoose.Types.ObjectId
    },
    {timestamps: true}
);

module.exports = mongoose.model("joinInformation", JoinInformationSchema);
