const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema({
      //user
      user: mongoose.Types.ObjectId,

      rating: Number,
      comment: String
    },
    {timestamps: true}
);

module.exports = mongoose.model("rating", RatingSchema);
