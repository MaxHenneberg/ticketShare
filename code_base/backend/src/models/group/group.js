"use strict";

const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema(
    {
      type: String,
      name: String,
      desc: String,

      //For now only the Path because of limited Resources on DB
      // Maybe GridFS(https://docs.mongodb.com/manual/core/gridfs/) later
      headerPic: String,

      public: Boolean,

      pricePerPerson: {
        priceAmount: Number,
        currency: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "currency",
        }
      },

      // ticket
			ticketInformation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ticketInformation",
      },


      //user
      creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
    {timestamps: true}
);

module.exports = mongoose.model("group", GroupSchema);
