const mongoose = require("mongoose");
const Message = require("message");

const GroupNotificationSchema = new mongoose.Schema({
    message: Message,
    comments: [Message]
    },
    {timestamps: true}
);

module.exports = mongoose.model("groupNotification", GroupNotificationSchema);
