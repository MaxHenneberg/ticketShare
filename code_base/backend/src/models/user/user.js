const mongoose = require("mongoose");
const Address = require("../user/address");
const SearchTag = require("../group/searchTag")

const UserSchema = new mongoose.Schema({
      username: {
        type: String,
        required: true,
      },
      passwordHash: {
        type: String,
        required: true,
      },
      userInformation: {
        surname: String,
        firstname: String,
        birthDate: Date,
      },
    },
    {timestamps: true}
);

module.exports = mongoose.model("user", UserSchema);

