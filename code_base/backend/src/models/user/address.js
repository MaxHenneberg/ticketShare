const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
      nickName: String,

      street: String,
      streetNumber: String,
      city: String,
      country: String,
      countryCode: String
    },
    {timestamps: true}
);

module.exports = mongoose.model("address", AddressSchema);
