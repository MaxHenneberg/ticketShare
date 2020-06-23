const User = require('../models/user/user');
const authController = require('../controllers/auth_controller');
const JoinInformation = require('../models/group/joinInformation');
const Address = require('../models/user/address');

/**
 * Handles User Registration for Rest path /users/register
 * Checks for duplicated Username and PW constraints
 *
 * @param req Request
 * @param res Response
 */
exports.register = function (req, res) {
  console.log("Recieved Register Request with: "+req.body.username+"/"+req.body.password);
  authController.handleRegister(req.body.username, req.body.password,
      function (err, user, addInfo) {
        if (err) {
          return res.send(err);
        }
        if(!user){
          return res.send(addInfo.message);
        }
        return res.send(user);
      });
};

/**
 * REST function
 * Finds User details by id given in req
 * @param req Request
 * @param res Response
 */
exports.getUserDetails = function (req, res) {
  User.findById(req.params.id, {}, function (err, result) {
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

/**
 * Test Cookies
 * @param req Request
 * @param res Response
 */
exports.findFromCookie = function (req, res) {
  //console.log("User: "+req.user);
  res.send(req.user);
};

/**
 * Change user details to logged in user
 * Details like:
 *    - username
 *    - UserInformation.surname
 *    - UserInformation.firstname
 *    - UserInformation.birthDate
 * @param req Request
 * @param res Response
 */
exports.editUserDetails = (req, res) => {
  let userDetails = req.body;

  User.findOneAndUpdate({_id: req.user._id}, userDetails, {upsert: true}, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  })
};

/**
 * Get all users from database
 * @param req Request
 * @param res Response
 */
exports.getAllUsers = (req, res) => {
  User.find({}, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  })
};

/**
 * Gets all the tickets a user is related to.
 * @param req Request
 * @param res Response
 */
exports.getUserTickets = (req, res) => {
  JoinInformation.find({"joinedUser": req.user._id}, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  })
};

/**
 * Gets all the addresses a user is related to.
 * @param req Request
 * @param res Response
 */
exports.getUserAddresses = (req, res) => {
  Address.find({"user": req.user._id}, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  })
};
