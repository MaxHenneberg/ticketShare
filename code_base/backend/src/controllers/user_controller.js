const User = require('../models/user/user');
const Address = require("../models/user/address");

const dbUtil = require("../models/dbUtil");
const authController = require('../controllers/auth_controller');

/**
 * Handles User Registration for Rest path /users/register
 * Checks for duplicated Username and PW constraints
 *
 * @param req Request
 * @param res Response
 */
exports.register = function (req, res) {
  console.log("Recieved Register Request with: " + req.body.username + "/"
      + req.body.password);
  authController.handleRegister(req.body.username, req.body.password,
      function (err, user, addInfo) {
        if (err) {
          return res.send(err);
        }
        if (!user) {
          return res.send(addInfo.message);
        }
        return res.send(user);
      });
};

/**
 * REST function
 * Finds User by id given in req
 * @param req Request
 * @param res Response
 */
exports.findUserById = function (req, res) {
  User.findById(req.body.id, {}, function (err, result) {
    if (err) {
      console.error(err);
      return res.send(err);
    }
    if (!result) {
      res.statusCode = 404;
      return res.send(result);
    }
    return res.send(result);
  })
};

exports.getAddressListByUser = function (req, res) {
console.log("Get Address for User: "+req.user._id);
  Address.find({user: req.user._id}, function (err, addresses) {
    const response = dbUtil.handleCallback(err, addresses);
    if (response) {
      res.statusCode = response.statusCode;
      res.send({error: response.error});
    }

    return res.send({adresses: addresses});
  });
};

/**
 * Test Cookies
 * @param req Request
 * @param res Response
 */
exports.findFromCookie = function (req, res) {
  //console.log("User: "+req.user);
  res.send(req.user);
};

exports.createDummyAddress = function (req, res) {
  const adr = new Address({
    user: req.user._id,
    nickName: "MyPaymentAdress",

    firstname: "FirstName",
    lastname: "LastName",

    street: "Jochbergweg",
    streetNumber: "7",
    city: "Garching",
    country: "Deutschland",
    countryCode: "85748"
  })
  adr.save();
  res.send(adr);
};
