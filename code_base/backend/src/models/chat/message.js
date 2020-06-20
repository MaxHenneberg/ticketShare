const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
      //user
      creator: mongoose.Types.ObjectId,

      title: String,
      text: String
    },
    {timestamps: true}
);

module.exports = mongoose.model("message", MessageSchema);
