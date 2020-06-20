const User = require("../models/user/user");
const Group = require("../models/group/group");
const Event = require("../models/group/eventInformation");
const Join_Info = require("../models/group/joinInformation");
const Ticket = require("../models/group/ticketInformation");
const Search_Tag = require("../models/group/searchTag");
const validator = require("validator");

exports.create = function (req, res) {
	// TODO: Header Pic and Price Per Person
	var group = null;
	try {
		validation = has_all_params(req.body, [
			"name",
			"type",
			"desc",
			"is_public",
		]);
		if (validation.is_valid == false) {
			throw validation.errors;
		}
		// create group
		group = new Group({
			name: req.body.name,
			type: req.body.type,
			desc: req.body.desc,
			public: req.body.is_public,
			creator: req.user.id,
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
