"use strict";

const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema(
	{
		type: String,
		name: String,
		desc: String,

		//For now only the Path because of limited Resources on DB
		// Maybe GridFS(https://docs.mongodb.com/manual/core/gridfs/) later
		headerPic: String,
		joinDeadline: Date,
		public: Boolean,

		// ticket
		ticket: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "TicketInformation",
		},
		//user
		creator: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("group", GroupSchema);
