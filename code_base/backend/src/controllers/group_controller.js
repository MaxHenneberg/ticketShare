"use strict";

const User = require("../models/user/user");
const Group = require("../models/group/group");
const EventInformation = require("../models/group/eventInformation");
const Ticket = require("../models/group/ticketInformation");
const Currency = require("../models/group/currency");
const Join_Info = require("../models/group/joinInformation");
const Search_Tag = require("../models/group/searchTag");

exports.create = async (req, res) => {
	// TODO: Header Pic and Price Per Person
	var validation = null;
	var errors = [];
	try {
		var is_all = true;
		validation = has_all_params(req.body, [
			"name",
			"type",
			"desc",
			"is_public",
			"eventInformation",
			"ticketInfo",
		]);
		if (validation.is_valid == false) {
			throw validation.errors;
		}
		// validation of EventInformation
		validation = has_all_params(req.body.eventInformation, [
			"name",
			"desc",
			"eventStart",
			"eventEnd",
			"linkToEvent",
		]);
		if (validation.is_valid == false) {
			is_all = false;
			errors = errors.concat({ eventInformation: validation.errors });
		}
		// validation of TicketInformation
		validation = has_all_params(req.body.ticketInfo, [
			"fullPrice",
			"maxCoveredPeople",
			"initialFreeSlotsLeft",
			"currency",
		]);
		if (validation.is_valid == false) {
			is_all = false;
			errors = errors.concat({ ticketInfo: validation.errors });
		}
		if (!is_all) throw errors;
	} catch (err) {
		return res.status(400).send({
			errors: err,
		});
	}

	try {
		// validate if currency exists in db
		var currency_id = req.body.ticketInfo.currency;
		if (!currency_id.match(/^[0-9a-fA-F]{24}$/)) {
			throw "Invalid Currency ID format";
		}
		let currency_object = await Currency.findById(currency_id).exec();
		if (!currency_object) throw "Invalid Currency";
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
		return res.status(200).send({ group: group.id });
	} catch (err) {
		return res.status(400).send({
			errors: err,
		});
	}
};

function has_all_params(body, params) {
	var errors = [];
	var is_valid = true;
	params.forEach(function (item) {
		if (typeof body[item] === "undefined") {
			is_valid = false;
			errors.push(item + " is required");
		}
	});
	return { is_valid: is_valid, errors: errors };
}
