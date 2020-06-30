"use strict";

const mongoose = require("mongoose");
const Price = require("../util/price");
const EventInformation = require("./eventInformation")

const TicketInformationSchema = new mongoose.Schema({
      fullPrice: Number,
      maxCoveredPeople: Number,
      initialFreeSlotsLeft: Number,

      // EventInformation
      eventInformation: mongoose.Types.ObjectId,

      // currency
      currency: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Currency",
      },
    },
    {timestamps: true}
);

module.exports = mongoose.model("ticketInformation", TicketInformationSchema);
