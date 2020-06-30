const mongoose = require("mongoose");
const Message = require("./message");

const GroupChatSchema = new mongoose.Schema({
    group: mongoose.Types.ObjectId,
    messages: [mongoose.Types.ObjectId]
    },
    {timestamps: true}
);

module.exports = mongoose.model("groupChat", GroupChatSchema);
