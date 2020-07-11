"use strict";

const User = require("../models/user/user");
const Group = require("../models/group/group");
const EventInformation = require("../models/group/eventInformation");
const Ticket = require("../models/group/ticketInformation");
const Currency = require("../models/group/currency");
const JoinInformation = require("../models/group/joinInformation");
const TicketInformation = require("../models/group/ticketInformation");
const Join_Info = require("../models/group/joinInformation");
const Search_Tag = require("../models/group/searchTag");
const http = require("http");
const {body, validationResult} = require("express-validator");
const fetch = require('node-fetch');

// Gets all groups.
exports.getAllGroups = (req, res) => {

  try {
    Group.find({}, function (err, result) {
      res.status(200).send(result)
    })
  } catch (err) {
    err = {errors: [{msg: err}]};
    return res.status(400).json(err);
  }
};

/**
 * Validates the create group request
 *
 * @param method Argument from the middleware, name of function who's request is to be validated
 */

exports.validate = (method) => {
  switch (method) {
    case "create": {
      return [
        body("name", "Group Name Required").exists(),
        body("type", "Group Type Required").exists(),
        body("desc", "Group Description Required").exists(),
        body("is_public", "Public Parameter Required")
        .exists()
        .isBoolean()
        .withMessage("Invalid Value for Public"),
        // validate event info
        body("eventInformation", "Event Information Required").exists(),
        body("eventInformation.name", "Event Name Required").exists(),
        body("eventInformation.desc", "Event Description Required").exists(),
        body("eventInformation.eventStart", "Event StartDate Required")
        .exists()
        .isDate()
        .withMessage("Invalid Date Format"),
        body("eventInformation.eventEnd", "Event EndDate Required")
        .exists()
        .isDate()
        .withMessage("Invalid Date Format"),
        body("eventInformation.linkToEvent", "Link to Event Required").exists(),
        // validate ticket info
        body("ticketInfo", "Ticket Information Required").exists(),
        body("ticketInfo.fullPrice", "Ticket Price Required").exists(),
        body("ticketInfo.maxCoveredPeople", "Max People per Ticket Required")
        .exists()
        .isInt()
        .withMessage("Max People must be a number"),
        body("ticketInfo.initialFreeSlotsLeft", "Ticket Free Slots Required")
        .exists()
        .isInt()
        .withMessage("Free Slots must be a number"),
        body("ticketInfo.currency", "Ticket Currency Required")
        .exists()
        .isMongoId()
        .withMessage("Invalid Value for Currency"),
      ];
    }
  }
};

/**
 * Handles group create request
 *
 * @param req Request
 * @param res Response
 */

exports.create = async (req, res) => {
  // TODO: Header Pic and Price Per Person
  const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
  if (!errors.isEmpty()) {
    res.status(422).json({errors: errors.array()});
    return;
  }

  try {
    // validate if currency exists in db
    var currency_id = req.body.ticketInfo.currency;
    let currency_object = await Currency.findById(currency_id).exec();
    if (!currency_object) {
      throw "Invalid Currency";
    }
    /*
      Create documents.
    */
    // create EventInformation
    let event_info = await EventInformation.create(req.body.eventInformation);
    // create ticket info
    req.body.ticketInfo.eventInformation = event_info.id;
    let ticket = await Ticket.create(req.body.ticketInfo);
    // create group
    let group = await Group.create({
      name: req.body.name,
      type: req.body.type,
      desc: req.body.desc,
      public: req.body.is_public,
      creator: req.user.id,
      event: event_info.id,
    });
    return res.status(200).send({group: group.id});
  } catch (err) {
    return res.status(400).send({
      errors: err,
    });
  }
};

exports.findGroupById = function (req, res) {
  if (req.query.populate) {
    console.log("With Populate");
    findGroupByIdAndPopulateRefs(req, res);
  } else {
    console.log("Without Populate");
    Group.findById(req.query.id, {}, function (err, result) {
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
  }
};

function findGroupByIdAndPopulateRefs(req, res) {
  console.log("findGroupByIdAndPopulateRefs");
  findGroupByIdAndPopulateRefsImpl(req.query.id).then(
      function (result) {
        if (!result) {
          res.statusCode = 404;
          return res.send({error: "Entity not Found"});
        }
        return res.send(result);
      }).catch(function (err) {
    if (err) {
      console.error(err);
      res.statusCode = 400;
      return res.send({error: err});
    }
  })
};

function findGroupByIdAndPopulateRefsImpl(id) {
  return Group.findById(id, {})
  .populate("ticket")
  .populate({path: "ticket", populate: {path: "eventInformation"}})
  .populate({path: "ticket", populate: {path: "currency"}});
}

exports.countOccSlotsForGroup = function (req, res) {
  countOccSlotsForGroupImpl(req.query.group).then(result => {
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

function countOccSlotsForGroupImpl(id) {
  return JoinInformation.countDocuments(
      {group: id});
}

function createJoinInformationImpl(userId, groupId) {
  const joinInformation = {
    group: groupId,
    joinedUser: userId,
    payed: false,
    ticketDelivered: false,
    ticketReceived: false,

    showPersonalInformation: false
  };

  return JoinInformation.create(joinInformation);
};

function getJoinInformationByUserId_GroupIdImpl(userId, groupId) {
  return Join_Info.findOne({group: groupId, joinedUser: userId});
}

function deleteJoinInformationByUserId_GrouPIdImpl(userId, groupId) {
  return Join_Info.findOneAndDelete({group: groupId, joinedUser: userId});
}

exports.initGroupJoin = async function (req, res) {
  console.log("Init Group Join");
  try {
    let group = await findGroupByIdAndPopulateRefsImpl(req.body.group).exec();
    console.log("Group:" + group._id);
    let occSlots = await countOccSlotsForGroupImpl(req.body.group).exec();
    console.log("FreeSlots:" + group.ticket.initialFreeSlotsLeft);
    console.log("OccSlots:" + occSlots);
    if (group.ticket.initialFreeSlotsLeft <= occSlots) {
      throw "Could not reserve Groupslot!";
    }
    let joinInformation = await createJoinInformationImpl(req.user, req.body.group);
    if (!joinInformation) {
      throw "Could not create JoinInformation";
    }
    console.log("Reserved Spot:" + joinInformation);
    res.statusCode = 200;
    res.send(joinInformation);
  } catch (e) {
    console.error(e);
    res.statusCode = 400;
    res.send({error: e});
  }
};

exports.revertInitGroupJoin = async function (req, res) {
  console.log("revertInitGroupJoin")
  console.log(req.body.group);
  console.log(req.user);
  try {
    let joinInfo = await Join_Info.findOneAndDelete({group: req.body.group, joinedUser: req.user, payed: false}).exec();
    if (!joinInfo) {
      console.log("No JoinInfo Found");
      res.statusCode = 200;
      return res.send({message: "No JoinInfo Found"});
    } else {
      await Join_Info.findOneAndDelete({_id: joinInfo._id});
      console.log("Deleted Join Info");
      res.statusCode = 200;
      return res.send({message: "Deleted"});
    }
  } catch (e) {
    console.error(e);
    res.statusCode = 400;
    return res.send({error: e});
  }
};

const cliendId = "ATlNCZUwt18yeGBxkLE-3ZBu6CSvejPLX3T-rXs4VTdCSg1e2L0DVewN6jC709L_6fafzyz4XOR5VM4J";
const clientSecret = "ELASAprP1foqf74bfMShxHgEcHfh8rJiTvnBscNRQM93A8wIvkGX5C8ESUvrjE6OGzU_out_aosp_Dmc";

async function getBearerToken() {
  const authHash = Buffer.from(
      "ATlNCZUwt18yeGBxkLE-3ZBu6CSvejPLX3T-rXs4VTdCSg1e2L0DVewN6jC709L_6fafzyz4XOR5VM4J:ELASAprP1foqf74bfMShxHgEcHfh8rJiTvnBscNRQM93A8wIvkGX5C8ESUvrjE6OGzU_out_aosp_Dmc").toString(
      "base64");
  console.log(authHash);

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Authorization": "Basic " + authHash
  };

  const authBody = "grant_type=client_credentials";

  try {
    const response = await fetch("https://api.sandbox.paypal.com/v1/oauth2/token", {method: 'POST', headers: headers, body: authBody});
    const json = await response.json();
    console.log(json);
    return json.access_token;
  } catch (e) {
    console.error(e);
  }
}

function sleep(ms) {
  return new Promise((resolve => setTimeout(resolve, ms)));
}

exports.verifyPayment = async function (req, res) {
  const token = await getBearerToken();
  console.log("Verify payment");
  const orderId = req.query.orderId;
  const payerId = req.query.payerId;
  const paypalUrl = "https://api.sandbox.paypal.com/v2/checkout/orders/" + orderId;

  const headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + token
  };
  try {
    let response = null;
    let order = null;
    let i = 0;
    let wait = 0;
    while (!order || !order.status == "COMPLETED") {
      if (order) {
        console.log(order.status);
      }
      await sleep(wait * 500);
      console.log("Order not completed" + wait * 500);
      response = await fetch(paypalUrl, {method: 'GET', headers: headers});
      if (response && response.status === 200) {
        order = await response.json();
      }
      i++;
      if (i > 6) {
        throw "Could not verify Payment";
      }
      wait = Math.pow(2, i);
    }
    if (!order.purchase_units[0]) {
      throw  "No Purchase Units in Order!";
    }
    const purchased_unit = order.purchase_units[0];
    if (!purchased_unit.reference_id) {
      throw "Could not find ReferenceId in Order!";
    }
    const ref_id = purchased_unit.reference_id;
    if (!purchased_unit.amount) {
      throw "No Amount Object in Order!";
    }
    const amount = purchased_unit.amount;
    const joinInfo = await Join_Info.findById(ref_id, {}).exec();
    if (!joinInfo) {
      throw "Could not find JoinInfo for Order";
    }
    if (joinInfo.payed) {
      throw "Join Info already payed!";
    }

    const group = await findGroupByIdAndPopulateRefsImpl(joinInfo.group).exec();
    const pricePerPerson = group.ticket.fullPrice / group.ticket.maxCoveredPeople;
    if (pricePerPerson.toFixed(2) != amount.value) {
      throw `Payer Value not equal to Price per Person: ${pricePerPerson.toFixed(2)}!=${amount.value}`;
    }
    if (group.ticket.currency.short_form !== amount.currency_code) {
      throw `Order has different Currency: ${group.ticket.currency.short_form}!=${amount.currency_code}`;
    }

    if(payerId!==order.payer.payer_id) throw "PayerID is diffrent from PayerID in Order";


    joinInfo.payed = true;
    joinInfo.payer_id = order.payer.payer_id;
    await joinInfo.save();
    console.log(`Order ${ref_id} verified successfully!`);
    res.send(joinInfo);

  } catch (e) {
    console.error(e);
    res.statusCode = 400;
    res.send({error: e});
  }

};

