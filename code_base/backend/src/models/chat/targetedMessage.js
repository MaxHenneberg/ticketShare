const mongoose = require("mongoose");
const Message = require("./message");

const TargetedMessageSchema = new mongoose.Schema({
      creator: mongoose.Types.ObjectId,
      message: {
        title: String,
        text: String
      },
      recipient: mongoose.Types.ObjectId
    },
    {timestamps: true}
);

module.exports = mongoose.model("targetedMessage", TargetedMessageSchema);
