const mongoose = require("mongoose");

const SearchTagSchema = new mongoose.Schema({
      user: mongoose.Types.ObjectId,

      tag: String
    },
    {timestamps: true}
);

module.exports = mongoose.model("searchTag", SearchTagSchema);
