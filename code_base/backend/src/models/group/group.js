const mongoose = require("mongoose");
const JoinInformation = require("./joinInformation");
const Price = require("../util/price");
const GroupNotification = require("../chat/groupNotification");

const GroupSchema = new mongoose.Schema(
	{
		type: String,
		name: String,
		desc: String,

		//For now only the Path because of limited Resources on DB
		// Maybe GridFS(https://docs.mongodb.com/manual/core/gridfs/) later
		headerPic: String,

		public: Boolean,

		pricePerPerson: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Price",
		},

		joinDeadline: Date,

		participants: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],

		creator: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("group", GroupSchema);
