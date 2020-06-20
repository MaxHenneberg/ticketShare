const mongoose = require("mongoose");
const Price = require("../util/price");
const EventInformation = require("./eventInformation")

const TicketInformationSchema = new mongoose.Schema({
      fullPrice: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Price",
      },
      maxCoveredPeople: Number,
      initialFreeSlotsLeft: Number,

      eventInformation: mongoose.Types.ObjectId
    },
    {timestamps: true}
);

module.exports = mongoose.model("ticketInformation", TicketInformationSchema);
