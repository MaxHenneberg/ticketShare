const mongoose = require("mongoose");
const Message = require("message");

const GroupNotificationSchema = new mongoose.Schema({
      //user
      creator: mongoose.Types.ObjectId,
      //group
      group: mongoose.Types.ObjectId,
      order: Number,

      message: {
        title: String,
        text: String
      },
      comments: [mongoose.Types.ObjectId]
    },
    {timestamps: true}
);

module.exports = mongoose.model("groupNotification", GroupNotificationSchema);
