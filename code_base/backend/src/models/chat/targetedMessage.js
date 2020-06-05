const mongoose = require("mongoose");
const Message = require("Message");

const TargetedMessageSchema = new mongoose.Schema({
      message: Message,
      recipient: mongoose.Types.ObjectId
    },
    {timestamps: true}
);

module.exports = mongoose.model("targetedMessage", TargetedMessageSchema);
