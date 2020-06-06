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
      UserInformation: {
        surname: String,
        firstname: String,
        birthDate: Date,

        billingAdresses: [
          {
            nickName: String,

            street: String,
            streetNumber: String,
            city: String,
            country: String,
            countryCode: String
          }
        ],
      },
      searchTags: [String]
    },
    {timestamps: true}
);

/**
 * Finds User by given Username
 * @param username Given username
 * @param callback function(err, result)
 */
exports.findByUsername = function (username, callback) {
  User.findOne({usename: searchedUsername}, function (err, result) {
    callback(err, result);
  })
};

module.exports = mongoose.model("user", UserSchema);

