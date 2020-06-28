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
const {body, validationResult} = require("express-validator");

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
  Group.findById(req.query.id, {})
  .populate("ticketInformation")
  .populate({path: "ticketInformation", populate: {path: "eventInformation"}})
  .populate({path: "ticketInformation", populate: {path: "currency"}}).then(
      function (result) {
        if (!result) {
          res.statusCode = 404;
          return res.send(result);
        }
        return res.send(result);
      }).catch(function (err) {
    if (err) {
      console.error(err);
      return res.send(err);
    }
  })
}
;

exports.countOccSlotsForGroup = function (req, res) {
  JoinInformation.countDocuments(
      {group: req.query.group}).then(result => {
    if (result!=null) {
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

