"use strict";
const Group = require("../models/group/group");
const Join_Info = require("../models/group/joinInformation");
const {check, validationResult} = require("express-validator");

/**
 * Validates the requests
 *
 * @param method Argument from the middleware, name of function who's request is to be validated
 */

exports.validate = (method) => {
  switch (method) {
    case "getFreeSlots": {
      return [
        check("id", "Group ID Required")
        .exists()
        .bail()
        .notEmpty()
        .bail()
        .isMongoId()
        .withMessage("Invalid Value for Group"),
      ];
    }
  }
};

exports.createJoinInformationImpl =function (userId, groupId) {
  const joinInformation = {
    group: groupId,
    joinedUser: userId,
    payed: false,
    ticketDelivered: false,
    ticketReceived: false,

    showPersonalInformation: false
  };
	return Join_Info.create(joinInformation);
};

// Gets free slots for a given group ID.

exports.getFreeSlots = async (req, res) => {
  const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  try {
    let group = await Group.findById(req.params.id)
    .populate({
      path: "ticket",
      select: "initialFreeSlotsLeft maxCoveredPeople",
    })
    .exec();
    var initial_slots = group.ticket.initialFreeSlotsLeft;
    /****
     *
     *  Get the documents JoinInfo for the group
     *  joined users is the number of results
     **/
    let joinees = await Join_Info.countDocuments({group: group.id}).exec();
    /*
         Calculate free slots
        */
    var free_slots = initial_slots - joinees;
    // Return free slots
    res.status(200).send({group: group.id, free_slots: free_slots});
  } catch (err) {
    console.log(err);
    err = {errors: [{msg: err}]};
    return res.status(400).json(err);
  }
};

exports.countOccSlotsForGroupImpl = function(id){
  return Join_Info.countDocuments(
      {group:id});
};

exports.countOccSlotsForGroup = function (req, res) {
  console.log("COunt OCC slots for group");
  Join_Info.countDocuments(
      {group: req.query.group}).then(result => {
    if (result != null) {
      console.log("Success");
      return res.status(200).send(
          {occupied: result});
    } else {
      console.log(result);
      console.log("Malformed Result");
      return res.status(400).send({error: "Malformed Result"});
    }
  }).catch(error => {
    console.error(error);
    return res.status(400).send({error: error});
  });
};



/**
 * Get groups joined by user based on user id. Returns list of groupids
 * @param req Request
 * @param res Response => list of group id's
 */
exports.getJoinedGroups = async (req, res) => {
  try {
    let user_id = req.params.user_id;
    let objects = await Join_Info.find({joinedUser: user_id}, "group").exec();
    /*
    the object format: [ {id:str,group:str}, {id:str,group:str}]
    */
    var result = [];
    objects.forEach(function (object) {
      result.push(object["group"]);
    });
    console.log(result);
    return res.status(200).send(result);
  } catch (err) {
    console.log(err);
    err = {errors: [{msg: err}]};
    return res.status(400).json(err);
  }
};

exports.getJoinInfoByGroup = async function (req, res) {
  try {
    const joinInfo = await Join_Info.find({group: req.query.groupId}).populate("joinedUser");
    if(!joinInfo){
      res.status = 404;
      return res.send();
    }
    res.status = 200;
    return res.send(joinInfo);
  }catch (e) {
    res.status =400;
    res.send({error: e});
  }
};

