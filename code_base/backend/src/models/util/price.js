const mongoose = require("mongoose");

const PriceSchema = new mongoose.Schema({
      priceAmount: Number,
      priceUnit: String
    },
    {timestamps: true}
);

module.exports = mongoose.model("price", PriceSchema);
