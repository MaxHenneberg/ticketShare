const mongoose = require("mongoose");

const LoginSchema = new mongoose.Schema({
      //user
      user: mongoose.Types.ObjectId,

      location: String,
      browser: String
    },
    {timestamps: true}
);

module.exports = mongoose.model("login", RatingSchema);
