const mongoose = require("mongoose");

const BaseAttributesSchema = new mongoose.Schema({
	id: {
		type: mongoose.Schema.Types.ObjectId,
		index: true,
		required: true,
		auto: true,
	},
	deleted: Boolean,
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("BaseAttribute", BaseAttributesSchema);
