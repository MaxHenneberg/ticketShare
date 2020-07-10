const User = require('../models/user/user');
const authController = require('../controllers/auth_controller');
const JoinInformation = require('../models/group/joinInformation');
const Address = require('../models/user/address');
const Group = require("../models/group/group");

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
exports.getUserDetails = (req, res) => {
  try {
    User.findById(req.query.id, {}, function (err, result) {
      if (!result) {
        res.statusCode = 404;
        return res.send(result);
      }
      res.status(200).send(result)
    })
  } catch (err) {
      err = { errors: [{ msg: err }] };
      return res.status(400).json(err);
  }
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
  try {
    let userDetails = req.body;

    User.findOneAndUpdate({_id: req.user._id}, userDetails, {upsert: true}, function(err, result) {
      res.status(200).send(result)
    })
  } catch (err) {
      err = { errors: [{ msg: err }] };
      return res.status(400).json(err);
  }
};

/**
 * Get all users from database
 * @param req Request
 * @param res Response
 */
exports.getAllUsers = (req, res) => {
  try {
    User.find({}, function(err, result) {
        res.status(200).send(result)
    })
  } catch (err) {
      err = { errors: [{ msg: err }] };
      return res.status(400).json(err);
  }
};

/**
 * Gets all the tickets a user is related to.
 * @param req Request
 * @param res Response
 */
exports.getUserTickets = (req, res) => {
  try {
    JoinInformation.find({"joinedUser": req.user._id}, function(err, result) {
        res.status(200).send(result)
    })
  } catch (err) {
      err = { errors: [{ msg: err }] };
      return res.status(400).json(err);
  }
};

/**
 * Gets all the addresses a user is related to.
 * @param req Request
 * @param res Response
 */
exports.getUserAddresses = (req, res) => {
  try {
    Address.find({"user": req.user._id}, function(err, result) {
        res.status(200).send(result)
    })
  } catch (err) {
      err = { errors: [{ msg: err }] };
      return res.status(400).json(err);
  }
};

/**
 * Add a new address to logged in user
 * @param req Request
 * @param res Response
 */
exports.addAddress = (req, res) => {
  try {
    newAddress = Address();

    newAddress.user = req.user._id;
    newAddress.nickName = req.body.nickName;
    newAddress.street = req.body.street;
    newAddress.streetNumber = req.body.streetNumber;
    newAddress.city = req.body.city;
    newAddress.countryCode = req.body.countryCode;

    newAddress.save(function(err){
      if(err){ throw err; }
      console.log('saved');
    })

    res.json({'message': 'address is saved'});
  } catch (err) {
      err = { errors: [{ msg: err }] };
      return res.status(400).json(err);
  }
};

/**
 * Edit an address of logged in user
 * @param req Request
 * @param res Response
 */
exports.editAddress = (req, res) => {
  try {
    let addressDetails = req.body;
    let addressId = req.params.id;
    Address.findOneAndUpdate({_id: addressId, user: req.user._id }, addressDetails, {upsert: true}, function(err, result) {
        res.status(200).send(result)
    })
  } catch (err) {
      err = { errors: [{ msg: err }] };
      return res.status(400).json(err);
  }
};

/**
 * Add a new join information for logged in user
 * @param req Request
 * @param res Response
 */
exports.addJoinInformation = (req, res) => {
  try {
    newJoinInfo = JoinInformation();

    newJoinInfo.group = req.params.groupId;
    newJoinInfo.joinedUser = req.user._id;
    newJoinInfo.payed = req.body.payed;
    newJoinInfo.ticketDelivered = req.body.ticketDelivered;
    newJoinInfo.ticketRecieved = req.body.ticketRecieved;
    newJoinInfo.showPersonalInformation = req.body.showPersonalInformation;
  
    newJoinInfo.save(function(err){
        res.status(200).send({'message': 'Join info is saved.'})
    })
  } catch (err) {
      err = { errors: [{ msg: err }] };
      return res.status(400).json(err);
  }
};

/**
 * Edit a join information of logged in user
 * @param req Request
 * @param res Response
 */
exports.editJoinInformation = (req, res) => {

  try {
    let joinInfoDetails = req.body;
    let groupId = req.params.groupId;
    
    JoinInformation.findOneAndUpdate({group: groupId, joinedUser: req.user._id }, joinInfoDetails, {upsert: true}, function(err, result) {
      res.status(200).send({'message': 'Change has been made.'})
    })
  } catch (err) {
      err = { errors: [{ msg: err }] };
      return res.status(400).json(err);
  }
};

/**
 * Get user's created groups based on user id. Returns list of groupids
 * @param req Request
 * @param res Response => list of group id's
 */
exports.getCreatedGroups = async (req, res) => {
	try {
		let user_id = req.params.user_id;
		let objects = await Group.find({ creator: user_id }, "_id").exec();
		/*
    the object format: [ {id:str}, {id:str}]
    */
		result = [];
		objects.forEach(function (object) {
			result.push(object["_id"]);
		});
		return res.status(200).send(result);
	} catch (err) {
		err = { errors: [{ msg: err }] };
		return res.status(400).json(err);
	}
};
