"use strict";

const mongoose = require("mongoose");

const EventInformationSchema = new mongoose.Schema({
      name: String,
      desc: String,
      eventStart: Date,
      eventEnd: Date,

      linkToEvent: String
    },
    {timestamps: true}
);

module.exports = mongoose.model("eventInformation", EventInformationSchema);
