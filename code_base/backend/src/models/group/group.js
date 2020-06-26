const mongoose = require("mongoose");
const Price = require("../util/price");

const GroupSchema = new mongoose.Schema({
      type: String,
      name: String,
      desc: String,

      //For now only the Path because of limited Resources on DB
      // Maybe GridFS(https://docs.mongodb.com/manual/core/gridfs/) later
      headerPic: String,

      public: Boolean,
      pricePerPerson: String,
      joinDeadline: Date,

      //user
      creator: mongoose.Types.ObjectId
    },
    {timestamps: true}
);

module.exports = mongoose.model("group", GroupSchema);
