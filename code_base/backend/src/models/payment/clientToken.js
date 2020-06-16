const mongoose = require("mongoose");

const ClientTokenSchema = new mongoose.Schema({
      user: mongoose.Types.ObjectId,
      token: String,
    },
    {timestamps: true}
);

module.exports = mongoose.model("clientToken", ClientTokenSchema);
