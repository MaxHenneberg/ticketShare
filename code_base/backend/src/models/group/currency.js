"use strict";

const mongoose = require("mongoose");

const CurrencySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	short_form: {
		type: String,
		required: true,
		uppercase: true,
		maxlength: 3,
	},
	symbol: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("currency", CurrencySchema);
