const mongoose = require("mongoose");
const Price = require("../util/price");
const EventInformation = require("eventInformation")

const TicketInformationSchema = new mongoose.Schema({
      fullPrice: Price,
      maxCoveredPeople: Number,
      initialFreeSlotsLeft: Number,

      eventInformation: mongoose.Types.ObjectId
    },
    {timestamps: true}
);

module.exports = mongoose.model("ticketInformation", TicketInformationSchema);
