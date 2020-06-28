"use strict";

const mongoose = require("mongoose");
const Price = require("../util/price");
const EventInformation = require("./eventInformation")

const TicketInformationSchema = new mongoose.Schema({
      fullPrice: Number,
      maxCoveredPeople: Number,
      initialFreeSlotsLeft: Number,

      eventInformation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "eventInformation"
      },

      // currency
      currency: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "currency",
      },
    },
    {timestamps: true}
);

module.exports = mongoose.model("ticketInformation", TicketInformationSchema);
