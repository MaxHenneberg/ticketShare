const mongoose = require("mongoose");
const Message = require("message");

const GroupChatSchema = new mongoose.Schema({
    group: mongoose.Types.ObjectId,
    messages: [Message]
    },
    {timestamps: true}
);

module.exports = mongoose.model("groupChat", GroupChatSchema);
