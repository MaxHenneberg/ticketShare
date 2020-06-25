"use strict";

const mongoose = require("mongoose");

const CurrencySchema = new mongoose.Schema({
      name: String,
      short_form : String,
    },
);

module.exports = mongoose.model("currency", CurrencySchema);
