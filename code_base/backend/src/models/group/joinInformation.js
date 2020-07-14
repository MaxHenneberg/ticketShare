const mongoose = require("mongoose");

const JoinInformationSchema = new mongoose.Schema(
	{
		//group
		group: mongoose.Types.ObjectId,
		//user
		joinedUser: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user",
		},

		payed: Boolean,
      payer_id: String,

		ticketDelivered: Boolean,
		ticketReceived: Boolean,

		showPersonalInformation: Boolean,
	},
	{ timestamps: true }
);

module.exports = mongoose.model("joinInformation", JoinInformationSchema);
