"use strict";

const User = require("../models/user/user");
const Group = require("../models/group/group");
const EventInformation = require("../models/group/eventInformation");
const Ticket = require("../models/group/ticketInformation");
const Currency = require("../models/group/currency");
const Join_Info = require("../models/group/joinInformation");
const Search_Tag = require("../models/group/searchTag");
const { body, validationResult } = require("express-validator");

/**
 * Validates the create group request
 *
 * @param method Argument from the middleware, name of function who's request is to be validated
 */

exports.validate = (method) => {
	switch (method) {
		case "create": {
			return [
				body("name", "Group Name Required").exists().notEmpty(),
				body("type", "Group Type Required").exists().notEmpty(),
				body("desc", "Group Description Required").exists().notEmpty(),
				body("joinDeadline", "Join Deadline Required")
					.exists()
					.notEmpty()
					.bail()
					.isDate()
					.withMessage("Invalid Join Date Format"),
				body("is_public", "Public Parameter Required")
					.exists()
					.isBoolean()
					.withMessage("Invalid Value for Public"),
				// validate ticket info
				body("ticketInfo", "Ticket Information Required").exists().notEmpty(),
				body("ticketInfo.fullPrice", "Ticket Price Required")
					.exists()
					.notEmpty()
					.bail()
					.isFloat()
					.withMessage("Invalid Price value"),
				body("ticketInfo.maxCoveredPeople", "Max People per Ticket Required")
					.exists()
					.notEmpty()
					.bail()
					.isInt({ gt: 1 })
					.withMessage("Invalid value for Max People (Must be greater than 1)"),
				body("ticketInfo.initialFreeSlotsLeft", "Ticket Free Slots Required")
					.exists()
					.notEmpty()
					.bail()
					.isInt({ gt: 0 })
					.withMessage("Invalid value for Free Slots"),
				body("ticketInfo.currency", "Ticket Currency Required")
					.exists()
					.notEmpty()
					.bail()
					.isMongoId()
					.withMessage("Invalid Value for Currency"),
				// validate event info
				body("eventInformation", "Event Information Required")
					.exists()
					.notEmpty(),
				body("eventInformation.name", "Event Name Required")
					.exists()
					.notEmpty(),
				body("eventInformation.desc", "Event Description Required")
					.exists()
					.notEmpty(),
				body("eventInformation.eventStart", "Event Start Date Required")
					.exists()
					.notEmpty()
					.bail()
					.isDate()
					.withMessage("Invalid Start Date Format"),
				body("eventInformation.eventEnd", "Event End Date Required")
					.exists()
					.notEmpty()
					.bail()
					.isDate()
					.withMessage("Invalid Date Format"),
				body("eventInformation.linkToEvent", "Link to Event Required").exists(),
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
	// let c = await Currency.create({name:'Euro',short_form:'eur',symbol:"€"}).exec();
	// return;

	const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
	if (!errors.isEmpty()) {
		return res.status(400).json(errors);
	}
	try {
		var start_date = new Date(req.body.eventInformation.eventStart);
		var end_date = new Date(req.body.eventInformation.eventEnd);
		var joinDeadline = new Date(req.body.joinDeadline).setHours(0, 0, 0, 0);
		var today = new Date().setHours(0, 0, 0, 0);
		if (today > joinDeadline) throw "Deadline can not be for a past date";
		if (start_date > end_date) throw "Event Start Date can't be after End Date";

		var currency_id = req.body.ticketInfo.currency;
		let currency_object = await Currency.findById(currency_id).exec();
		if (!currency_object) throw "Invalid Currency";

		if (
			req.body.ticketInfo.initialFreeSlotsLeft >=
			req.body.ticketInfo.maxCoveredPeople
		) {
			throw "Free Slots must be less than Max Covered People. We include you as one ;)";
		}
		/*
			Create documents.
		*/
		// create EventInformation
		let event_info = await EventInformation.create(req.body.eventInformation);

		// create ticket info
		req.body.ticketInfo.eventInformation = event_info.id;
		let ticket = await Ticket.create(req.body.ticketInfo);

		var creator_id = req.user.id;

		// create group
		let group = await Group.create({
			name: req.body.name,
			type: req.body.type,
			desc: req.body.desc,
			joinDeadline: req.body.joinDeadline,
			public: req.body.is_public,
			creator: creator_id,
			ticket: ticket.id,
		});
		console.log(group);
		return res.status(200).json({ group: group.id });
	} catch (err) {
		err = { errors: [{ msg: err }] };
		return res.status(400).json(err);
	}
};
