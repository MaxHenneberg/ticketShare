const mongoose = require("mongoose");

const JoinInformationSchema = new mongoose.Schema(
	{
		//group
		group: mongoose.Types.ObjectId,
		//user
		joinedUser: mongoose.Types.ObjectId,

		payed: Boolean,

		ticketDelivered: Boolean,
		ticketRecieved: Boolean,

		showPersonalInformation: Boolean,
	},
	{ timestamps: true }
);

module.exports = mongoose.model("joinInformation", JoinInformationSchema);
