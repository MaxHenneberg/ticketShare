const mongoose = require("mongoose");
const Message = require("./message");

const TargetedMessageSchema = new mongoose.Schema({
      //User
      creator: mongoose.Types.ObjectId,
      //User
      recipient: mongoose.Types.ObjectId,
      message: {
        title: String,
        text: String
      }
    },
    {timestamps: true}
);

module.exports = mongoose.model("targetedMessage", TargetedMessageSchema);
